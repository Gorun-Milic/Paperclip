import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDto } from 'src/dto/productDto';
import { ProductPagination } from 'src/dto/ProductPagination';
import { SearchProduct } from 'src/dto/SearchProduct';
import { UserDto } from 'src/dto/UserDto';
import { Product } from 'src/entity/product';
import { User } from 'src/entity/user';
import { ExceptionMessageEnum } from 'src/globals/ExceptionMessageEnum.enum';
import { byteToBase64 } from 'src/globals/functions/byteTobase64';
import { PhotoArrayMapper } from 'src/globals/functions/photoArrayMapper';
import { Like, Repository } from 'typeorm';

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>
    ){}

    async addProduct(productDto, photo) {
        console.log("Dtooooo: " + productDto.name + " " + productDto.description + " u: " + productDto.user.firstName + " c: " + productDto.category.name);
        let productEntity =  new Product();
        productEntity.name = productDto.name;
        productEntity.description = productDto.description;
        productEntity.user = productDto.user;
        productEntity.category = productDto.category;
        if (photo) {
            productEntity.photo = photo.buffer;
        }
        await this.productRepository.save(productEntity);
    }

    async findAll(): Promise<ProductDto[]> {
        const products = await this.productRepository.find();
        if (!products) {
            throw new HttpException(
                ExceptionMessageEnum.FIT_PASS_USER_NOT_FOUND,
                HttpStatus.BAD_REQUEST,
            )
        }else {
            return PhotoArrayMapper(products);
        }
    }

    async productsOfUser(user: UserDto): Promise<ProductDto[]> {
        const products = await this.productRepository.find({
            user: user
        });
        if (!products) {
            throw new HttpException(
                ExceptionMessageEnum.FIT_PASS_USER_NOT_FOUND,
                HttpStatus.BAD_REQUEST,
            )
        }else {
            return PhotoArrayMapper(products);
        }
    }
    
    async findOne(id: string): Promise<ProductDto> {
        const product: Product = await this.productRepository.findOne(id);
        if (!product) {
            throw new HttpException(
                ExceptionMessageEnum.FIT_PASS_USER_NOT_FOUND,
                HttpStatus.BAD_REQUEST,
            )
        }else {
            let productDto = byteToBase64(product);
            return productDto;
        }
    }

    async pagination(searchProduct: SearchProduct): Promise<ProductPagination> {
        console.log(searchProduct.category.id);
        console.log("Usao: " + searchProduct.name + ", " + searchProduct.currentPage + ", " + searchProduct.pageSize + "," + searchProduct.category.name);
        const skip = searchProduct.pageSize * (searchProduct.currentPage-1);


        const [result, total] = await this.productRepository.findAndCount({
            where: [{name: Like('%' + searchProduct.name + '%')}, {category: {id: searchProduct.category.id}}, {category: {isProduct: searchProduct.isProduct}}],
            relations: ['category'],
            take: searchProduct.pageSize,
            skip: skip
        });

        let productArray: ProductDto[] = PhotoArrayMapper(result);

        return {
            products: productArray,
            total: total
        };
    }

}
