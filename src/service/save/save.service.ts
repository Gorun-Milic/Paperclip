import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import e from 'express';
import { SaveDto } from 'src/dto/SaveDto';
import { Offer } from 'src/entity/offer';
import { Product } from 'src/entity/product';
import { Save } from 'src/entity/save';
import { User } from 'src/entity/user';
import { ExceptionMessageEnum } from 'src/globals/ExceptionMessageEnum.enum';
import { saveArrayMapper } from 'src/globals/functions/saveArrayMapper';
import { Repository } from 'typeorm';

@Injectable()
export class SaveService {

    constructor(
        @InjectRepository(Save)
        private saveRepository: Repository<Save>
    ) {}

    async addSave(save: Save): Promise<Save> {
        let saved = await this.saveRepository.findOne({
            where: [{
                product: save.product,
                user: save.user
            }]
        });
        if (saved) {
            throw new HttpException(
                ExceptionMessageEnum.ALREADY_SAVED,
                HttpStatus.BAD_REQUEST,
            )
        }else {
            return await this.saveRepository.save(save);
        }
    }

    async forget(id: string): Promise<Save> {
        let saved = await this.saveRepository.findOne(id);
        if (!saved) {
            throw new HttpException(
                ExceptionMessageEnum.NOT_SAVED,
                HttpStatus.BAD_REQUEST,
            )
        }else {
            return await this.saveRepository.remove(saved);
        }
    }

    async isSaved(save: Save): Promise<Save> {
        let saved = await this.saveRepository.findOne(
            {
                where: {
                    product: save.product,
                    user: save.user
                },
            }
        );
        if (!saved) {
            throw new HttpException(
                ExceptionMessageEnum.NOT_SAVED,
                HttpStatus.BAD_REQUEST,
            )
        }else {
            return saved;
        }
    }

    async savedByUser(user: User): Promise<SaveDto[]> {
        const save = await this.saveRepository.find({
            where: {
                user: user,
            },
            relations: ["product", "user"]
        });
        if (!save) {
            throw new HttpException(
                ExceptionMessageEnum.NO_SAVED_PRODUCT,
                HttpStatus.BAD_REQUEST,
            )
        }else {
            return saveArrayMapper(save);
        }
    }

    async deleteSaves(offer: Offer): Promise<any> {
        let res = await this.saveRepository.createQueryBuilder("save")
        .innerJoin("save.product", "product")
        .delete()
        .from(Save)
        .where("product.id = :oId", {oId: offer.offeredProduct.id})
        .orWhere("product.id = :rId", {rId: offer.receivedProduct.id})
        .execute();

        if (res) {
            return res;
        }else {
            throw new HttpException(
                ExceptionMessageEnum.SAVES_NOT_DELETED,
                HttpStatus.BAD_REQUEST,
            )
        }
    }

}
