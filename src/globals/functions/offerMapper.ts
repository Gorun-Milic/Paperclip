import { OfferDto } from "src/dto/OfferDto";
import { Offer } from "src/entity/offer";
import { productMapper } from "./productMapper";
import { userMapper } from "./userMapper";

export function offerMapper(offer: Offer): OfferDto {
    let offerDto: OfferDto = new OfferDto();

    offerDto.id = offer.id;
    offerDto.seen = offer.seen;
    offerDto.sender = userMapper(offer.sender);
    offerDto.receiver = userMapper(offer.receiver);
    offerDto.offeredProduct = productMapper(offer.offeredProduct);
    offerDto.receivedProduct = productMapper(offer.receivedProduct);

    return offerDto;
}