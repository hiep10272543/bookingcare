import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { LANGUAGES, CommonUtils } from '../../../utils'
import { FormattedMessage } from "react-intl"
import "./RemedyModal.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import * as actions from "../../../store/actions"

import { postPatientAppointment } from '../../../services/index'
import { toast } from 'react-toastify';
import _ from 'lodash';
import moment from "moment";
import localization from 'moment/locale/vi'

class RemedyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            imageBase64: '',

        }

    }


    async componentDidMount() {


    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataModal !== this.props.dataModal) {

            this.setState({
                email: this.props.dataModal.email
            })
        }




    }




    handleOnChangeImage = async (e) => {
        let file = e.target.files[0]
        if (file) {

            let Base64 = await CommonUtils.getBase64(file)
            this.setState({
                imageBase64: Base64,

            }, () => { console.log(this.state.imageBase64) })
        }




    }





    handleConfirmModal = async () => {
        await this.props.sendRemedyModal(this.state)

    }

    // dataModal
    // closeBookingModal
    render() {
        const toggle = () => {

            this.props.closeBookingModal()
        };
        let { dataModal } = this.props;


        return (
            < div className="grid booking-modal-container" >







                <Modal
                    centered
                    isOpen={this.props.isOpenModalRemedy} toggle={toggle}
                >
                    <ModalHeader toggle={toggle}>
                        Gửi hóa đơn khám bệnh thành công
                    </ModalHeader>
                    <ModalBody>
                        <div className="row">
                            <div className="col-6 form-group">
                                <label>Email bệnh nhân</label>
                                <input
                                    value={this.state.email}
                                    onChange={(e) => {
                                        this.setState({ email: e.target.value })
                                    }}
                                    type="email" className="form-control" />
                            </div>

                            <div className="col-6 form-group">
                                <label htmlFor="fileModalPatient">Chọn files đơn thuốc</label>
                                <input
                                    onChange={(e) => { this.handleOnChangeImage(e) }}
                                    type="file" className="form-control" id="fileModalPatient" placeholder="" />
                            </div>

                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => {
                            this.handleConfirmModal()
                        }}>
                            Gửi hóa đơn thành công
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

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
