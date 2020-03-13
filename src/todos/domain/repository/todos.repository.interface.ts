import {Todos} from "../entities/todos";

/**
 * Interface TodosRepository
 *
 * @author Olivier Maréchal <o.marechal@icloud.com>
 */
export interface TodosRepositoryInterface
{
    /**
     * Find all todos for user
     *
     * @return Promise
     * @param userId
     */
    findByUser(userId: string): Promise<Todos[]>

    /**
     * @param todos
     *
     * @return Promise
     */
    save(todos: Todos): Promise<Todos>

    /**
     * @param id
     * @param params
     *
     * @return Promise
     */
    findOne(id: string): Promise<Todos>

    /**
     * @param userId
     * @param todosId
     */
    findOneByUser(todosId: string, userId: string): Promise<Todos>
}