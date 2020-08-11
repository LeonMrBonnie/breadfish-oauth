export class ScopeError extends Error {
    constructor() {
        super("Invalid scope passed");
        this.name = "ScopeError";
    }
}
