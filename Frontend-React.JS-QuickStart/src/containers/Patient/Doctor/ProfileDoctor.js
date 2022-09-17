import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch, Link } from 'react-router-dom';
import { LANGUAGES } from '../../../utils/constant'
import { FormattedMessage } from "react-intl"
import { getProfileDoctorById } from '../../../services/index'
import './ProfileDoctor.scss'
import moment from "moment";
import localization from 'moment/locale/vi'


class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {}


        }

    }


    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.id)
        this.setState({ dataProfile: data })





    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.id !== this.props.id) {
            let data = await this.getInforDoctor(this.props.id)
            this.setState({ dataProfile: data })
        }
    }

    getInforDoctor = async (id) => {
        let result = {}
        if (id) {
            let profile = await getProfileDoctorById(id)
            if (profile && profile.errCode === 0) {
                result = profile.message
            }
        }
        return result
    }

    renderTimeBooking = (dataTime, priceData) => {
        let { language } = this.props

        let date = LANGUAGES.VI === language ?
            moment.unix(+dataTime.date / 1000).format('dddd: DD/MM/YYYY') :
            moment.unix(+dataTime.date / 1000).locale('en').format('ddd: DD/MM/YYYY')
        let hours = dataTime.timeTypeData.valueVi
        let price = LANGUAGES.VI === language ? `${priceData.valueVi} VND` : `${priceData.valueEn} $`
        return (<>
            <div>{hours} - {date}</div>
            <div>Giá khám: {price} </div>
        </>)
    }
    render() {

        let { dataProfile } = this.state
        let { isShowDescriptionDoctor, dataTime, isShowLinkDetail, id } = this.props
        let price = ''
        price = dataProfile && dataProfile.Doctor_infor && dataProfile.Doctor_infor.priceTypeData && dataProfile.Doctor_infor.priceTypeData
        return (

            <div className="infor-doctor-container">
                <div className="mt-1 mb-1 intro-doctor ">
                    <div className="content-left">
                        <img src={dataProfile && dataProfile.image &&
                            new Buffer(dataProfile.image, 'base64').toString('binary')

                        } className="content-left-img"></img>
                        {
                            isShowLinkDetail === true &&
                            <Link className="show-link-detail"
                                to={`/detail-doctor/${id}`}>
                                <div >
                                    Xem thêm
                                </div>

                            </Link>

                        }
                    </div>
                    <div className="content-right">

                        <div className="header-description-detail ">
                            {this.props.language === LANGUAGES.VI ? `${dataProfile && dataProfile.positionData && dataProfile.positionData.valueVi}` : `${dataProfile && dataProfile.positionData && dataProfile.positionData.valueEn}`}
                            ,{dataProfile && dataProfile.firstName} {dataProfile && dataProfile.lastName}
                        </div>
                        {
                            isShowDescriptionDoctor && <div className="content-description-detail">
                                {dataProfile && dataProfile.Markdown && dataProfile.Markdown.description}
                            </div>
                        }
                        {
                            !isShowDescriptionDoctor && price && dataTime && this.renderTimeBooking(dataTime, price)
                        }

                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
