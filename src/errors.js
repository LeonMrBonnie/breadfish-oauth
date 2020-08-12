export class ScopeError extends Error {
    constructor() {
        super("Invalid scope passed");
        this.name = "ScopeError";
    }
}

export class CredentialsError extends Error {
    constructor() {
        super("Invalid credentials passed");
        this.name = "CredentialsError";
    }
}

export class URLError extends Error {
    constructor() {
        super("Invalid URL passed");
        this.name = "URLError";
    }
}
