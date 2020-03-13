import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreateTodosCommand} from "../command/create-todos.command";
import {InjectRepository} from "@nestjs/typeorm";
import {Todos} from "../../domain/entities/todos";
import {TodosRepositoryInterface} from "../../domain/repository/todos.repository.interface";
import {Users} from "../../../users/domain/entities/users";
import {Repository} from "typeorm";

/**
 * Class CreateTodosHandler
 *
 * @author Olivier Maréchal <o.marechal@icloud.com>
 */
@CommandHandler(CreateTodosCommand)
export class CreateTodosHandler implements ICommandHandler<CreateTodosCommand> {
    /**
     * @param todosRepository: TodosRepositoryInterface
     * @param usersRepository: Repository // TODO create and use interface
     */
    constructor(
        @InjectRepository(Todos)
        private readonly todosRepository: TodosRepositoryInterface,
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>
    ) {}

    /**
     * @return Promise<Todos>
     * @param command: CreateTodosCommand
     */
    async execute(command: CreateTodosCommand) {
        const todos = new Todos();
        todos.name = command.name;
        todos.user = await this.usersRepository.findOne(command.userId);

        return await this.todosRepository.save(todos);
    }
}