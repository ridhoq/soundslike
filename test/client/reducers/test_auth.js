import reducer from "../../../client/reducers/auth";
import {assert} from "chai";

describe("Auth Reducer", () => {
    it("should return its default state", () => {
        assert.deepEqual(reducer(undefined, {}), {})
    });

    it("should handle LOG_IN", () => {
        const testUser = {
            username: "ridthekid",
            token: "tokenforridthekid"
        }
        assert.deepEqual(
            reducer({}, {type: "LOG_IN", user: testUser}),
            {
                user: {
                    username: testUser.username,
                    token: testUser.token
                }
            }
        );
    });

    it("should handle LOG_OUT", () => {
        const testUser = {
            username: "ridthekid",
            token: "tokenforridthekid"
        };
        const intermediateState = reducer({}, {type: "LOG_IN", user: testUser});
        assert.deepEqual(reducer(intermediateState, {type: "LOG_OUT"}), {});
    });
});