import React, { Component } from 'react';
import { connect } from "react-redux";
import "./ManagePatient.scss"
import { FormattedMessage } from 'react-intl'
import Select from 'react-select'
import * as actions from "../../../store/actions"
import { getAllPatientForDoctor, PostSendRemedy } from '../../../services/index'
import { LANGUAGES, CRUD_ACTIONS, dateFormat } from '../../../utils'
import { DatePicker } from "../../../components/Input/"
import moment from "moment"
import RemedyModal from "./RemedyModal"
import FormattedDate from '../../../components/Formating/FormattedDate';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';

class ManagePatient extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currentDate: new Date(),
            dataPatient: [],
            isOpenModalRemedy: false,
            dataModal: {},
            isShowLoading: false,

        }

    }



    async componentDidMount() {


        await this.handleGetPatient()





    }

    handleGetPatient = async () => {
        let { userInfo } = this.props
        let { currentDate } = this.state
        let formattedDate = new Date(currentDate).getTime()

        let res = await getAllPatientForDoctor({ doctorId: userInfo.id, date: formattedDate })

        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data,
                isOpenModalRemedy: false,

            })
        }

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.currentDate !== this.state.currentDate) {
            this.handleGetPatient()
        }




    }

    handleBtnConfirm = (item) => {
        console.log(item)
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName
        }

        this.setState({
            dataModal: data,
            isOpenModalRemedy: true,


        })


    }

    closeBookingModal = () => {
        this.setState({
            isOpenModalRemedy: false,
            dataModal: {}
        })
    }


    sendRemedyModal = async (data) => {
        let { dataModal } = this.state
        this.setState({
            isShowLoading: true,
        })
        let res = await PostSendRemedy({
            email: data.email,
            imageBase64: data.imageBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            patientName: dataModal.patientName,
            language: this.props.language,



        })


        if (res && res.errCode === 0) {
            toast.success('Send Remedy Success')
            this.handleGetPatient()
            this.setState({
                isShowLoading: false,
            })


        }
        else {
            toast.success('Error')
            this.setState({
                isShowLoading: false,
            })

        }



    }

    handleOnChangeDatePicker = (date) => {

        this.setState({
            currentDate: date[0]
        })

    }
    render() {
        let { dataPatient } = this.state;


        return (

            <>

                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text='Loading...'
                >
                </LoadingOverlay>
                <RemedyModal
                    sendRemedyModal={this.sendRemedyModal}
                    dataModal={this.state.dataModal} closeBookingModal={this.closeBookingModal} isOpenModalRemedy={this.state.isOpenModalRemedy} />
                <div className="manage-patient-container container">

                    <h2 className="m-p-title">
                        Quản lý danh sách bệnh nhân khám bệnh
                    </h2>
                    <div className="manage-patient-body row">
                        <div className="col-6 form-group">
                            <label >Chọn ngày khám</label>
                            <DatePicker className="form-control"
                                onChange={this.handleOnChangeDatePicker}
                                value={this.state.currentDate}
                                minDate={moment(new Date()).add(0, 'days').startOf("day").valueOf()}

                            />
                        </div>
                        <div className="col-12 table-patient">
                            <table className="table table-striped ">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Thời Gian</th>
                                        <th scope="col">Họ và Tên</th>
                                        <th scope="col">Giới Tính</th>
                                        <th scope="col">Số điện thoại</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        dataPatient && dataPatient.length > 0 &&
                                        dataPatient.map((item, i) => {
                                            return (
                                                <tr key={i}>
                                                    <th scope="row">{i}</th>
                                                    <td>{item.timeTypeDataPatient.valueVi}</td>
                                                    <td>{item.patientData.firstName}</td>
                                                    <td>{item.patientData.gender === "M" ? 'Nam' : "Nữ"}</td>
                                                    <td>{item.patientData.phonenumber}</td>
                                                    <td>
                                                        <button
                                                            onClick={() => {
                                                                this.handleBtnConfirm(item)
                                                            }}
                                                            className="btn btn-warning mx-2">Xác Nhận</button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }


                                </tbody>
                            </table>
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
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
