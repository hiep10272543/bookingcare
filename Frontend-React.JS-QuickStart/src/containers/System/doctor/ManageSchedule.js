import React, { Component } from 'react';
import { connect } from "react-redux";
import "./ManageSchedule.scss"
import { FormattedMessage } from 'react-intl'
import Select from 'react-select'
import * as actions from "../../../store/actions"
import { getDetailDoctor, saveBulkScheduleDocotr } from '../../../services/index'
import { LANGUAGES, CRUD_ACTIONS, dateFormat } from '../../../utils'
import { DatePicker } from "../../../components/Input/"
import moment from "moment"
import FormattedDate from '../../../components/Formating/FormattedDate';
import { toast } from 'react-toastify';
class ManageSchedule extends Component {

    constructor(props) {
        super(props)
        this.state = {
            doctorArr: [],
            selectedDoctor: '',
            currentDate: '',
            rangeTime: [],
            doctorId: '',
            disabled: false

        }

    }



    async componentDidMount() {
        await this.props.fetchDoctorStart()
        await this.props.fetchAllcodeHoursStart()
        let user = this.props.userInfo
        if (user && user.roleId && user.roleId === 'R2') {
            this.setState({
                doctorId: user.id,
                disabled: true
            })
        }



    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.doctors !== this.props.doctors) {
            this.setState({
                doctorArr: this.props.doctors
            }, () => {
                console.log(this.state.doctorArr)

            })

        }

        if (prevProps.hours !== this.props.hours) {
            let data = this.props.hours

            if (data && data.length > 0) {
                data.forEach((item) => {
                    item.isSlected = false
                })
            }
            this.setState({
                rangeTime: data
            })
        }
        if (prevState.doctorId !== this.state.doctorId) {
            let { doctorId } = this.state;
            let optionsDoctor = this.buildDataInputSelect(this.state.doctorArr)
            console.log(doctorId, optionsDoctor)

            if (optionsDoctor && optionsDoctor.length > 0 && doctorId) {
                let seclect = optionsDoctor.find((item) => {
                    if (item.value === doctorId) {
                        return item
                    }
                })
                this.setState({
                    selectedDoctor: seclect
                })


            }
        }



    }
    buildDataInputSelect = (InputData) => {
        let results = []
        if (InputData && InputData.length > 0) {
            results = InputData.map((doctor, i) => ({
                value: doctor.id,
                label: `${doctor.lastName}  ${doctor.firstName}`
            }))
        }
        return results
    }


    handleChange = async (selectedDoctor) => {
        this.setState({ selectedDoctor })
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }


    handleClickBtnTime = (hour) => {
        hour.isSlected = !hour.isSlected
        let rangeTime = this.state.rangeTime
        this.setState({
            rangeTime: rangeTime
        })

    }

    handleSaveSchedule = async () => {
        let { rangeTime, selectedDoctor, currentDate } = this.state
        let result = []
        if (!selectedDoctor) {
            toast.error('Invalid Doctor')
            return
        }
        if (!currentDate) {
            toast.error('Invalid date!')
            return
        }



        let formattedDate = new Date(currentDate).getTime()
        // let formattedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER)
        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSlected === true)


            if (selectedTime && selectedTime.length > 0) {
                selectedTime.forEach(item => {
                    let obj = {}
                    obj.doctorId = selectedDoctor.value
                    obj.timeType = item.keyMap
                    obj.date = '' + formattedDate
                    result.push(obj)


                })
            }
            else {
                toast.error('Invalid time!')
                return
            }
        }

        let res = await saveBulkScheduleDocotr({
            arrSchedule: result,
            formattedDate: '' + formattedDate,
            doctorId: selectedDoctor.value


        })
        if (res && res.errCode === 0) {
            toast.success('Save done!')
            rangeTime.forEach((item) => {
                item.isSlected = false

            })
            this.setState({
                rangeTime
            })
        }

    }



    render() {
        let { rangeTime, disabled } = this.state;

        let optionsDoctor = this.buildDataInputSelect(this.state.doctorArr)



        return (

            <>
                <div className="manage-schedule-container">

                    <div className="m-s-title">
                        <FormattedMessage id="manage-schedule.title" />
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="manage-schedule.chose-doctor" />

                                </label>

                                <Select
                                    components={disabled ? {
                                        Menu: () => null,
                                        MenuList: () => null,
                                        DropdownIndicator: () => null,
                                        IndicatorSeparator: () => null
                                    } : {}

                                    }
                                    value={this.state.selectedDoctor}
                                    onChange={this.handleChange}
                                    options={optionsDoctor}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="manage-schedule.chose-date" />

                                </label>
                                <DatePicker className="form-control"
                                    onChange={this.handleOnChangeDatePicker}
                                    value={this.state.currentDate}
                                    minDate={new Date()}
                                />
                            </div>
                            <div className=" col-12 pick-hour-container">
                                {
                                    rangeTime && rangeTime.map((hour, i) => (
                                        <button
                                            className={hour.isSlected ? "btn btn-warning pick-hour-item" : "btn btn-secondary pick-hour-item"}
                                            onClick={() => { this.handleClickBtnTime(hour) }}
                                            key={i}>{hour.valueVi}</button>
                                    ))
                                }

                            </div>
                            <div>

                                <button
                                    onClick={() => { this.handleSaveSchedule() }}
                                    className="my-3 btn btn-primary">
                                    <FormattedMessage id="manage-user.save" />
                                </button>
                            </div>



                        </div>
                    </div>

                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        doctors: state.admin.doctors,
        hours: state.admin.hours,
        language: state.app.language,
        userInfo: state.user.userInfo,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchDoctorStart: () => dispatch(actions.fetchDoctorStart()),
        fetchAllcodeHoursStart: () => dispatch(actions.fetchAllcodeHoursStart()),
        saveDetailDoctorStart: (data) => dispatch(actions.saveDetailDoctorStart(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
