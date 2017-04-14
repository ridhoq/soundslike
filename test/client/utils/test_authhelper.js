import {assert} from "chai";
import localforage from "localforage";

import AuthHelper from "../../../client/utils/authhelper"

describe("AuthHelper", () => {
    it("should take a localForage instance", () => {
        assert.throws(() => {
            const ah = new AuthHelper();
        });

        assert.doesNotThrow(() => {
            const ah = new AuthHelper(localforage.createInstance({name: "soundslike-test"}));
        });

        const ah = new AuthHelper(localforage.createInstance({name: "soundslike-test"}));
        assert.isOk(ah.localforage);
    });

    it("should save a user's token when logIn is called", () => {
        const myLF = localforage.createInstance({name: "soundslike-test-1"});
        const ah = new AuthHelper(myLF);
        const token = "issa-token";

        ah.logIn(token).then(() => {
            myLF.getItem(ah.tokenKey).then((item) => {
                assert.equal(item, token);
            });
        });
    });

    it("should check user's logged in status", () => {
        const myLF = localforage.createInstance({name: "soundslike-test-2"});
        const ah = new AuthHelper(myLF);
        const token = "issa-token";

        return ah.isLoggedIn()
            .then((token) => assert.isNotOk(token))
            .then(() => ah.logIn(token))
            .then(() => ah.isLoggedIn())
            .then((token) => assert.isOk(token))
        .catch((err) => {
            console.log(err);
            assert.isOk(false);
        });
    });

    after(() => {
        global.window.localStorage._deleteLocation();
    })
});

