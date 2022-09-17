import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { LANGUAGES } from '../../../utils/constant'
import { FormattedMessage } from "react-intl"
import HomeHeader from '../../HomePage/Header/HomeHeader'
import './detailClinic.scss'
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import HomeFooter from '../../HomePage/HomeFooter';
import ProfileDoctor from '../Doctor/ProfileDoctor'
import { getDetailClinicById, getAllCode } from '../../../services'
import Select from 'react-select';
import _ from 'lodash';

class DetailClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {

            dataDetailClinic: {},
            arrDoctors: [],



        }

    }


    async componentDidMount() {
        await this.getAllDetail()







    }

    getAllDetail = async () => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id

            let res = await getDetailClinicById({
                id: id,
            })

            if (res && res.errCode === 0) {
                let arrDoctor = []
                let arr = res.data.doctorClinic
                if (arr && arr.length > 0) {
                    arrDoctor = arr.map(item => {
                        return item.doctorId
                    })
                }
                this.setState({
                    dataDetailClinic: res.data,
                    arrDoctors: arrDoctor
                })
            }



        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {


        }


    }


    render() {

        let { dataDetailClinic, arrDoctors } = this.state
        console.log(dataDetailClinic)
        return (
            <div className="grid specialty-grid">
                < HomeHeader />
                <div className="specialty-description">
                    <h1
                        style={{
                            textAlign: "center",
                            margin: "20px"
                        }}
                    >{dataDetailClinic.name}</h1>

                    {
                        dataDetailClinic && dataDetailClinic.descriptionHTML &&
                        <div className="container" dangerouslySetInnerHTML={{ __html: dataDetailClinic.descriptionHTML }} >
                        </div>
                    }
                </div>


                <div className="container detail-specialty-container">

                    {
                        arrDoctors && arrDoctors.map((item, i) => {
                            return (


                                <div key={i}
                                    className="each-doctor">
                                    <div className="content-left-specialty">
                                        <ProfileDoctor
                                            id={item}
                                            isShowDescriptionDoctor={true}
                                            isShowLinkDetail={true}
                                        />
                                    </div>
                                    <div className="content-right-specialty">
                                        <div className="doctor-schedule">
                                            <DoctorSchedule
                                                id={item}
                                            />
                                        </div>
                                        <div className="doctor-extra-infor">

                                            <DoctorExtraInfor
                                                id={item}

                                            />
                                        </div>
                                    </div>

                                </div>



                            )
                        })
                    }
                </div>
                <div style={{
                    background: 'white', marginTop: '15px'
                }}>

                    <HomeFooter />
                </div>
            </div >





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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
