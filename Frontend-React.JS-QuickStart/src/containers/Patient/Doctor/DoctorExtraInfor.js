import React, { Component } from 'react';
import { connect } from "react-redux";
import "./DoctorExtraInfor.scss"
import { FormattedMessage } from 'react-intl'
import Select from 'react-select'
import * as actions from "../../../store/actions"
import { getExtraInforDoctorById } from '../../../services/index'
import { LANGUAGES, CRUD_ACTIONS, dateFormat } from '../../../utils'
import { DatePicker } from "../../../components/Input"
import moment from "moment";
import localization from 'moment/locale/vi'
import FormattedDate from '../../../components/Formating/FormattedDate';
import { toast } from 'react-toastify';
import NumberFormat from 'react-number-format';




class DoctorExtraInfor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            extraInfo: {},
            isDetailInfo: false
        }

    }

    async componentDidMount() {
        let res = await getExtraInforDoctorById(this.props.id)
        if (res && res.error === 0) {
            this.setState({ extraInfo: res.data })
        }

    }

    // getExtraInforDoctorById

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {


        }

        if (this.props.id !== prevProps.id) {
            let res = await getExtraInforDoctorById(this.props.id)
            if (res && res.error === 0) {
                this.setState({ extraInfo: res.data })
            }

        }



    }

    showHiddenInfor = () => {
        this.setState({ isDetailInfo: !this.state.isDetailInfo })
    }
    render() {

        let { extraInfo, isDetailInfo } = this.state
        let { clinicTypeData, addressClinic, note, priceTypeData, provinceTypeData, paymentTypeData } = extraInfo
        let { language } = this.props

        return (

            <div className="doctor-extra-info-container">

                <div className="doctor-extra-content-up">
                    <div className="text-address">
                        <FormattedMessage id="patient.extra-doctor-infor.text-address" />
                    </div>
                    <div className="name-clinic">
                        <FormattedMessage id="patient.extra-doctor-infor.clinic" />

                        {
                            clinicTypeData && clinicTypeData.name
                        }
                    </div>
                    <div className="detail-address">{addressClinic}</div>
                </div>
                <div className="doctor-extra-content-down">
                    {!isDetailInfo &&
                        <div className="tilte-price">
                            <FormattedMessage id="patient.extra-doctor-infor.tilte-price" />
                            : {

                                priceTypeData && priceTypeData.valueVi && language === LANGUAGES.VI &&
                                <NumberFormat
                                    value={priceTypeData.valueVi}
                                    className="foo"
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={' VND'}
                                    renderText={(value, props) => <span style={{
                                        color: 'black',
                                        fontWeight: '300'
                                    }} {...props}>{value}</span>}
                                />}

                            {priceTypeData && priceTypeData.valueEn && language === LANGUAGES.EN &&
                                <NumberFormat
                                    value={priceTypeData.valueEn}
                                    className="foo"
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={' $'}
                                    renderText={(value, props) => <span style={{
                                        color: 'black',
                                        fontWeight: '300'
                                    }}  {...props}>{value}</span>}
                                />




                            }
                            <span onClick={this.showHiddenInfor}>Xem chi tiết</span></div>

                    }
                    {isDetailInfo &&
                        <>
                            <div className="tilte-price">
                                <FormattedMessage id="patient.extra-doctor-infor.tilte-price" />

                            </div>
                            <div className="detail-info">
                                <div className="price">
                                    <span className="left">
                                        <FormattedMessage id="patient.extra-doctor-infor.tilte-price" />

                                    </span>
                                    <span className="right">

                                        {priceTypeData && priceTypeData.valueVi && language === LANGUAGES.VI &&
                                            <NumberFormat
                                                value={priceTypeData.valueVi}
                                                className="foo"
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={' VND'}
                                                renderText={(value, props) => <span style={{
                                                    color: 'black',
                                                    fontWeight: '300'
                                                }} {...props}>{value}</span>}
                                            />}

                                        {priceTypeData && priceTypeData.valueEn && language === LANGUAGES.EN &&
                                            <NumberFormat
                                                value={priceTypeData.valueEn}
                                                className="foo"
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={' $'}
                                                renderText={(value, props) => <span style={{
                                                    color: 'black',
                                                    fontWeight: '300'
                                                }}  {...props}>{value}</span>}
                                            />




                                        }
                                    </span>
                                </div>
                                <div className="note">
                                    {note}

                                </div>
                            </div>
                            <div className="payment">
                                <FormattedMessage id="patient.extra-doctor-infor.payment" />
                                : {
                                    paymentTypeData && paymentTypeData.valueVi

                                }</div>
                            <div className="hidden"
                                onClick={this.showHiddenInfor}
                            >Ẩn bảng giá</div>
                        </>}

                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
