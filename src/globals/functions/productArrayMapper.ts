import { ProductDto } from "src/dto/productDto";
import { Product } from "src/entity/product";
import { productMapper } from "./productMapper";

export function productArrayMapper(products: Product[]): ProductDto[] {

    let productDtos: ProductDto[] = [];

    for (let i=0; i<products.length; i++) {
        productDtos.push(productMapper(products[i]));
    }

    return productDtos;
}