export class SignupRequest {

    constructor(
        public name: string,
        public cpf: string,
        public email: string,
        public password: string
    ) {}

}