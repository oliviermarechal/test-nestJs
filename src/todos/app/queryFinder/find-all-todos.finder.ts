import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {FindAllTodosQuery} from "../query/find-all-todos.query";
import {InjectRepository} from "@nestjs/typeorm";
import {TodosRepositoryInterface} from "../../domain/repository/todos.repository.interface";
import {Todos} from "../../domain/entities/todos";

@QueryHandler(FindAllTodosQuery)
export class FindAllTodosFinder implements IQueryHandler<FindAllTodosQuery>
{
    /**
     * @param todosRepository:TodosRepositoryInterface
     */
    constructor(
        @InjectRepository(Todos)
        private readonly todosRepository: TodosRepositoryInterface
    ) {}

    /**
     * @param query: FindAllTodosQuery
     *
     * @return Promise<Todos[]>
     */
    async execute(query: FindAllTodosQuery): Promise<Todos[]> {
        return await this.todosRepository.findByUser(query.userId);
    }
}