/**
 * Class UpdateTodosCommand
 *
 * @author Olivier Maréchal <o.marechal@icloud.com>
 */
export class UpdateTodosCommand
{
    /**
     * @param name
     * @param todosId
     * @param userId
     */
    constructor(
       public readonly name: string,
       public readonly todosId: string,
       public readonly userId: string
    ) {}
}