import { Module } from '@nestjs/common';
import { CustomersController } from '../ui/controller/customers.controller';
import {CqrsModule} from "@nestjs/cqrs";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CreateCustomersHandler} from "./commandHandler/create-customers.handler";
import {CustomersRepository} from "../infra/repository/customers.repository";
import {UsersRepository} from "../../users/infra/repository/users.repository";

export const CommandHandlers = [
    CreateCustomersHandler
];

@Module({
  imports: [
      CqrsModule,
      TypeOrmModule.forFeature([CustomersRepository, UsersRepository])
  ],
  controllers: [CustomersController],
  providers: [
    ...CommandHandlers,
  ]
})
export class CustomersModule {}
