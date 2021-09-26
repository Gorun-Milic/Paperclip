import { SaveDto } from "src/dto/SaveDto";
import { Save } from "src/entity/save";
import { productMapper } from "./productMapper";

export function saveMapper(save: Save): SaveDto {
    let saveDto: SaveDto = new SaveDto();

    saveDto.id = save.id;
    saveDto.product = productMapper(save.product);
    saveDto.user = save.user;
    
    return saveDto;
}