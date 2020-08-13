import { assert, expect } from "chai";
import OAuth from "../src/oauth.js";
import * as Errors from "../src/errors.js";

describe("Breadfish OAuth Test", () => {
    it("should test the scopes", () => {
        assert(
            OAuth.getValidScopes().length === 18,
            "Available scope length is not the default (18)"
        );
        assert(
            OAuth.isValidScope(OAuth.getValidScopes()) === true,
            "Available scopes are not all valid scopes"
        );
    });
    it("should test exception handling", async () => {
        assert.throw(
            () => new OAuth("", "").getAuthURL(),
            Errors.ScopeError,
            "Invalid scope passed",
            "Auth URL could be generated without passing a scope"
        );
    });
    it("should test the url validation", () => {
        assert(
            OAuth.isValidURL("https://www.leonmrbonnie.de") === true,
            "Valid URL was returned as invalid"
        );
        assert(
            OAuth.isValidURL("./:abc/") === false,
            "Invalid URL was returned as valid"
        );
    });
});
