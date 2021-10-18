import { Controller, Get } from '@nestjs/common';
import { Country } from 'src/entity/country';
import { CountryService } from 'src/service/country/country.service';

@Controller('country')
export class CountryController {

    constructor(
        private contryService: CountryService
    ) {}

    @Get()
    async findCountries(): Promise<Country[]> {
        return await this.contryService.findCountries();
    }
}
