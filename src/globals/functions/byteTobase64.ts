import { ProductDto } from "src/dto/productDto";

export function byteToBase64(product) {
    let productDto: ProductDto = new ProductDto;
    productDto.name = product.name;
    productDto.description = product.description;
    productDto.category = product.category;
    productDto.user = product.user;
    let buff = product.photo;
    productDto.photo = buff.toString('base64');
    return productDto;
}