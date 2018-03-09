export class User {
    public readonly err;
    private cpf;
    private name;
    private email;

    constructor(user: {
        cpf: number,
        name: string,
        email: string
    }) {
        Object.assign(this, user);
    }

    getCpf() {
        return this.cpf;
    }
}