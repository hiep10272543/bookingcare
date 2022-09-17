import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import * as actions from "../../store/actions/index.js";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES, USER_ROLES } from '../../utils'
import _ from 'lodash';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuApp: []
        }
    }

    hadleChangeLanguage = (language) => {
        this.props.changLanguageAppRedux(language)

    }


    componentDidMount() {
        let menu = []
        const { userInfo } = this.props
        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.roleId;
            if (role === USER_ROLES.ADMIN) {
                menu = adminMenu;
            }
            if (role === USER_ROLES.DOCTOR) {
                menu = doctorMenu;
            }

        }
        this.setState({ menuApp: menu })


    }
    render() {
        const { processLogout, userInfo } = this.props;

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>


                <div className="languages">
                    <span className="welcome" ><FormattedMessage id="home-header.welcome" />, &nbsp;
                        {userInfo && userInfo.firstName ? userInfo.firstName : ''}</span>
                    <span
                        className={this.props.language === LANGUAGES.VI ? 'languages-vi active' : 'languages-vi '}
                        onClick={() => { this.hadleChangeLanguage(LANGUAGES.VI) }}>
                        VI</span>
                    <span
                        className={this.props.language === LANGUAGES.EN ? 'languages-en active' : 'languages-en '}

                        onClick={() => {
                            this.hadleChangeLanguage(LANGUAGES.EN)
                        }}>EN</span>
                    {/* nút logout */}
                    <div className="btn btn-logout" onClick={processLogout} title="Log out">
                        <i className="fas fa-sign-out-alt"></i>
                    </div>

                </div>


            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        userInfo: state.user.userInfo,
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changLanguageAppRedux: (language) => dispatch(actions.changLanguageApp(language))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
