import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {UpdateTodosCommand} from "../command/update-todos.command";
import {InjectRepository} from "@nestjs/typeorm";
import {TodosRepositoryInterface} from "../../domain/repository/todos.repository.interface";
import {TodosRepository} from "../../infra/repository/todos.repository";
import {Todos} from "../../domain/entities/todos";
import {UnauthorizedException} from "@nestjs/common";

/**
 * Class UpdateTodosHandler
 *
 * @author Olivier Maréchal <o.marechal@icloud.com>
 */
@CommandHandler(UpdateTodosCommand)
export class UpdateTodosHandler implements ICommandHandler<UpdateTodosCommand>
{
    /**
     * @param todosRepository: TodosRepositoryInterface
     */
    constructor(
        @InjectRepository(TodosRepository)
        private readonly todosRepository: TodosRepositoryInterface,
    ) {}

    /**
     * @param command: UpdateTodosCommand
     */
    async execute(command: UpdateTodosCommand): Promise<Todos>
    {
        const todos = await this.todosRepository.findOneByUser(command.todosId, command.userId);
        if (!todos) {
            throw new UnauthorizedException('Access denied');
        }

        todos.name = command.name;

        return await this.todosRepository.save(todos);
    }
}