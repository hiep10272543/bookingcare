import React, { Component } from 'react';
import { connect } from "react-redux";
import "./DoctorSchedule.scss"
import { FormattedMessage } from 'react-intl'
import Select from 'react-select'
import * as actions from "../../../store/actions"
import { getScheduleDoctorById } from '../../../services/index'
import { LANGUAGES, CRUD_ACTIONS, dateFormat } from '../../../utils'
import { DatePicker } from "../../../components/Input"
import moment from "moment";
import localization from 'moment/locale/vi'
import FormattedDate from '../../../components/Formating/FormattedDate';
import { toast } from 'react-toastify';
import BookingModal from './BookingModal'



class DoctorSchedule extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedOption: {},
            allDay: [],
            allAvalableTimes: [],
            isOpenModalBooking: false,
            dataScheduleTimeModal: ''

        }

    }



    async componentDidMount() {
        let { language } = this.props
        // console.log(moment(new Date()).format('dddd - DD/MM'))
        // console.log(moment(new Date()).locale('en').format('dddd - DD/MM'))
        this.setArrDay()


    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    setArrDay = async () => {
        let arrDate = []
        for (let i = 1; i < 7; i++) {
            let obj = {}
            if (this.props.language === LANGUAGES.VI) {

                let label = moment(new Date()).add(i, 'days').format("dddd - DD/MM")
                obj.label = this.capitalizeFirstLetter(label)

            }
            else {
                obj.label = moment(new Date()).add(i, 'days').locale('en').format("dddd - DD/MM")

            }
            obj.value = moment(new Date()).add(i, 'days').startOf("day").valueOf()
            arrDate.push(obj)

        }
        let res = await getScheduleDoctorById(this.props.id, arrDate[0].value)
        if (res && res.errCode === 0) {
            this.setState({
                allDay: arrDate,
                selectedOption: arrDate[0],
                allAvalableTimes: res.data ? res.data : []
            })
        }
        else {
            this.setState({
                allDay: arrDate,
                selectedOption: arrDate[0],
                allAvalableTimes: []
            })

        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setArrDay()
        }
        if (this.props.id !== prevProps.id) {
            this.setArrDay()
        }



    }
    handleChange = async (selectedOption) => {
        let res = await getScheduleDoctorById(this.props.id, selectedOption.value)
        if (res && res.errCode === 0) {
            this.setState({
                allAvalableTimes: res.data ? res.data : [],
                selectedOption: selectedOption
            })
        }
        else {
            this.setState({

                allAvalableTimes: [],
                selectedOption: selectedOption,

            })
        }

    }
    handleClickScheduleTime(time) {
        this.setState({
            isOpenModalBooking: true,
            dataScheduleTimeModal: time
        })
    }

    closeBookingModal() {
        this.setState({
            isOpenModalBooking: false,
        })
    }


    render() {

        const { selectedOption, allAvalableTimes } = this.state;
        const customStyles = {
            option: (provided, state) => ({
                ...provided,

                borderBottom: '1px solid pink',
                color: state.isSelected ? '' : '',
                padding: 15,
            }),
            control: () => ({
                // none of react-select's styles are passed to <Control />
                width: 200,
            }),
            singleValue: (provided, state) => {
                const opacity = state.isDisabled ? 0.5 : 1;
                const transition = 'opacity 300ms';

                return { ...provided, opacity, transition };
            }
        }



        return (
            <>
                <BookingModal
                    dataTime={this.state.dataScheduleTimeModal}
                    closeBookingModal={() => this.closeBookingModal()}
                    isOpenModalBooking={this.state.isOpenModalBooking}

                />
                <div className="doctor-schedule-container">
                    <div className="all-schedule">
                        <i className="fas fa-calendar-alt">
                        </i>
                        <Select
                            styles={customStyles}
                            value={selectedOption}
                            onChange={this.handleChange}
                            options={this.state.allDay}
                        />

                    </div>
                    <div className="all-available-time mt-1 mx-3">
                        <div className="time-content  ">

                            {
                                allAvalableTimes && allAvalableTimes.length > 0 ?
                                    allAvalableTimes.map((item, i) => {
                                        return (
                                            <button
                                                onClick={() => this.handleClickScheduleTime(item)}

                                                key={i} className="my-1 btn btn-warning">{item.timeTypeData.valueVi}</button>

                                        )
                                    })
                                    :
                                    <div><FormattedMessage id="manage-schedule.no-appointment" /></div>
                            }

                        </div>
                    </div>

                </div>
            </>

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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
