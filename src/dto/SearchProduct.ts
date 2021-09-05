import { Category } from "src/entity/category";

export class SearchProduct {
    name: string;
    category: Category;
    isProduct: boolean;
    currentPage: number;
    pageSize: number
}