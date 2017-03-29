import React from "react";
import {shallow} from "enzyme";
import assert from "assert";

import {SignUpForm} from "../../../../static/components/login/login"

describe("<SignUpForm/>", () =>  {
    it("has four form-groups", () => {
        const wrapper = shallow(<SignUpForm/>);
        assert.equal(wrapper.find(".form-group").length, 4);
    });
});