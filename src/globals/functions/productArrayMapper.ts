import { ProductDto } from "src/dto/productDto";
import { Product } from "src/entity/product";
import { productMapper } from "./productMapper";

export function productArrayMapper(products: Product[]): ProductDto[] {

    let productDtos: ProductDto[] = [];

    products.forEach(element => {
        productDtos.push(productMapper(element));
    })

    return productDtos;
}