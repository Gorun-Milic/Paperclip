import { City } from "src/entity/city"
import { Country } from "src/entity/country"

export class UserDto {
    id: string
    firstName: string
    lastName: string
    email: string
    password: string
    city: City
    zipcode: string
    photo: string
}