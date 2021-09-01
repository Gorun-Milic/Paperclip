import { ProductDto } from "src/dto/productDto";
import { Product } from "src/entity/product";
import { byteToBase64 } from "./byteTobase64";

export function PhotoArrayMapper(products: Product[]): ProductDto[] {

    let productDtos: ProductDto[] = [];

    for (let i=0; i<products.length; i++) {
        productDtos.push(byteToBase64(products[i]));
    }

    return productDtos;
}