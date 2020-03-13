import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {AddElementsCommand} from "../command/add-elements.command";
import {InjectRepository} from "@nestjs/typeorm";
import {Todos} from "../../domain/entities/todos";
import {TodosRepositoryInterface} from "../../domain/repository/todos.repository.interface";
import {Repository} from "typeorm";
import {Elements} from "../../domain/entities/elements";

/**
 * class AddElementsHandler
 *
 * @author Olivier Maréchal <o.marechal@icloud.com>
 */
@CommandHandler(AddElementsCommand)
export class AddElementsHandler implements ICommandHandler<AddElementsCommand> {
    /**
     * @param todosRepository: TodosRepositoryInterface
     * @param elementsRepository : Repository<Elements> // TODO create interface
     */
    constructor(
        @InjectRepository(Todos)
        private readonly todosRepository: TodosRepositoryInterface,
        @InjectRepository(Elements)
        private readonly elementsRepository: Repository<Elements>
    ) {}

    /**
     * @param command: AddElementsCommand
     */
    async execute(command: AddElementsCommand) {
        const element = new Elements();
        element.name = command.name;
        element.done = false;

        const todo = await this.todosRepository.findOne(command.todoId);
        element.todos = todo;

        return await this.elementsRepository.save(element);
    }
}