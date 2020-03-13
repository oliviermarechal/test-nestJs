import {Todos} from "../../domain/entities/todos";
import {IsString} from "class-validator";

export class TodosDto {
    @IsString()
    name: string;

    toEntity(): Todos {
        const todos = new Todos();
        todos.name = this.name;

        return todos;
    }
}