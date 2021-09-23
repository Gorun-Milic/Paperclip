import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LikesDto } from 'src/dto/LikesDto';
import { Likes } from 'src/entity/likes';
import { Product } from 'src/entity/product';
import { User } from 'src/entity/user';
import { ExceptionMessageEnum } from 'src/globals/ExceptionMessageEnum.enum';
import { userArrayMapper } from 'src/globals/functions/userArrayMapper';
import { Repository } from 'typeorm';

@Injectable()
export class LikesService {

    constructor(
        @InjectRepository(Likes)
        private likesRepository: Repository<Likes>
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
            return await this.likesRepository.save(like);
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
            console.log("Nije undefied ?" + liked.id + ", ");
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

}
