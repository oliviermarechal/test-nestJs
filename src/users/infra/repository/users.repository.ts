import {UsersRepositoryInterface} from "../../domain/repository/users.repository.interface";
import {EntityRepository, Repository} from "typeorm";
import {Users} from "../../domain/entities/users";

/**
 * Class UsersRepository
 *
 * @author Olivier Maréchal <o.marechal@icloud.com>
 */
@EntityRepository(Users)
export class UsersRepository extends Repository<Users> implements UsersRepositoryInterface
{
    /**
     * @param email
     *
     * @return Promise<Users>
     */
    async findByEmail(email: string): Promise<Users>
    {
        return await this.findOne({ where: { email: email }});
    }
}