import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDto } from 'src/dto/productDto';
import { ProductPagination } from 'src/dto/ProductPagination';
import { SearchProduct } from 'src/dto/SearchProduct';
import { UserDto } from 'src/dto/UserDto';
import { Product } from 'src/entity/product';
import { User } from 'src/entity/user';
import { ExceptionMessageEnum } from 'src/globals/ExceptionMessageEnum.enum';
import { productMapper } from 'src/globals/functions/productMapper';
import { productArrayMapper } from 'src/globals/functions/productArrayMapper';
import { Like, Repository } from 'typeorm';
import { Offer } from 'src/entity/offer';

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>
    ){}

    async addProduct(productDto, photo) {
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
                ExceptionMessageEnum.PRODUCTS_NOT_FOUND,
                HttpStatus.BAD_REQUEST,
            )
        }else {
            return productArrayMapper(products);
        }
    }

    async productsOfUser(user: UserDto): Promise<ProductDto[]> {
        const products = await this.productRepository.find({
            user: user
        });
        if (!products) {
            throw new HttpException(
                ExceptionMessageEnum.USER_PRODUCTS_NOT_FOUND,
                HttpStatus.BAD_REQUEST,
            )
        }else {
            return productArrayMapper(products);
        }
    }
    
    async findOne(id: string): Promise<ProductDto> {
        const product: Product = await this.productRepository.findOne(id);
        if (!product) {
            throw new HttpException(
                ExceptionMessageEnum.PRODUCT_NOT_FOUND,
                HttpStatus.BAD_REQUEST,
            )
        }else {
            let productDto = productMapper(product);
            return productDto;
        }
    }

    async pagination(searchProduct: SearchProduct): Promise<ProductPagination> {
        // console.log(searchProduct.category.id);
        // console.log("Usao: " + searchProduct.name + ", " + searchProduct.currentPage + ", " + searchProduct.pageSize + "," + searchProduct.category.name);
        const skip = searchProduct.pageSize * (searchProduct.currentPage-1);

        let result = [];
        let total = 0;

        console.log("Size: " + result.length);
        
        if (searchProduct.name==='' && searchProduct.category!==undefined) {
            console.log("AAAAAAA" + ", Is pr? " + searchProduct.isProduct );
             [result, total] = await this.productRepository.findAndCount({
                where: [{category: {id: searchProduct.category.id}}, {category: {isProduct: searchProduct.isProduct}}],
                relations: ['category'],
                take: searchProduct.pageSize,
                skip: skip
            });
        }else if (searchProduct.name==='' && searchProduct.category===undefined) {
            console.log("BBBB" + ", Is pr? " + searchProduct.isProduct );
            [result, total] = await this.productRepository.findAndCount({
                where: [{category: {isProduct: searchProduct.isProduct}}],
                relations: ['category'],
                take: searchProduct.pageSize,
                skip: skip
            });
        }else if(searchProduct.name!=='' && searchProduct.category===undefined) {
            console.log("CCC" + ", Is pr? " + searchProduct.isProduct );
            [result, total] = await this.productRepository.findAndCount({
                where: [{name: Like('%' + searchProduct.name + '%')}, {category: {isProduct: searchProduct.isProduct}}],
                relations: ['category'],
                take: searchProduct.pageSize,
                skip: skip
            });
        }else {
            console.log("EEE" + ", Is pr? " + searchProduct.isProduct );
            [result, total] = await this.productRepository.findAndCount({
                where: [{name: Like('%' + searchProduct.name + '%')}, {category: {id: searchProduct.category.id}}, {category: {isProduct: searchProduct.isProduct}}],
                relations: ['category'],
                take: searchProduct.pageSize,
                skip: skip
            });
        }

        // if (searchProduct.name==="") {
        //     searchProduct.name = undefined;
        // }
        
        // const [result, total] = await this.productRepository.findAndCount({
        //     where: [{name: Like('%' + searchProduct.name + '%')}, {category: {id: searchProduct.category.id}}, {category: {isProduct: searchProduct.isProduct}}],
        //     relations: ['category'],
        //     take: searchProduct.pageSize,
        //     skip: skip
        // });
        

        let productArray: ProductDto[] = productArrayMapper(result);

        console.log(total);

        return {
            products: productArray,
            total: total
        };
    }

    async pagination2(searchProduct: SearchProduct): Promise<ProductPagination> { 
        const skip = searchProduct.pageSize * (searchProduct.currentPage-1);

        let whereArray = [];
        let searchName = {};
        if (searchProduct.name!=="") {
            searchName = {
                name: Like('%' + searchProduct.name + "%")
            }
            whereArray.push(searchName);
        }

        let searchCategory: {};
        if (searchProduct.category!==undefined) {
            searchCategory = {
                category: {
                    id: searchProduct.category.id
                }
            }
            whereArray.push(searchCategory);
        }
        if (searchProduct.isProduct===true) {
            whereArray.push({category: {isProduct: true}});
        }else {
            whereArray.push({category: {isProduct: false}});
        }

        const [result, total] = await this.productRepository.findAndCount({
            where: whereArray,
            relations: ['category'],
            take: searchProduct.pageSize,
            skip: skip
        });

        let productArray: ProductDto[] = productArrayMapper(result);

        return {
            products: productArray,
            total: total
        };
    }

    //nakon sto se prihvati ponuda i sto se izbrisu lajkovi i komentari iz produkta
    //razmenjujemo produkte(user koji je poslao ponuda dobija receivedProduct)
    //(user koji je primio ponudu dobija offeredProduct)
    async exchangeProducts(offer: Offer): Promise<any> {
        let res = await this.productRepository.createQueryBuilder("product")
        .innerJoin("product.user", "user")
        .update(Product)
        .set({user: offer.sender})
        .where("product.id = :id", {id: offer.receivedProduct.id})
        .execute();

        let res1 = await this.productRepository.createQueryBuilder("product")
        .innerJoin("product.user", "user")
        .update(Product)
        .set({user: offer.receiver})
        .where("product.id = :id", {id: offer.offeredProduct.id})
        .execute();
        
        if (res && res1) {
            return res1;
        }else {
            throw new HttpException(
                ExceptionMessageEnum.PRODUCTS_NOT_EXCHANGED,
                HttpStatus.BAD_REQUEST,
            )
        }
    }

}
