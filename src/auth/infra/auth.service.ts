import {Injectable, UnauthorizedException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {Users} from "../../users/domain/entities/users";
import * as bcrypt from 'bcrypt';
import {UsersRepositoryInterface} from "../../users/domain/repository/users.repository.interface";
import {InjectRepository} from "@nestjs/typeorm";
import {UsersRepository} from "../../users/infra/repository/users.repository";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(UsersRepository)
        private readonly userRepository: UsersRepositoryInterface
    ) {}

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        return await bcrypt
            .compare(pass, user.password)
            .then(isValid => {
                if (isValid) {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const {password, ...restUserData} = user;

                    return restUserData;
                }

                Promise.reject('Invalid password');
            })
            .catch((error) => Promise.reject(new UnauthorizedException(error.toString())));
    }

    async login(user: Users) {
        const payload = { email: user.email, id: user.id };
        return {
            token: this.jwtService.sign(payload)
        };
    }
}
