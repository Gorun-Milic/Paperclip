import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { off } from 'process';
import { OfferDto } from 'src/dto/OfferDto';
import { Offer } from 'src/entity/offer';
import { Product } from 'src/entity/product';
import { User } from 'src/entity/user';
import { ExceptionMessageEnum } from 'src/globals/ExceptionMessageEnum.enum';
import { offerArrayMapper } from 'src/globals/functions/OfferArrayMapper';
import { offerMapper } from 'src/globals/functions/offerMapper';
import { Repository } from 'typeorm';

@Injectable()
export class OfferService {

    constructor(
        @InjectRepository(Offer)
        private offerRepository: Repository<Offer>
    ) {}

    async getOffer(id: string): Promise<OfferDto> {
        let offer = await this.offerRepository.findOne(
            {
                where: {
                    id: id
                },
                relations: ['offeredProduct', 'receivedProduct', 'receiver', 'sender']
            }
        );
        if (offer) {
            return offerMapper(offer);
        }else {
            throw new HttpException(
                ExceptionMessageEnum.NO_OFFER,
                HttpStatus.BAD_REQUEST,
            )
        }
    }

    async addOffer(offer: Offer): Promise<Offer> {
        offer.time = new Date().toISOString().slice(0, 19).replace('T', ' ');   
        return await this.offerRepository.save(offer);
    }

    async sentOffers(user: User): Promise<OfferDto[]> {
        let offers = await this.offerRepository.find(
            {
                where: { 
                    sender: user
                },
                relations: ['offeredProduct', 'receivedProduct', 'receiver', 'sender']
            }
        );
        if (offers) {
            return offerArrayMapper(offers);
        }else {
            throw new HttpException(
                ExceptionMessageEnum.NO_SENT_OFFERS,
                HttpStatus.BAD_REQUEST,
            )
        }
    }

    async offerAlreadyExist(offer: Offer): Promise<any> {
        let res = await this.offerRepository.findOne(
            {
                where: [
                    { 
                        offeredProduct: offer.offeredProduct,
                        receivedProduct: offer.receivedProduct
                    },
                    {
                        offeredProduct: offer.receivedProduct,
                        receivedProduct: offer.offeredProduct
                    }
                ],
                relations: ['offeredProduct', 'receivedProduct']
            }
        );
        if (res) {
            return res;
        }else {
            throw new HttpException(
                ExceptionMessageEnum.OFFER_DO_NOT_EXISTS,
                HttpStatus.BAD_REQUEST,
            )
        }
    }

    async receivedOffers(user: User): Promise<OfferDto[]> {
        let offers = await this.offerRepository.find(
            {
                where: { 
                    receiver: user
                },
                relations: ['offeredProduct', 'receivedProduct', 'receiver', 'sender']
            }
        );
        if (offers) {
            return offerArrayMapper(offers);
        }else {
            throw new HttpException(
                ExceptionMessageEnum.NO_RECEIVED_OFFERS,
                HttpStatus.BAD_REQUEST,
            )
        }
    }

    async countNewOffers(user: User): Promise<number> {
        const [result, total] = await this.offerRepository.findAndCount({
            where: {
                receiver: user,
                seen: 0,
            },
            relations: ['receiver']
        });

        return total;    
    }

    async viewOffer(offer: Offer): Promise<any> {
        let res = await this.offerRepository
        .createQueryBuilder('offer')
        .update(Offer)
        .set({seen: 1})
        .where('offer.id = :offerId', {offerId: offer.id})
        .execute();

        if (res) {
            return res;
        }else {
            throw new HttpException(
                ExceptionMessageEnum.CAN_NOT_UPDATE,
                HttpStatus.BAD_REQUEST,
            )
        }
    }

    async deleteOffer(id: string): Promise<any> {
        let res = await this.offerRepository
        .createQueryBuilder('offer')
        .delete()
        .from(Offer)
        .where('offer.id = :offerId', {offerId: id})
        .execute();

        if (res) {
            return res;
        }else {
            throw new HttpException(
                ExceptionMessageEnum.CAN_NOT_DELETE,
                HttpStatus.BAD_REQUEST,
            )
        }
    }

    //kad se ponuda prihvati, produkti koji su bili u ponudi prelaze sa jednog usera na drugog
    //tada se brisu sve ponude koje su sadrzale neki od ta dva proizvoda
    async deleteOffersWithProducts(offer: Offer): Promise<any> {
        let res = await this.offerRepository
        .createQueryBuilder('offer')
        .innerJoin('offer.receivedProduct', 'receivedProduct')
        .innerJoin('offer.offeredProduct', 'offeredProduct')
        .delete()
        .from(Offer)
        .where('receivedProduct.id = :rId', {rId: offer.receivedProduct.id})
        .orWhere('offeredProduct.id = :oId', {oId: offer.receivedProduct.id})
        .orWhere('receivedProduct.id = :r1Id', {r1Id: offer.offeredProduct.id})
        .orWhere('offeredProduct.id = :o1Id', {o1Id: offer.offeredProduct.id})
        .execute();

        if (res) {
            return res;
        }else {
            throw new HttpException(
                ExceptionMessageEnum.OFFERS_NOT_DELETED,
                HttpStatus.BAD_REQUEST,
            )
        }
    }


}
