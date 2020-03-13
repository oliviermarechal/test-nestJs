import { Module } from '@nestjs/common';
import { AuthService } from '../infra/auth.service';
import { PassportModule } from '@nestjs/passport';
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "../infra/jwt.strategy";
import { AuthController } from '../ui/controller/auth.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Users} from "../../users/domain/entities/users";

@Module({
    imports: [
        PassportModule,
        TypeOrmModule.forFeature([Users]),
        JwtModule.register({
            secret: 'TODO',
            signOptions: { expiresIn: '60m' },
        }),
    ],
    providers: [
        AuthService,
        JwtStrategy
    ],
    exports: [AuthService],
    controllers: [AuthController],
})

export class AuthModule {}
