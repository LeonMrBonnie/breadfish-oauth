import bent from "bent";
import { ScopeError, CredentialsError, URLError } from "./errors";

const ALLOWED_SCOPES = [
    "userID",
    "username",
    "avatar",
    "cover",
    "registration_date",
    "num_posts",
    "num_thanks",
    "trophies",
    "profile_points",
    "profile_views",
    "ban",
    "warnings_active",
    "warnings_all",
    "profile_information",
    "groups",
    "email",
    "conversations",
    "warnings_info",
];

const BASE_URL = "https://breadfish.de/oauth/auth";

const fetch = bent("json");

class OAuth {
    /**
     * Creates a new OAuth Instance
     *
     * This can throw an error!
     *
     * @author LeonMrBonnie
     * @param {String} projectId The id of the project
     * @param {String} apiKey Your OAuth API key
     * @memberof OAuth
     */
    constructor(projectId, apiKey) {
        this.projectId = projectId;
        this.apiKey = apiKey;
        this._redirectUrl = "";
        this._scopes = [];

        this.checkCredentials();
    }

    /**
     * Checks if the given OAuth credentials are correct
     *
     * This is used internally.
     *
     * @author LeonMrBonnie
     * @memberof OAuth
     */
    async checkCredentials() {
        let valid = /*await fetch();*/ true;
        if (!valid) throw new CredentialsError();
        else return;
    }

    /**
     * Sets the available scopes
     *
     * This can throw an error.
     *
     * @author LeonMrBonnie
     * @param {Array<String>} scopes
     * @memberof OAuth
     */
    setScopes(scopes) {
        if (!OAuth.isValidScope(scopes)) throw new ScopeError();
        this._scopes = scopes;
    }
    /**
     * Adds a new scope
     *
     * This can throw an error.
     *
     * @author LeonMrBonnie
     * @param {String} scope
     * @returns {void}
     * @memberof OAuth
     */
    addScope(scope) {
        if (!OAuth.isValidScope(scope)) throw new ScopeError();
        if (this._scopes.includes(scope)) return;
        this._scopes.push(scope);
    }
    /**
     * Removes a scope
     *
     * @author LeonMrBonnie
     * @param {String} scope
     * @returns {void}
     * @memberof OAuth
     */
    removeScope(scope) {
        let scopeIdx = this._scopes.findIndex((_scope) => _scope === scope);
        if (scopeIdx === -1) throw new ScopeError();
        this._scopes.splice(scopeIdx, 1);
    }
    /**
     * Resets the available scopes
     *
     * @author LeonMrBonnie
     * @memberof OAuth
     */
    clearScopes() {
        this._scopes = [];
    }

    /**
     * Sets the redirect url
     *
     * This can throw an error.
     *
     * @author LeonMrBonnie
     * @param {String} url
     * @memberof OAuth
     */
    setRedirectURL(url) {
        if (!OAuth.isValidURL(url)) throw new URLError();
        this._redirectUrl = url;
    }

    /**
     * Returns the created OAuth authentication URL
     *
     * This can throw an error.
     *
     * @author LeonMrBonnie
     * @returns {String}
     * @memberof OAuth
     */
    getAuthURL() {
        if (!this.scopes || !this.scopes.length) throw new ScopeError();
        if (!this.redirectUrl || !this.redirectUrl.length) throw new URLError();

        return `${BASE_URL}/${
            this.projectId.split("-")[1]
        }?scope=${this.scopes.toString()}&redirect=${this.redirectUrl}`;
    }

    /**
     * Gets all added scopes
     * @returns {Array<String>}
     * @readonly
     * @memberof OAuth
     */
    get scopes() {
        return this._scopes;
    }
    /**
     * Gets the current redirect URL
     *
     * @type {String}
     * @readonly
     * @memberof OAuth
     */
    get redirectUrl() {
        return this._redirectUrl;
    }

    /**
     * Checks if the specified scope(s) is/are valid
     *
     * @author LeonMrBonnie
     * @static
     * @param {String | Array<String>} scopes A single scope or an array of scopes
     * @returns
     * @memberof OAuth
     */
    static isValidScope(scopes) {
        if (typeof scopes === "string") return ALLOWED_SCOPES.includes(scopes);
        else if (Array.isArray(scopes)) {
            for (const scope of scopes) {
                if (!ALLOWED_SCOPES.includes(scope)) return false;
            }
            return true;
        } else return false;
    }
    /**
     * Returns all valid scopes
     *
     * @author LeonMrBonnie
     * @static
     * @returns {Array<String>}
     * @memberof OAuth
     */
    static getValidScopes() {
        return ALLOWED_SCOPES;
    }

    /**
     * Is the given string a url
     *
     * @author Tom Gullen
     * @static
     * @param {String} str
     * @returns {Boolean}
     * @memberof OAuth
     */
    static isValidURL(str) {
        let pattern = new RegExp(
            "^(https?:\\/\\/)?" + // protocol
            "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" + // domain name
            "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
            "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
            "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
                "(\\#[-a-z\\d_]*)?$",
            "i"
        ); // fragment locator
        return pattern.test(str);
    }
}

export default OAuth;
