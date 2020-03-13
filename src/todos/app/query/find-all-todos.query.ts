/**
 * Class FindAllTodosQuery
 *
 * @author Olivier Maréchal <o.marechal@icloud.com>
 */
export class FindAllTodosQuery {
    /**
     * @param userId
     */
    constructor(
       public readonly userId: string
    ) {}
}