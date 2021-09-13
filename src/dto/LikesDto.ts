import { User } from "src/entity/user";

export class LikesDto {
    users: User[];
    total: number;
}