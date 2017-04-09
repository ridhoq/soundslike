import React from "react";
import {shallow} from "enzyme";
import {assert} from "chai";

import {SignUpForm} from "../../../client/components/login"

describe("<SignUpForm/>", () =>  {
    it("has four form-groups", () => {
        const wrapper = shallow(<SignUpForm/>);
        assert.equal(wrapper.find(".form-group").length, 4);
    });

    it("should validate that a username is entered", () => {
        const wrapper = shallow(<SignUpForm/>);

        // input a username
        wrapper.find("#usernameInput").simulate("change", {target: {value: "corn-row-kenny"}});
        assert.isOk(wrapper.find("#usernameFormGroup").hasClass("has-success"));
        assert.isOk(wrapper.find("#usernameInput").hasClass("form-control-success"));
        assert.isNotOk(wrapper.find("#usernameFormGroup").hasClass("has-danger"));
        assert.isNotOk(wrapper.find("#usernameInput").hasClass("form-control-danger"));

        // clear the input
        wrapper.find("#usernameInput").simulate("change", {target: {value: ""}});
        assert.isOk(wrapper.find("#usernameFormGroup").hasClass("has-danger"));
        assert.isOk(wrapper.find("#usernameInput").hasClass("form-control-danger"));
        assert.isNotOk(wrapper.find("#usernameFormGroup").hasClass("has-success"));
        assert.isNotOk(wrapper.find("#usernameInput").hasClass("form-control-success"));
    });

    it("should validate that a email is entered", () => {
        const wrapper = shallow(<SignUpForm/>);

        // input an invalid email
        wrapper.find("#emailInput").simulate("change", {target: {value: "klamar@tde"}});
        assert.isOk(wrapper.find("#emailFormGroup").hasClass("has-danger"));
        assert.isOk(wrapper.find("#emailInput").hasClass("form-control-danger"));
        assert.isNotOk(wrapper.find("#emailFormGroup").hasClass("has-success"));
        assert.isNotOk(wrapper.find("#emailInput").hasClass("form-control-success"));

        // input a valid email
        wrapper.find("#emailInput").simulate("change", {target: {value: "klamar@tde.com"}});
        assert.isOk(wrapper.find("#emailFormGroup").hasClass("has-success"));
        assert.isOk(wrapper.find("#emailInput").hasClass("form-control-success"));
        assert.isNotOk(wrapper.find("#emailFormGroup").hasClass("has-danger"));
        assert.isNotOk(wrapper.find("#emailInput").hasClass("form-control-danger"));
    });

    it("should validate that a correct password has been entered", () => {
        const wrapper = shallow(<SignUpForm/>);

        // input an invalid password
        wrapper.find("#passwordInput").simulate("change", {target: {value: "behum"}});
        assert.isOk(wrapper.find("#passwordFormGroup").hasClass("has-danger"));
        assert.isOk(wrapper.find("#passwordInput").hasClass("form-control-danger"));
        assert.isNotOk(wrapper.find("#passwordFormGroup").hasClass("has-success"));
        assert.isNotOk(wrapper.find("#passwordInput").hasClass("form-control-success"));

        // input a valid password
        wrapper.find("#passwordInput").simulate("change", {target: {value: "behumble"}});
        assert.isOk(wrapper.find("#passwordFormGroup").hasClass("has-success"));
        assert.isOk(wrapper.find("#passwordInput").hasClass("form-control-success"));
        assert.isNotOk(wrapper.find("#passwordFormGroup").hasClass("has-danger"));
        assert.isNotOk(wrapper.find("#passwordInput").hasClass("form-control-danger"));
    });

    it("should validate that confirm password input matches the password", () => {
        const wrapper = shallow(<SignUpForm/>);

        // password and confirm password don't match
        wrapper.find("#passwordInput").simulate("change", {target: {value: "behumble"}});
        wrapper.find("#confirmPasswordInput").simulate("change", {target: {value: "behum"}});
        assert.isOk(wrapper.find("#confirmPasswordFormGroup").hasClass("has-danger"));
        assert.isOk(wrapper.find("#confirmPasswordInput").hasClass("form-control-danger"));
        assert.isNotOk(wrapper.find("#confirmPasswordFormGroup").hasClass("has-success"));
        assert.isNotOk(wrapper.find("#confirmPasswordInput").hasClass("form-control-success"));

        // password and confirm password match
        wrapper.find("#confirmPasswordInput").simulate("change", {target: {value: "behumble"}});
        assert.isOk(wrapper.find("#confirmPasswordFormGroup").hasClass("has-success"));
        assert.isOk(wrapper.find("#confirmPasswordInput").hasClass("form-control-success"));
        assert.isNotOk(wrapper.find("#confirmPasswordFormGroup").hasClass("has-danger"));
        assert.isNotOk(wrapper.find("#confirmPasswordInput").hasClass("form-control-danger"));
    });
});