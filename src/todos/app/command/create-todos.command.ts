/**
 * Class CreateTodosCommand
 *
 * @author Olivier Maréchal <o.marechal@icloud.com>
 */
import {TodosDto} from "../../ui/dto/todos.dto";

export class CreateTodosCommand {
    name: string;
    userId: string;

    constructor(todosDto: TodosDto, userId) {
        this.name = todosDto.name;
        this.userId = userId;
    }
}