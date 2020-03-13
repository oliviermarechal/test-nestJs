import {Todos} from "../../domain/entities/todos";
import {EntityRepository, Repository} from "typeorm";
import {TodosRepositoryInterface} from "../../domain/repository/todos.repository.interface";

@EntityRepository(Todos)
export class TodosRepository extends Repository<Todos> implements TodosRepositoryInterface{
    async findByUser(userId: string): Promise<Todos[]> {
        return this.find({
            join: { alias: 'todos', innerJoin: { users: 'todos.user' } },
            where: qb => {
                qb.where('users.id = :id', { id: userId });
            },
            relations: ["elements"]
        });
    }

    /**
     * @param userId
     * @param todosId
     */
    async findOneByUser(todosId: string, userId: string): Promise<Todos>
    {
        return await this.createQueryBuilder('t')
            .leftJoinAndSelect('t.user', 'u')
            .where('t.id = :id')
            .andWhere('u.id = :userId')
            .setParameters({ id: todosId, userId: userId })
            .getOne()
    }
}