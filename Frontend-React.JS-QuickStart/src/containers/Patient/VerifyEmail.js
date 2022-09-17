import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { LANGUAGES } from '../../utils/constant'
import { FormattedMessage } from "react-intl"
import { verifyPatientAppointment } from "../../services/index"
import HomeHeader from '../HomePage/Header/HomeHeader'
class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            errCode: 0,


        }

    }


    async componentDidMount() {

        if (this.props.match.params.doctorId && this.props.match.params.token) {
            let doctorId = this.props.match.params.doctorId
            let token = this.props.match.params.token
            let res = await verifyPatientAppointment({
                doctorId: doctorId,
                token: token
            })

            if (res && res.errCode === 0) {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode
                })
            }
            else {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode ? res.errCode : -1
                })
            }
        }






    }

    componentDidUpdate() {



    }



    render() {

        let { statusVerify, errCode } = this.state

        return (
            <>
                <HomeHeader />
                <div className="row " style={{
                    height: '100vh',
                    marginTop: "100px",

                }}>
                    <div className="text-center col-12">
                        {
                            !statusVerify ? `Loading.......` :
                                <div>
                                    {
                                        errCode == 0 ?
                                            <>
                                                <div style={{
                                                    fontWeight: 'bold',
                                                    fontSize: '30px',
                                                    color: 'green'
                                                }}>
                                                    <i class="fas fa-check-circle"></i>
                                                    {' '}
                                                    Xác nhận lịch hẹn thành công</div>
                                            </>
                                            :
                                            <>
                                                <div style={{
                                                    color: 'red',
                                                    fontWeight: 'bold',
                                                    fontSize: '30px',
                                                }}>
                                                    <i class="fas fa-times-circle"> </i>
                                                    {' '}
                                                    Lịch hẹn không tồn tại hoặc đã xác nhận
                                                </div>
                                            </>

                                    }
                                </div>

                        }

                    </div>

                </div>

            </ >
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
