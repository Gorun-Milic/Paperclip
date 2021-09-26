import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/entity/comment';
import { Product } from 'src/entity/product';
import { ExceptionMessageEnum } from 'src/globals/ExceptionMessageEnum.enum';
import { Repository } from 'typeorm';
import { Notification } from 'src/entity/notification';
import { NotificationService } from '../notification/notification.service';
import { User } from 'src/entity/user';

@Injectable()
export class CommentService {

    constructor(
        @InjectRepository(Comment)
        private commentRepository: Repository<Comment>,
        private notificationService: NotificationService
    ) {}

    async addComment(comment: Comment): Promise<Comment> {
        let notification = await this.addNotifiaction(comment.product, comment.user);
        return await this.commentRepository.save(comment);
    }

    async commentsForProduct(product: Product): Promise<Comment[]> {
        const comments = await this.commentRepository.find({
            where: {
                product: product,
            },
            relations: ["user"]
        });
        if (!comments) {
            throw new HttpException(
                ExceptionMessageEnum.NO_COMMENTS,
                HttpStatus.BAD_REQUEST,
            )
        }else {
            return comments;
        }
    }

    async addNotifiaction(product: Product, user: User): Promise<Notification> {
        let notification: Notification = new Notification();
        notification.user = user;
        notification.product = product;
        notification.seen = 0;
        notification.type = 'comment';
        return await this.notificationService.addNotification(notification);
    }

    
}
