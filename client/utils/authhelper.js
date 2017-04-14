
const TOKEN_KEY = "soundslike-user-token";

export default class AuthHelper {

    // localForage must already be initialized
    constructor(localforage) {
        if (!localforage) {
            throw new Error("AuthHelper must be initialized with a localforage object");
        }

        this.localforage = localforage;
    }
}
