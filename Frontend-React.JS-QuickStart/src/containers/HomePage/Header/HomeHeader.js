import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils';
import './HomeHeader.scss';
import { changLanguageApp } from "../../../store/actions"
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import { withRouter } from "react-router";

class HomeHeader extends Component {


    changLanguage = (language) => {
        this.props.changLanguageAppRedux(language)
    }

    handleClick = () => {
        this.props.history.push(`/`)

    }
    handleViewAllSpecialty() {
        this.props.history.push(`/all-specialty`)

    }
    handleViewAllDoctor() {
        this.props.history.push(`/all-doctor`)

    }
    handleViewAllClinic() {
        this.props.history.push(`/all-clinic`)


    }
    render() {
        let language = this.props.language
        return (
            <>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">

                            <i
                                onClick={() => { this.handleClick() }}
                                className="fas fa-home"></i>
                            <div className="header-logo">

                            </div>
                        </div>
                        <div className="center-content">
                            <div
                                onClick={() => this.handleViewAllSpecialty()}

                                className="child-content">
                                <div><b><FormattedMessage id="home-header.speciality" /></b></div>
                                <div className="sub-title">
                                    <FormattedMessage id="home-header.searchdoctor" />
                                </div>
                            </div>
                            <div
                                onClick={() => this.handleViewAllClinic()}

                                className="child-content">
                                <div><b>
                                    <FormattedMessage id="home-header.health-facility" />

                                </b></div>
                                <div className="sub-title">
                                    <FormattedMessage id="home-header.selecte-room" />

                                </div>
                            </div>
                            <div
                                onClick={() => this.handleViewAllDoctor()}
                                className="child-content">
                                <div><b>
                                    <FormattedMessage id="home-header.doctors" />

                                </b></div>
                                <div className="sub-title">
                                    <FormattedMessage id="home-header.selecte-doctor" />

                                </div>
                            </div>
                            <div className="child-content">
                                <div><b>
                                    <FormattedMessage id="home-header.fee" />

                                </b></div>
                                <div className="sub-title">
                                    <FormattedMessage id="home-header.check-health" />

                                </div>
                            </div>
                        </div>
                        <div className="right-content">
                            <div className="suport">
                                <i className="fas fa-question-circle"></i>
                                <FormattedMessage id="home-header.support" />

                            </div>
                            <div className={this.props.language === LANGUAGES.VI ? 'flag lang-vi active' : 'flag lang-vi'}><span onClick={() => { this.changLanguage(LANGUAGES.VI) }}>VI</span></div>
                            <div className={this.props.language === LANGUAGES.EN ? 'flag lang-en active' : 'flag lang-en'}><span onClick={() => { this.changLanguage(LANGUAGES.EN) }}>EN</span></div>

                        </div>

                    </div>

                    {

                        this.props.isShowBanner === true &&
                        <div className="home-header-banner">
                            <div className="title1">
                                <FormattedMessage id="banner.title1" />

                            </div>
                            <div className="title2">
                                <FormattedMessage id="banner.title2" />

                            </div>
                            <div className="search">
                                <i className="fas fa-search"></i>
                                <input type="text" placeholder="Tìm chuyên khoa khám bệnh" />
                            </div>
                            <div
                                onClick={() => this.handleViewAllSpecialty()}
                                className="options">
                                <div className="options-child">
                                    <div className="icon-child">
                                        <i className="fas fa-hospital-alt"></i>
                                    </div>
                                    <div className="text-child">
                                        <FormattedMessage id="banner.child1" />
                                    </div>
                                </div>
                                <div className="options-child">
                                    <div className="icon-child">
                                        <i className="fas fa-mobile-alt"></i>
                                    </div>
                                    <div className="text-child">
                                        <FormattedMessage id="banner.child2" />

                                    </div>
                                </div>
                                <div className="options-child">
                                    <div className="icon-child">
                                        <i className="fas fa-stethoscope"></i>                                </div>
                                    <div className="text-child">
                                        <FormattedMessage id="banner.child3" />

                                    </div>
                                </div>
                                <div className="options-child">
                                    <div className="icon-child">
                                        <i className="fas fa-vial"></i>                                </div>
                                    <div className="text-child">
                                        <FormattedMessage id="banner.child4" />

                                    </div>
                                </div>
                                <div className="options-child">
                                    <div className="icon-child">
                                        <i className="fas fa-user-md"></i></div>
                                    <div className="text-child">
                                        <FormattedMessage id="banner.child5" />

                                    </div>
                                </div>
                                <div className="options-child">
                                    <div className="icon-child">
                                        <i className="fas fa-procedures"></i>                                    </div>
                                    <div className="text-child">
                                        <FormattedMessage id="banner.child6" />

                                    </div>
                                </div>


                            </div>
                        </div>
                    }
                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        changLanguageAppRedux: (language) => dispatch(changLanguageApp(language))

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
