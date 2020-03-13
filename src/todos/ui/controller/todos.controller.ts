import {Body, Controller, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {Todos} from "../../domain/entities/todos";
import {JwtAuthGuard} from "../../../auth/infra/jwt-auth.guard";
import {ValidationPipe} from "../../../pipe/validation.pipe";
import {TodosDto} from "../dto/todos.dto";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {CreateTodosCommand} from "../../app/command/create-todos.command";
import {UserDecorator} from "../../../users/infra/decorator/users.decorator";
import {UserAuthenticatedInterface} from "../../../auth/domain/user-authenticated.interface";
import {AddElementsCommand} from "../../app/command/add-elements.command";
import {ElementsDto} from "../dto/elements.dto";
import {FindAllTodosQuery} from "../../app/query/find-all-todos.query";
import {UpdateTodosCommand} from "../../app/command/update-todos.command";

@Controller('todos')
export class TodosController {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
    ) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll(@UserDecorator() user: UserAuthenticatedInterface): Promise<Todos[]> {
        return this.queryBus.execute(new FindAllTodosQuery(user.id));
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(
        @UserDecorator() user: UserAuthenticatedInterface,
        @Body(new ValidationPipe()) todosDto: TodosDto
    ): Promise<Todos> {
        return await this.commandBus.execute(new CreateTodosCommand(todosDto, user.id));
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    async update(
        @UserDecorator() user: UserAuthenticatedInterface,
        @Body(new ValidationPipe()) todosDto: TodosDto,
        @Param() params
    ): Promise<Todos> {
        return await this.commandBus.execute(new UpdateTodosCommand(todosDto.name, params.id, user.id));
    }

    @Post(':id/elements')
    @UseGuards(JwtAuthGuard)
    async addElement(@Body(new ValidationPipe()) elementDto: ElementsDto, @Param() params): Promise<Todos> {
        return await this.commandBus.execute(new AddElementsCommand(elementDto.name, params.id));
    }
}
