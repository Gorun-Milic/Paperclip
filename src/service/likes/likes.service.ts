import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LikesDto } from 'src/dto/LikesDto';
import { Likes } from 'src/entity/likes';
import { Notification } from 'src/entity/notification';
import { Offer } from 'src/entity/offer';
import { Product } from 'src/entity/product';
import { User } from 'src/entity/user';
import { ExceptionMessageEnum } from 'src/globals/ExceptionMessageEnum.enum';
import { userArrayMapper } from 'src/globals/functions/userArrayMapper';
import { Repository } from 'typeorm';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class LikesService {

    constructor(
        @InjectRepository(Likes)
        private likesRepository: Repository<Likes>,
        private notificationService: NotificationService
    ) {}

    async addLike(like: Likes): Promise<Likes> {
        let liked = await this.likesRepository.findOne({
            where: [{
                product: like.product,
                user: like.user
            }]
        });
        if (liked) {
            throw new HttpException(
                ExceptionMessageEnum.ALREADY_LIKED,
                HttpStatus.BAD_REQUEST,
            )
        }else {
            let notification = await this.addNotifiaction(like.product, like.user);
            return await this.likesRepository.save(like);
        }
    }

    async addNotifiaction(product: Product, user: User): Promise<Notification> {
        if (product.user.id!==user.id) {
            let notification: Notification = new Notification();
            notification.user = user;
            notification.product = product;
            notification.seen = 0;
            notification.type = 'like';
            return await this.notificationService.addNotification(notification);
        }
    }


    async dislike(id: string): Promise<Likes> {
        let liked = await this.likesRepository.findOne(id);
        if (!liked) {
            throw new HttpException(
                ExceptionMessageEnum.PRODUCT_NOT_LIKED,
                HttpStatus.BAD_REQUEST,
            )
        }else {
            return await this.likesRepository.remove(liked);
        }
    } 

    async isLiked(like: Likes): Promise<Likes> {
        let liked = await this.likesRepository.findOne({
            where: {
                product: like.product,
                user: like.user
            },
        })
        if (!liked) {
            throw new HttpException(
                ExceptionMessageEnum.PRODUCT_NOT_LIKED,
                HttpStatus.BAD_REQUEST,
            )
        }else {
            return liked;
        }

    }

    async getLikes(product: Product): Promise<LikesDto> {
        const [result, total] = await this.likesRepository.findAndCount({
            where: [{product: product}],
            relations: ['user']
        });

        let users: User[] = [];

        for (let i=0; i<result.length; i++) {
            users[i] = result[i].user;
        }

        return {
            users: userArrayMapper(users),
            total: total
        }
    
    }

    //nakon prihvatanja neke ponude, brisemo sve lajkove
    //sa produkta iz ponude
    //kako bismo kasnije te produkte razmenili
    async deleteLikes(offer: Offer): Promise<any> {
        let res = await this.likesRepository
        .createQueryBuilder("likes")
        .innerJoin("likes.product", "product")
        .delete()
        .from(Likes)
        .where("product.id = :oId", {oId: offer.offeredProduct.id})
        .orWhere("product.id = :rId", {rId: offer.receivedProduct.id})
        .execute();

        if (res) {
            return res;
        }else {
            throw new HttpException(
                ExceptionMessageEnum.LIKES_NOT_DELETED,
                HttpStatus.BAD_REQUEST,
            )
        }
    }

}
