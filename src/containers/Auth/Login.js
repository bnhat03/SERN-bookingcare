import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import { KeyCodeUtils, LanguageUtils } from "../../utils";

import './Login.scss';
import { FormattedMessage } from 'react-intl';

import {handleLoginAPI} from '../../services/userService'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: '',
        }
    }
    handleOnchangeUsername = (event) => {
        this.setState({
            errMessage: '',
            username: event.target.value
        })
    }
    handleOnchangePassword = (event) => {
        this.setState({
            errMessage: '',
            password: event.target.value
        })
    }
    handleLogin = async () => {
        console.log('username: ', this.state.username, ', password: ', this.state.password)
        // if (!this.state.username || !this.state.password) {
        //     this.setState({
        //         errMessage: 'Missing input!!',
        //     })
        // }
        try {
            let data = await handleLoginAPI(this.state.username, this.state.password);
            if (data && data.EC !==0) {
                this.setState({
                    errMessage: data.EM,
                })
            }
            else if (data && data.EC===0) {
                this.props.userLoginSuccess(data.DT);
            } 
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.EM,
                    })
                }
            }
        }
    }
    handleShowOrHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }
    // Enter
    handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.keyCode === 13) {
            this.handleLogin();
        }
    }



    render() {

        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>Login</div>

                        <div className='col-12 form-group login-input'>
                            <label>Username: </label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter your username'
                                value={this.state.username}
                                onChange={(event) => this.handleOnchangeUsername(event)}

                            />
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Password: </label>
                            <div className='custom-input-password'>
                                <input
                                    type={this.state.isShowPassword ? 'text' : 'password'}
                                    className='form-control'
                                    placeholder='Enter your password'
                                    value={this.state.password}
                                    onChange={(event) => this.handleOnchangePassword(event)}
                                    onKeyDown={(event) => this.handleKeyDown(event)}

                                />
                                <span onClick={() => this.handleShowOrHidePassword()}>
                                    <i class={this.state.isShowPassword ? 'far fa-eye-slash' : 'far fa-eye'}></i>
                                </span>
                            </div>
                        </div>

                        <div className='col-12' style={{color: 'red'}}>
                            {this.state.errMessage}
                        </div>

                        <div className='col-12'>
                            <button className='btn-login' onClick={() => this.handleLogin()}>Login</button>
                        </div>

                        <div className='col-12'>
                            <span className='forgot-password'>Forgot your password?</span>
                        </div>

                        <div className='col-12 text-center mt-3'>
                            <span className='text-other-login'>Or login with: </span>
                        </div>
                        <div className='col-12 social-login'>
                            <i className='fab fa-google-plus-g google'></i>
                            <i className='fab fa-facebook-f facebook'></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
        // adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
