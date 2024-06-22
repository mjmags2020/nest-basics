export declare class UsersController {
    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN'): any[];
    findAllIterns(id: string): any[];
    findOne(id: string): {
        id: string;
    };
    create(user: {}): {};
    update(id: string, userUpdate: {}): {
        id: string;
    };
    delete(id: string): {
        id: string;
    };
}
