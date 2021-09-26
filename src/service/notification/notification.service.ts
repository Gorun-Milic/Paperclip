import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { serializeUser } from 'passport';
import { NotificationDto } from 'src/dto/NotificationDto';
import { Notification } from 'src/entity/notification';
import { Product } from 'src/entity/product';
import { User } from 'src/entity/user';
import { ExceptionMessageEnum } from 'src/globals/ExceptionMessageEnum.enum';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationService {

    constructor(
        @InjectRepository(Notification)
        private notificationRepository: Repository<Notification>
    ) {}

    async addNotification(notification: Notification): Promise<Notification> {
        notification.date = new Date();
        return await this.notificationRepository.save(notification);
    }

    async countNotifications(user: User): Promise<NotificationDto> {
        const [result, total] = await this.notificationRepository.findAndCount({
            where: {
                product: {user: user},
                seen: 0,
            },
            relations: ['product', 'user']
        });

        return {
            notifications: result,
            total: total
        }
    }

    async getOldNotifications(user: User): Promise<Notification[]> {
        const result = await this.notificationRepository.find({
            where: {
                product: {user: user},
                seen: 1,
            },
            take: 3,
            order: {date: 'DESC'},
            relations: ['product', 'user']
        });
        if (result) {
            return result;
        }else {
            throw new HttpException(
                ExceptionMessageEnum.NO_OLD_NOTIFICATION,
                HttpStatus.BAD_REQUEST,
            )
        }

        
    }

    async viewNotification(product: Product): Promise<any> {
        const result = await this.notificationRepository
            .createQueryBuilder('n')
            .innerJoin('n.product', 'product')
            .update(Notification)
            .set({seen: 1})
            .where('seen = :seen', {seen: 0})
            .andWhere('product.id = :id', {id: product.id})
            .execute()
        
            if (result) {
                return result;
            }else {
                throw new HttpException(
                    ExceptionMessageEnum.NO_OLD_NOTIFICATION,
                    HttpStatus.BAD_REQUEST,
                )
            }
    }

}
