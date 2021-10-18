import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { City } from 'src/entity/city';
import { Country } from 'src/entity/country';
import { CityService } from 'src/service/city/city.service';

@Controller('city')
export class CityController {

    constructor(
        private cityService: CityService
    ) {}

    @Get(':name')
    async findCities(@Param('name') name): Promise<City[]> {
        console.log(name);
        return await this.cityService.findCities(name);
    }

}
