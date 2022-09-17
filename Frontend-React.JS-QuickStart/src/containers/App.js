import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';
import CustomScrollbars from '../components/CustomScrollbars'

import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';

import { path } from '../utils'

import Home from '../routes/Home';
import HomePage from './HomePage/HomePage';
// import Login from '../routes/Login';
import Login from '../containers/Auth/Login';

import Header from './Header/Header';
import System from '../routes/System';
import Doctor from '../routes/Doctor'
import VerifyEmail from '../containers/Patient/VerifyEmail'

import { CustomToastCloseButton } from '../components/CustomToast';
import ConfirmModal from '../components/ConfirmModal';
import DetailDoctor from '../containers/Patient/Doctor/DetailDoctor';
import DetailSpecialty from '../containers/Patient/Specialty/detailSpecialty';
import DetailClinic from '../containers/Patient/Clinic/detailClinic';
import Tracking from '../containers/Patient/Tracking/Tracking';
import Allspecialty from '../containers/Patient/Specialty/allSpeacilty';
import Alldoctor from '../containers/Patient/Doctor/Alldoctor';
import Allclinic from '../containers/Patient/Clinic/Allclinic';
class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">
                        {/* {this.props.isLoggedIn && <Header />} */}

                        <div className="content-container">
                            <CustomScrollbars style={{ height: '100vh', width: '100%' }} >
                                <Switch>
                                    <Route path={path.HOME} component={(Home)} />
                                    <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                    <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                    <Route path={'/doctor/'} component={userIsAuthenticated(Doctor)} />
                                    <Route path={path.HOMEPAGE} exact component={HomePage} />
                                    <Route path={path.DETAIL_DOCTOR} component={DetailDoctor} />
                                    <Route path={path.DETAIL_SPECIALTY} component={DetailSpecialty} />
                                    <Route path={path.DETAIL_CLINIC} component={DetailClinic} />
                                    <Route path={path.VERIFY_EMAIL_BOOKING} component={VerifyEmail} />
                                    <Route path={path.DETAIL_TRACKING} component={Tracking} />
                                    <Route path={path.ALL_DOCTOR} component={Alldoctor} />
                                    <Route path={path.ALL_CLINIC} component={Allclinic} />
                                    <Route path={path.ALL_SPECIALTY} component={Allspecialty} />
                                </Switch>

                            </CustomScrollbars>

                        </div>

                        <ToastContainer
                            position="bottom-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                        />
                    </div>
                </Router>
            </Fragment >
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);