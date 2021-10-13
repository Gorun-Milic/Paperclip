import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfferController } from 'src/controller/offer/offer.controller';
import { Offer } from 'src/entity/offer';
import { OfferService } from 'src/service/offer/offer.service';

@Module({
    imports: [TypeOrmModule.forFeature([Offer])],
    controllers: [OfferController],
    providers: [OfferService],
    exports: [OfferService]
})
export class OfferModule {}
