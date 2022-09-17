import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLogin } from "../../services"


class Login extends Component {
    constructor(props) {
        super(props);
        this.btnLogin = React.createRef();
        this.state = {
            userName: '',
            password: '',
            typePassword: 'password',
            errorMessage: ''
        }
    }
    handleClick = async () => {
        this.setState({ errorMessage: '' })
        try {

            let data = await handleLogin(this.state.userName, this.state.password)
            if (data && data.errCode !== 0) {
                this.setState({ errorMessage: data.message })

            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.userData)
            }




        }
        catch (err) {
            if (err.response) {

                this.setState({ errorMessage: err.response.data.message })

            }


        }
    }
    handleTogglePassword() {

        let type = this.state.typePassword === 'password' ? 'text' : 'password';
        this.setState({ typePassword: type })
    }

    render() {
        return (<div className="login-background">
            <div className="login-container">
                <div className="login-content row">
                    <div className="text-login col-12 ">Login</div>
                    <div className="col-12 form-group login-input">
                        <label className="">User</label>
                        <input
                            value={this.state.userName}
                            onChange={(e) => this.setState({ userName: e.target.value })}
                            type="text" className="form-control" placeholder="Enter your username" />
                    </div>
                    <div className="col-12 form-group login-input">
                        <label className="">password</label>
                        <input
                            value={this.state.password}
                            onChange={(e) => this.setState({ password: e.target.value })}

                            type={this.state.typePassword} className="form-control" placeholder="Enter your password" />
                        <div onClick={() => this.handleTogglePassword()}>
                            <i className="fas fa-eye"></i>

                        </div>
                    </div>
                    <div className="col-12" style={{ color: 'red' }}>
                        {this.state.errorMessage}
                    </div>
                    <div className="col-12 ">

                        <button onClick={() => this.handleClick()} type="button" className="btn-login">Login</button>
                    </div>

                    <div className="col-12">
                        <span className="forgot-password"> Forgot your Password?</span>
                    </div>

                    <div className="col-12 text-center">
                        <span className="login-orther-with">Or log with:</span>
                    </div>

                    <div className="col-12 social-login text-center">
                        <i className="icon-login fab fa-google-plus-g"></i>
                        <i className="icon-login fab fa-facebook-f"></i>

                    </div>
                </div>
            </div>
        </div >)
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language,
        userInfo: state.user.userInfo,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
        userLoginFail: () => dispatch(actions.userLoginFail()),
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Login);