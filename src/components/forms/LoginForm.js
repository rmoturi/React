import React, { Component } from 'react';
import {Form, Button} from "semantic-ui-react";
import Validator from "validator";
import InlineError from "../messages/InlineError";
import DropDown from "./DropDown";
import PropTypes from "prop-types";
import AutoCompleteSearch from './AutoCompleteSearch';

class LoginForm extends Component {
    state = {
        data: {
            email: "rmoturi@gmail.com",
            password: "124816"
        },
        loading:false,
        errors: {}
    }

    onChange = e => this.setState({
        data: {...this.state.data, [e.target.name]: e.target.value}
    });

    onSubmit = () => {
        const errors = this.validate(this.state.data);
        this.setState({errors});
        if (Object.keys(errors).length === 0){
            this.props.submit(this.state.data);
        }
    }

    validate = (data) => {
        const errors = {}
        if(!Validator.isEmail(data.email)) errors.email = "Email is invalid!"
        if(!data.password) errors.password = "Password cannot be empty!"; 
        return errors;
    }

    render() {
        const { data, errors } = this.state;
        return (
            <Form onSubmit={this.onSubmit}>
                <Form.Field error={!!errors.email}>
                    <label htmlFor="email">Email</label>
                    <input type="email" 
                        id="email"
                        placeholder="example@example.com"
                        value={data.email}
                        onChange={this.onChange}></input>
                        {errors.email && <InlineError text={errors.email}></InlineError>}
                </Form.Field>
                <Form.Field error={!!errors.password}>
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password"
                        placeholder="password"
                        value={data.password}
                        onChange={this.onChange}></input>
                        {errors.password && <InlineError text={errors.password}></InlineError>}
                </Form.Field>
                <DropDown></DropDown>
                <AutoCompleteSearch></AutoCompleteSearch>
                <Button primary>Login</Button>
            </Form>
        );
    }
}

LoginForm.propTypes = {
    submit: PropTypes.func.isRequired
};

export default LoginForm;