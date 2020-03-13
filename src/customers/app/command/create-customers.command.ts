/**
 * Class CreateCustomerCommand
 *
 * @author Olivier Maréchal <o.marechal@icloud.com>
 */
export class CreateCustomersCommand
{
    constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly userId: string,
        public readonly siret?: string,
        public readonly phoneNumber?: string,
    ) {}
}