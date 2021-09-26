import { User } from "src/entity/user";
import { ProductDto } from "./productDto";

export class SaveDto {
    id: string;
    product: ProductDto;
    user: User;
}