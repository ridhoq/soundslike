
export default class AuthHelper {

    // localForage must already be initialized
    constructor(localforage) {
        if (!localforage) {
            throw new Error("AuthHelper must be initialized with a localforage object");
        }

        this.localforage = localforage;
        this.tokenKey = "soundslike-user-token";
    }

    logIn(token) {
        this.localforage.setItem(this.tokenKey, token);
    }
}
