import { Category } from "src/entity/category"
import { User } from "src/entity/user"

export class ProductDto {
    name: string;
    description: string;
    category: Category;
    user: User;
    photo: string;
}