interface HttpStatus {
    ok: number,
    created: number,
    noContentUpdated: number,
    noContentDeleted: number,
    badRequest: number,
    unprocessableEntity: number
}

export const httpStatus: HttpStatus = {
    ok: 200,
    noContentUpdated: 200,
    noContentDeleted: 200,
    created: 201,
    badRequest: 400,
    unprocessableEntity: 422

};

