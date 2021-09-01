import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDto } from 'src/dto/productDto';
import { UserDto } from 'src/dto/UserDto';
import { Product } from 'src/entity/product';
import { User } from 'src/entity/user';
import { ExceptionMessageEnum } from 'src/globals/ExceptionMessageEnum.enum';
import { byteToBase64 } from 'src/globals/functions/byteTobase64';
import { PhotoArrayMapper } from 'src/globals/functions/photoArrayMapper';
import { Repository } from 'typeorm';

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
        // productEntity.photo = Buffer.from(productDto.photo.data).toString('base64');
        productEntity.photo = photo.buffer;
        // productEntity.photo = new Buffer("das");
        // productEntity.photo = this.arrayBufferToBase64(photo.buffer);
        // productEntity.photo = this.arrayBufferToBase64(photo.buffer);
        // productEntity.id = "asdasdasdjasdjaskdlajda"
        // console.log("Entiteeeeeeeeet: " + productEntity.name);
        await this.productRepository.save(productEntity);
    }

    arrayBufferToBase64(buffer) {
        // console.log("Slika u byte: " + buffer);
        var binary = '';
        var bytes = new Uint8Array( buffer );
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] );
        }
        console.log("Slika u adsa: " + binary.slice(0, 25));
        let buff = Buffer.from(binary)
        let base64data = buff.toString('base64');
        console.log("Slika u bs64: " + base64data.slice(0, 40));
        return base64data;
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

}
