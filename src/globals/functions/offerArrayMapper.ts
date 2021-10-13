import { OfferDto } from "src/dto/OfferDto";
import { Offer } from "src/entity/offer";
import { offerMapper } from "./offerMapper";

export function offerArrayMapper(offerArray: Offer[]): OfferDto[] {

    let offerDtos: OfferDto[] = [];

    for (let i=0; i<offerArray.length; i++) {
        offerDtos.push(offerMapper(offerArray[i]));
    }

    return offerDtos;
}