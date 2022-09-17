import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { LANGUAGES } from '../../../utils/constant'
import { FormattedMessage } from "react-intl"
import "./BookingModal.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ProfileDoctor from "./ProfileDoctor"
import { DatePicker } from '../../../components/Input'
import * as actions from "../../../store/actions"
import Select from 'react-select';
import { postPatientAppointment } from '../../../services/index'
import { toast } from 'react-toastify';
import _ from 'lodash';
import moment from "moment";
import localization from 'moment/locale/vi'

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: "",
            phoneNumber: "",
            email: "",
            address: "",
            reason: "",
            birtday: "",
            selectedGender: "",
            genders: "",
            doctorId: "",
            timeType: "",
            doctorName: ""

        }

    }


    async componentDidMount() {
        this.props.fetchGenderStart()







    }




    componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.genders !== this.props.genders || prevProps.language !== this.props.language) {
            if (this.props.genders && this.props.genders.length > 0) {
                let data = this.buildDataGender(this.props.genders)
                this.setState({
                    genders: data
                })

            }


        }
        if (prevProps.dataTime !== this.props.dataTime) {
            console.log(this.props.dataTime)
            this.setState({
                doctorId: this.props.dataTime.doctorId,
                timeType: this.props.dataTime.timeType,
                doctorName: `${this.props.dataTime.doctorData.firstName} ${this.props.dataTime.doctorData.lastName}`

            })

        }

        if (prevProps.isOpenModalBooking !== this.props.isOpenModalBooking) {
            this.setState({
                fullName: "",
                phoneNumber: "",
                email: "",
                address: "",
                reason: "",
                birtday: "",
                selectedGender: "",

            })
        }


    }

    buildDataGender = (data) => {


        return data.map((item, i) => {
            let label = LANGUAGES.VI === this.props.language ?
                item.valueVi : item.valueEn
            return {
                label: label,
                value: item.keyMap

            }
        })
    }



    handleChangeInput = (e, type) => {

        this.setState({
            [type]: e.target.value
        }, () => {

        })
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({

            birtday: date[0]
        })
    }
    handleChangeSlect = (selectedOption) => {
        this.setState({
            selectedGender: selectedOption

        })
    }

    builTimeBooking = (dataTime) => {
        let { language } = this.props
        if (dataTime && !_.isEmpty(dataTime)) {
            let date = LANGUAGES.VI === language ?
                moment.unix(+dataTime.date / 1000).format('dddd: DD/MM/YYYY') :
                moment.unix(+dataTime.date / 1000).locale('en').format('ddd: DD/MM/YYYY')
            let hours = dataTime.timeTypeData.valueVi
            return `${hours}-${date}`
        }

    }




    handleConfirmModal = async () => {


        let timeString = this.builTimeBooking(this.props.dataTime)
        let date = this.props.dataTime && this.props.dataTime.date


        let res = await postPatientAppointment({

            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: date,
            selectedGender: this.state.selectedGender.value,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString: timeString,
            doctorName: this.state.doctorName
        })
        if (res && res.errCode === 0) {
            toast.success('Booking a new appointment succed')
            this.props.closeBookingModal()
        } else {
            toast.error('Booking a new appointment failed')

        }
    }
    render() {
        const toggle = () => {
            this.props.closeBookingModal()
        };

        let { dataTime } = this.props

        return (
            < div className="grid booking-modal-container" >







                <Modal
                    centered
                    isOpen={this.props.isOpenModalBooking} toggle={toggle}
                >
                    <ModalHeader toggle={toggle}>
                        <FormattedMessage id="patient.booking-modal.title" />
                    </ModalHeader>
                    <ModalBody>

                        <div className="doctor-info">

                        </div>
                        <div className="price">

                        </div>
                        <div className="row">
                            <ProfileDoctor
                                dataTime={dataTime && dataTime}
                                isShowDescriptionDoctor={false}

                                id={
                                    this.props.dataTime && this.props.dataTime.doctorId && this.props.dataTime.doctorId
                                } />
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="patient.booking-modal.fullName" />

                                </label>
                                <input
                                    value={this.state.fullName}
                                    onChange={(e) => {
                                        this.handleChangeInput(e, 'fullName')
                                    }}
                                    type="text" className="form-control" />
                            </div>
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="patient.booking-modal.phonenumber" />

                                </label>
                                <input
                                    value={this.state.phoneNumber}
                                    onChange={(e) => {
                                        this.handleChangeInput(e, 'phoneNumber')
                                    }}
                                    type="text" className="form-control" />
                            </div>
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="patient.booking-modal.email" />

                                </label>
                                <input
                                    value={this.state.email}
                                    onChange={(e) => {
                                        this.handleChangeInput(e, 'email')
                                    }}
                                    type="text" className="form-control" />
                            </div>
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="patient.booking-modal.address" />

                                </label>
                                <input
                                    value={this.state.address}
                                    onChange={(e) => {
                                        this.handleChangeInput(e, 'address')
                                    }}
                                    type="text" className="form-control" />
                            </div>
                            <div className="col-12 form-group">
                                <label>
                                    <FormattedMessage id="patient.booking-modal.reason" />

                                </label>
                                <input
                                    value={this.state.reason}
                                    onChange={(e) => {
                                        this.handleChangeInput(e, 'reason')
                                    }}
                                    className="form-control" />
                            </div>
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="patient.booking-modal.birthday" />

                                </label>
                                <DatePicker
                                    className="form-control"
                                    onChange={this.handleOnChangeDatePicker}
                                    value={this.state.birtday}


                                />

                            </div>
                            <div className="col-6 form-group">
                                <label>

                                    <FormattedMessage id="patient.booking-modal.gender" />

                                </label>
                                <Select
                                    value={this.state.selectedGender}
                                    onChange={this.handleChangeSlect}
                                    options={this.state.genders}
                                />
                            </div>
                        </div>




                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => {
                            this.handleConfirmModal()
                        }}>
                            <FormattedMessage id="patient.booking-modal.btnConfirm" />

                        </Button>{' '}
                        <Button color="secondary" onClick={toggle}>
                            <FormattedMessage id="patient.booking-modal.btnCancel" />

                        </Button>
                    </ModalFooter>
                </Modal>

            </div>




        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        genders: state.admin.genders

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGenderStart: () => dispatch(actions.fetchGenderStart()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
