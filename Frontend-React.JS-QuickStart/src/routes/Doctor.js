import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from '../containers/Header/Header';
import ManageSchedule from '../containers/System/doctor/ManageSchedule';
import ManagePatient from '../containers/System/doctor/ManagePatient';
class Doctor extends Component {
    render() {

        const { isLoggedIn } = this.props;
        return (

            <>
                {isLoggedIn && <Header />}
                <div className="Doctor-container">
                    <div className="Doctor-list">
                        <Switch>
                            <Route path="/doctor/manage-chedule" component={ManageSchedule} />
                            <Route path="/doctor/manage-patient" component={ManagePatient} />
                            <Route component={() => { return (<Redirect to={"/doctor/manage-chedule"} />) }} />

                        </Switch>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,


    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
