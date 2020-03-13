/**
 * class AddElementsCommand
 *
 * @author Olivier Maréchal <o.marechal@icloud.com>
 */
export class AddElementsCommand {
    constructor(
        public readonly name: string,
        public readonly todoId: string
    ) {}
}