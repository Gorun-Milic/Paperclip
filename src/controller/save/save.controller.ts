import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { SaveDto } from 'src/dto/SaveDto';
import { Offer } from 'src/entity/offer';
import { Save } from 'src/entity/save';
import { User } from 'src/entity/user';
import { SaveService } from 'src/service/save/save.service';

@Controller('save')
export class SaveController {

    constructor(
        private saveService: SaveService
    ) {}

    @Post('addSave')
    async addLikes(@Body() save: Save): Promise<Save> {
        return await this.saveService.addSave(save);
    }

    @Delete(':id')
    async forget(@Param('id') id): Promise<Save> {
        return await this.saveService.forget(id);
    }

    @Post('isSaved')
    async isSaved(@Body() save: Save): Promise<Save> {
        return await this.saveService.isSaved(save);
    }

    @Post('savedByUser')
    async savedByUser(@Body() user: User): Promise<SaveDto[]> {
        return await this.saveService.savedByUser(user);
    }

    @Post('deleteSaves')
    async deleteSaves(@Body() offer: Offer): Promise<any> {
        return await this.saveService.deleteSaves(offer);
    }

}
