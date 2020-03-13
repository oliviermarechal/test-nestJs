import {Controller, Post, UnauthorizedException, Body} from '@nestjs/common';
import { AuthService } from '../../infra/auth.service';
import {Users} from "../../../users/domain/entities/users";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() user: Users) {
        const loggedUser = await this.authService.validateUser(user.email, user.password);
        if (loggedUser) {
            return this.authService.login(loggedUser);
        }

        throw new UnauthorizedException();
    }
}
