import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductDto } from 'src/dto/productDto';
import { ProductPagination } from 'src/dto/ProductPagination';
import { SearchProduct } from 'src/dto/SearchProduct';
import { SearchProductParams } from 'src/dto/SearchProductParamsDto';
import { UserDto } from 'src/dto/UserDto';
import { Offer } from 'src/entity/offer';
import { Product } from 'src/entity/product';
import { User } from 'src/entity/user';
import { ProductService } from 'src/service/product/product/product.service';

@Controller('product')
export class ProductController {

    constructor(private productService: ProductService) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('photo'))
    async uploadSingleFileWithPost(@UploadedFile() photo, @Body() body) {
        let product = JSON.parse(body.product);
        this.productService.addProduct(product, photo);
    }

    @Post('productsOfUser')
    async productsOfUser(@Body() user: User): Promise<ProductDto[]> {
        return await this.productService.productsOfUser(user);
    }

    @Get(':id')
    async findOne(@Param('id') id): Promise<ProductDto> {
        return await this.productService.findOne(id);
    }

    @Get()
    async findAll(): Promise<ProductDto[]> {
        return await this.productService.findAll();
    }

    @Post('pagination')
    async pagination(@Body() searchProduct: SearchProduct): Promise<ProductPagination> {
        return await this.productService.pagination2(searchProduct);
    }

    @Post('pagination1')
    async pagination1(@Body() searchProduct: SearchProductParams): Promise<ProductPagination> {
        return await this.productService.pagination3(searchProduct);
    }

    @Post('exchange')
    async exchangeProducts(@Body() offer: Offer): Promise<any> {
        return await this.productService.exchangeProducts(offer);
    }

}
