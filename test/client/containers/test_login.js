import React from "react";
import {mount} from "enzyme";
import {assert} from "chai";
import sinon from "sinon";

import LogInFormContainer from "../../../client/containers/login";
import {SignUpForm} from "../../../client/components/login";
import APIHelper from "../../../client/utils/apihelper";

describe("<LogInFormContainer/>", () => {
    it("should display an error when a user tries to sign up with an existing username/email", (done) => {
        // stub APIHelper.signUp to return the error
        const signUpErrorMessage = "this user already exists";
        var apiHelperStub = sinon.stub(APIHelper, "signUp").resolves(
            {
                status: 400,
                headers: {},
                json: {
                    "error": "bad request",
                    "message": signUpErrorMessage
                }
            }
        );

        const wrapper = mount(<LogInFormContainer apiHelper={APIHelper}/>);
        wrapper.find("#usernameInput").simulate("change", {target: {value: "corn-row-kenny"}});
        wrapper.find("#emailInput").simulate("change", {target: {value: "klamar@tde.com"}});
        wrapper.find("#passwordInput").simulate("change", {target: {value: "behumble"}});
        wrapper.find("#confirmPasswordInput").simulate("change", {target: {value: "behumble"}});
        wrapper.find("#signUpForm").simulate("submit");

        setTimeout(() => {
            assert.isOk(apiHelperStub.calledOnce);
            assert.isOk(wrapper.state().signUpError);
            assert.equal(wrapper.state().signUpErrorMessage, signUpErrorMessage);
            assert.isOk(wrapper.find("#signUpErrorAlert"));
            apiHelperStub.restore();
            done();
        });
    });
});

