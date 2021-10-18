import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryController } from 'src/controller/country/country.controller';
import { Country } from 'src/entity/country';
import { CountryService } from 'src/service/country/country.service';

@Module({
    imports: [TypeOrmModule.forFeature([Country])],
    controllers: [CountryController],
    providers: [CountryService],
    exports: [CountryService]
})
export class CountryModule {}
