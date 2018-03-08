export class User {
    public readonly err;
    private cpf;

    constructor(user: {cpf: number}) {
        Object.assign(this, user);
    }

    getCpf() {
        return this.cpf;
    }
}