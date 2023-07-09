export class ValueNotExist extends Error {
    constructor() {
        super('The value does not exist in the table.')
    }
}