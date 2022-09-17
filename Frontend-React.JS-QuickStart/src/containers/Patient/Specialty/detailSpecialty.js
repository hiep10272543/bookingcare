import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { LANGUAGES } from '../../../utils/constant'
import { FormattedMessage } from "react-intl"
import './detailSpecialty.scss'
import DoctorSchedule from '../../Patient/Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import HomeHeader from '../../HomePage/Header/HomeHeader'
import HomeFooter from '../../HomePage/HomeFooter';
import ProfileDoctor from '../../Patient/Doctor/ProfileDoctor'
import { getDetailSpecialtyById, getAllCode } from '../../../services'
import Select from 'react-select';
import _ from 'lodash';

class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctors: '',
            dataDerailSpecialty: {},
            listProvinces: [],
            selectedProvince: {}


        }

    }


    async componentDidMount() {
        await this.getAllDetail()







    }

    getAllDetail = async () => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let res = await getDetailSpecialtyById({
                id: id,
                location: 'ALL'
            })
            let resProvince = await getAllCode('PROVINCE')

            if (res && res.errCode === 0 && resProvince && resProvince.errCode === 0) {
                let selectedProvince = this.buildDataInputSelect(resProvince.message)
                this.setState({
                    listProvinces: selectedProvince,
                    selectedProvince: selectedProvince[0],
                    dataDerailSpecialty: res.data,
                    arrDoctors: res.data.doctorSpecialty.map((item) => {
                        return item.doctorId
                    })

                })
            }

        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
            this.getAllDetail()

        }
        if (prevState.selectedProvince !== this.state.selectedProvince) {
            let id = this.props.match.params.id
            let location = this.state.selectedProvince.value
            let res = await getDetailSpecialtyById({
                id: id,
                location: location
            })


            if (res && +res.errCode === 0) {
                let data = res.data
                let arrDoctor = []
                if (data && !_.isEmpty(data)) {
                    let arr = data.doctorSpecialty
                    if (arr && arr.length > 0) {
                        arrDoctor = arr.map(item => {
                            return item.doctorId
                        })
                    }
                    this.setState({
                        arrDoctors: arrDoctor,
                        dataDerailSpecialty: res.data
                    })
                }
                else {
                    this.setState({
                        arrDoctors: [],
                        dataDerailSpecialty: {}
                    })
                }


            }
        }
    }



    buildDataInputSelect = (InputData) => {
        let results = []

        let language = this.props.language
        let labelFirtProvice = language === LANGUAGES.VI ? "Toàn quốc" : 'Nationwide'

        if (InputData && InputData.length > 0) {
            results = InputData.map((item, i) => {
                let label = language === LANGUAGES.VI ? item.valueVi : item.valueEn
                return ({
                    value: item.keyMap,
                    label: label
                })

            })
        }

        return [{
            value: 'ALL',
            label: labelFirtProvice
        }, ...results]
    }
    handleChange = async (selectedProvince) => {

        this.setState({ selectedProvince: selectedProvince })
    }






    render() {

        let { arrDoctors, dataDerailSpecialty, selectedProvince } = this.state

        return (
            <div className="grid specialty-grid">
                <HomeHeader />
                <div className="specialty-description">
                    {

                        dataDerailSpecialty && dataDerailSpecialty.descriptionHTML &&
                        <div className="container" dangerouslySetInnerHTML={{ __html: dataDerailSpecialty.descriptionHTML }} >
                        </div>
                    }
                </div>


                <div className="container detail-specialty-container">
                    <div className="search-sp-doctor">
                        <Select
                            value={selectedProvince}
                            onChange={this.handleChange}
                            options={this.state.listProvinces}
                        />


                    </div>
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
            </div>




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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
