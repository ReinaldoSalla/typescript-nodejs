export const hostname: string = "localhost";

export const port: number = 3000;

export const dbName: string = "test";

export const dbUrl: string = `mongodb://${hostname}:${dbName}`;

interface HttpStatues {
    ok: number,
    created: number,
    noContentUpdated: number,
    noContentDeleted: number

}

export const httpStatues: HttpStatues = {
    ok: 200,
    created: 201,
    noContentUpdated: 204,
    noContentDeleted: 204
};

