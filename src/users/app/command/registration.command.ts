/**
 * Class RegistrationCommand
 *
 * @author Olivier Maréchal <o.marechal@icloud.com>
 */
export class RegistrationCommand {
    /**
     * @param email: string
     * @param password: string
     */
    constructor(
        public readonly email: string,
        public readonly password: string
    ) {}
}