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
        const myLF = localforage.createInstance({name: "soundslike-test"});
        const ah = new AuthHelper(myLF);

        const token = "issa-token";
        ah.logIn(token);

        myLF.getItem(ah.tokenKey).then((item) => {
            assert.equal(item, token);
        });
    });

    after(() => {
        global.window.localStorage._deleteLocation();
    })
});

