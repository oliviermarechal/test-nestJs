import {IsEmail, IsString} from 'class-validator';
import {Users} from "../../domain/entities/users";

export class UsersDto {
    @IsEmail({}, { message: 'Format d\'email invalide' })
    email: string;

    @IsString()
    password: string

    toEntity() {
        const user = new Users();
        user.email = this.email;
        user.password = this.password;

        return user;
    }
}
