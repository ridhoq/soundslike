
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
        return this.localforage.setItem(this.tokenKey, token);
    }

    isLoggedIn() {
        return this.localforage.getItem(this.tokenKey);
    }

    logOut() {
        return this.localforage.removeItem(this.tokenKey);
    }
}
