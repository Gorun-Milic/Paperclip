import { Controller, Get } from '@nestjs/common';
import { Category } from 'src/entity/category';
import { CategoryService } from 'src/service/category/category/category.service';

@Controller('category')
export class CategoryController {

    constructor(private categoryService: CategoryService) {}

    @Get()
    async findAll(): Promise<Category[]> {
        return await this.categoryService.findAll();
    }


}
