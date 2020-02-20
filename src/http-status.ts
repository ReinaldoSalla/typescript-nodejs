interface HttpStatues {
    ok: number,
    created: number,
    noContentUpdated: number,
    noContentDeleted: number,
    badRequest: number
}

export const httpStatus: HttpStatues = {
    ok: 200,
    noContentUpdated: 200,
    noContentDeleted: 200,
    created: 201,
    badRequest: 400
};

