import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/entity/comment';
import { Product } from 'src/entity/product';
import { ExceptionMessageEnum } from 'src/globals/ExceptionMessageEnum.enum';
import { Repository } from 'typeorm';
import { Notification } from 'src/entity/notification';
import { NotificationService } from '../notification/notification.service';
import { User } from 'src/entity/user';
import { Offer } from 'src/entity/offer';

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
        if (product.user.id!==user.id) {
            let notification: Notification = new Notification();
            notification.user = user;
            notification.product = product;
            notification.seen = 0;
            notification.type = 'comment';
            return await this.notificationService.addNotification(notification);
        }
    }

    //nakon prihvatanja neke ponude, brisemo sve komentare
    //sa produkta iz ponude
    //kako bismo kasnije te produkte razmenili
    async deleteComments(offer: Offer): Promise<any> {
        let res = await this.commentRepository.createQueryBuilder("comment")
        .innerJoin("comment.product", "product")
        .delete()
        .from(Comment)
        .where("product.id = :oId", {oId: offer.offeredProduct.id})
        .orWhere("product.id = :rId", {rId: offer.receivedProduct.id})
        .execute();

        if (res) {
            return res;
        }else {
            throw new HttpException(
                ExceptionMessageEnum.COMMENTS_NOT_DELETED,
                HttpStatus.BAD_REQUEST,
            )
        }
    }

    
}
