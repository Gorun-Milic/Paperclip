import { SaveDto } from "src/dto/SaveDto";
import { Save } from "src/entity/save";
import { saveMapper } from "./saveMapper";

export function saveArrayMapper(saveArray: Save[]): SaveDto[] {

    let saveDtos: SaveDto[] = [];

    for (let i=0; i<saveArray.length; i++) {
        console.log(saveArray[i]);
        saveDtos.push(saveMapper(saveArray[i]));
    }

    return saveDtos;
}