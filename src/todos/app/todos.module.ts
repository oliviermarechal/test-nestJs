import { Module } from '@nestjs/common';
import { TodosController } from '../ui/controller/todos.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Elements} from "../domain/entities/elements";
import {TodosRepository} from "../infra/repository/todos.repository";
import {CqrsModule} from "@nestjs/cqrs";
import {CreateTodosHandler} from "./commandHandler/create-todos.handler";
import {AddElementsHandler} from "./commandHandler/add-elements.handler";
import {FindAllTodosFinder} from "./queryFinder/find-all-todos.finder";
import {UsersRepository} from "../../users/infra/repository/users.repository";
import {UpdateTodosHandler} from "./commandHandler/update-todos.handler";

/* Export command handlers */
export const CommandHandlers = [
    CreateTodosHandler,
    AddElementsHandler,
    UpdateTodosHandler
];

/* Export query finder */
export const QueryFinders = [
    FindAllTodosFinder
];

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature( [TodosRepository, Elements, UsersRepository] )
    ],
    controllers: [TodosController],
    providers: [
        ...CommandHandlers,
        ...QueryFinders
    ]
})

export class TodosModule {}