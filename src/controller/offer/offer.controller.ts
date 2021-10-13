import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { OfferDto } from 'src/dto/OfferDto';
import { Offer } from 'src/entity/offer';
import { User } from 'src/entity/user';
import { OfferService } from 'src/service/offer/offer.service';

@Controller('offer')
export class OfferController {

    constructor(
        private offerService: OfferService
    ) {

    }

    @Get(':id')
    async getOffer(@Param('id') id): Promise<OfferDto> {
        return await this.offerService.getOffer(id);
    }

    @Post('add')
    async addOffer(@Body() offer: Offer): Promise<Offer> {
        return await this.offerService.addOffer(offer);
    }

    @Post('sentOffers')
    async sentOffers(@Body() user: User): Promise<OfferDto[]> {
        return await this.offerService.sentOffers(user);
    }

    @Post('reveivedOffers')
    async reveivedOffers(@Body()user: User): Promise<OfferDto[]> {
        return await this.offerService.receivedOffers(user);
    }

    @Post('offerAlreadyExist')
    async offerAlreadyExist(@Body()offer: Offer): Promise<any> {
        return await this.offerService.offerAlreadyExist(offer);
    }

    @Post('countNewOffers')
    async countNewOffers(@Body()user: User): Promise<number> {
        return await this.offerService.countNewOffers(user);    
    }

    @Put('viewOffer')
    async viewOffer(@Body() offer: Offer): Promise<any> {
        return await this.offerService.viewOffer(offer);
    }

    @Delete(':id')
    async deleteOffer(@Param('id') id): Promise<any> {
        return await this.offerService.deleteOffer(id);
    }

    @Post('deleteOffers')
    async deleteOffers(@Body() offer: Offer): Promise<any> {
        return await this.offerService.deleteOffersWithProducts(offer);
    }

}
