import { Module } from '@nestjs/common';
import { UsersController } from '../ui/controller/users.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CqrsModule} from "@nestjs/cqrs";
import {RegistrationHandler} from "./commandHandler/registration.handler";
import {UsersRepository} from "../infra/repository/users.repository";

export const CommandHandlers = [
    RegistrationHandler
];

@Module({
  imports: [
      CqrsModule,
      TypeOrmModule.forFeature([UsersRepository])
  ],
  controllers: [UsersController],
  providers: [
      ...CommandHandlers
  ]
})

export class UsersModule {}
