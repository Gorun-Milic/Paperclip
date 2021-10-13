import { ProductDto } from "./productDto";
import { UserDto } from "./UserDto";

export class OfferDto {
    id: string;
    seen: number;
    time: string;
    sender: UserDto;
    receiver: UserDto;
    offeredProduct: ProductDto;
    receivedProduct: ProductDto;
}