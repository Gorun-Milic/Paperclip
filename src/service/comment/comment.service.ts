import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/entity/comment';
import { Product } from 'src/entity/product';
import { ExceptionMessageEnum } from 'src/globals/ExceptionMessageEnum.enum';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {

    constructor(
        @InjectRepository(Comment)
        private commentRepository: Repository<Comment>
    ) {}

    async addComment(comment: Comment): Promise<Comment> {
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
                ExceptionMessageEnum.FIT_PASS_USER_NOT_FOUND,
                HttpStatus.BAD_REQUEST,
            )
        }else {
            return comments;
        }
    }
}
