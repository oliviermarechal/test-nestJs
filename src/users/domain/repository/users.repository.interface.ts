import {Users} from "../entities/users";

/**
 * Interface UsersRepositoryInterface
 *
 * @author Olivier Maréchal <o.marechal@icloud.com>
 */
export interface UsersRepositoryInterface
{
    /**
     * @param email
     *
     * @return Promise<Users>
     */
    findByEmail(email: string): Promise<Users>;

    /**
     * @param user
     *
     * @return Promise<Users>
     */
    save(user: Users): Promise<Users>;

    /**
     * @param id
     */
    findOne(id: string);
}