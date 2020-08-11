import bent from "bent";
import { ScopeError } from "./errors";
const fetch = bent("json");

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

const BASE_URL = "https://breadfish.de/wcf/auth/";

class OAuth {
    /**
     * Available scopes
     * @type {Array<String>}
     * @memberof OAuth
     */
    _scopes = [];

    /**
     * Creates an instance of OAuth
     * @author LeonMrBonnie
     * @param {}
     * @memberof OAuth
     */
    constructor() {}
    /**
     * Sets the available scopes
     *
     * Use try/catch! This can throw an error
     *
     * @author LeonMrBonnie
     * @param {Array<String>} scopes
     * @memberof OAuth
     */
    setScopes(scopes) {
        for (const scope of scopes) {
            if (!ALLOWED_SCOPES.includes(scope)) throw new ScopeError();
        }
        this._scopes = scopes;
    }
    get scopes() {
        return this._scopes;
    }
}

export default OAuth;
