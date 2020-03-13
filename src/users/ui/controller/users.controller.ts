import {Body, ClassSerializerInterceptor, Controller, Get, Post, UseGuards, UseInterceptors} from '@nestjs/common';
import {JwtAuthGuard} from "../../../auth/infra/jwt-auth.guard";
import {UsersDto} from "../dto/users.dto";
import {ValidationPipe} from "../../../pipe/validation.pipe";
import {CommandBus} from "@nestjs/cqrs";
import {RegistrationCommand} from "../../app/command/registration.command";
import {UserDecorator} from "../../infra/decorator/users.decorator";
import {UserAuthenticatedInterface} from "../../../auth/domain/user-authenticated.interface";

@Controller('users')
export class UsersController {
    constructor(
       readonly commandBus: CommandBus
    ) {}

    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(JwtAuthGuard)
    @Get('me')
    me(@UserDecorator() user: UserAuthenticatedInterface) {
        return user;
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Post('registration')
    async register(@Body(new ValidationPipe()) usersDto: UsersDto) {
        return await this.commandBus.execute(new RegistrationCommand(usersDto.email, usersDto.password));
    }
}
