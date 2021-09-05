import { Body, Controller, Post } from '@nestjs/common';
import { Comment } from 'src/entity/comment';
import { Product } from 'src/entity/product';
import { CommentService } from 'src/service/comment/comment.service';

@Controller('comment')
export class CommentController {

    constructor(
        private commentService: CommentService
    ) {}

    @Post()
    async addComment(@Body() comment: Comment): Promise<Comment> {
        console.log("STIGAOOOOOOOOOOOOOOOOO: " + comment.date);
        comment.date = new Date();
        return await this.commentService.addComment(comment);
    }

    @Post('commentsForProduct')
    async commentsForProduct(@Body() product: Product): Promise<Comment[]> {
        return await this.commentService.commentsForProduct(product);
    }

}
