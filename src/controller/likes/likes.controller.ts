import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { LikesDto } from 'src/dto/LikesDto';
import { Likes } from 'src/entity/likes';
import { Offer } from 'src/entity/offer';
import { Product } from 'src/entity/product';
import { LikesService } from 'src/service/likes/likes.service';

@Controller('likes')
export class LikesController {

    constructor(
        private likesService: LikesService
    ) {}

    @Post('addLike')
    async addLikes(@Body() like: Likes): Promise<Likes> {
        return await this.likesService.addLike(like);
    }

    @Post('isLiked')
    async isLiked(@Body() like: Likes): Promise<Likes> {
        return await this.likesService.isLiked(like);
    }

    @Post('getLikes')
    async getLikes(@Body() product: Product): Promise<LikesDto> {
        return await this.likesService.getLikes(product);
    }

    @Delete(':id')
    async dislike(@Param('id') id): Promise<Likes> {
        return await this.likesService.dislike(id);
    }

    @Post('deleteLikes')
    async deleteLikes(@Body() offer: Offer): Promise<any> {
        return await this.likesService.deleteLikes(offer);
    }

}
