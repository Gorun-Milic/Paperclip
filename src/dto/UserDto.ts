import { City } from "src/entity/city"
import { Country } from "src/entity/country"
import { Role } from "src/entity/role.enum"

export class UserDto {
    id: string
    firstName: string
    lastName: string
    email: string
    password: string
    city: City
    zipcode: string
    photo: string
    role: Role
}