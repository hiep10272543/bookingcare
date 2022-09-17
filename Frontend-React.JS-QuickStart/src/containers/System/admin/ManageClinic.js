import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { FormattedMessage } from "react-intl"
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import { toast } from 'react-toastify'
import "./ManageClinic.scss";
import MarkdownIt from 'markdown-it';
import Lightbox from 'react-image-lightbox';

import MdEditor from 'react-markdown-editor-lite';
import {
    createClinic, getAllClinic, DeleteClinicById,
    editClinic
} from '../../../services'
import TableManageSpecialty from './TableManageSpecialty';

const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrClinic: [],
            name: '',
            address: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            action: "",
            id: '',
            previewImgURL: '',
            isOpen: false
        }

    }


    async componentDidMount() {
        this.handleGetAllClinic()






    }

    handleGetAllClinic = async () => {
        let res = await getAllClinic()
        if (res && res.errCode === 0) {

            this.setState({
                arrClinic: res.data
            })
        }
    }

    handleEditClinicParent = async (clinic) => {

        console.log(clinic)


        this.setState({
            name: clinic.name,
            address: clinic.address,
            imageBase64: clinic.image,
            previewImgURL: clinic.image,

            descriptionHTML: clinic.descriptionHTML,
            descriptionMarkdown: clinic.descriptionMarkdown,
            action: CRUD_ACTIONS.EDIT,
            id: clinic.id

        })


    }

    componentDidUpdate() {

    }

    handleDeleteClinic = async (id) => {

        await DeleteClinicById(id)
        this.handleGetAllClinic()


    }
    handleChangeInput(e, type) {
        this.setState({
            [type]: e.target.value
        })
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionMarkdown: text,
            descriptionHTML: html,

        })
    }

    handleClickImage = () => {
        if (this.state.previewImgURL) {

            this.setState({ isOpen: true })
        }
    }

    handleOnChangeImage = async (e) => {
        let file = e.target.files[0]
        if (file) {

            let Base64 = await CommonUtils.getBase64(file)
            const objectUrl = URL.createObjectURL(file)

            this.setState({
                imageBase64: Base64,
                previewImgURL: objectUrl

            })
        }






    }

    handleSaveClinic = async (e) => {
        e.preventDefault()
        let { action } = this.state

        if (action === CRUD_ACTIONS.EDIT) {

            let res = await editClinic(this.state)
            if (res && res.errCode === 0) {

                toast.success('Save specialty success')
                this.handleGetAllClinic()
                this.setState({
                    name: '',
                    imageBase64: '',
                    descriptionHTML: '',
                    descriptionMarkdown: '',
                    action: '',
                    id: '',
                    address: '',
                    previewImgURL: '',
                    isOpen: false



                })
            }
            else {
                toast.error('Save clinic failed')
                console.log(res.message)
            }


        }

        else {
            let res = await createClinic(this.state)
            if (res && res.errCode === 0) {
                toast.success('Add new specialty success')
                this.handleGetAllClinic()
                this.setState({
                    name: '',
                    address: '',
                    imageBase64: '',
                    descriptionHTML: '',
                    descriptionMarkdown: '',
                    action: '',
                    id: '',
                    previewImgURL: '',

                })
            }
            else {
                toast.error('Add new clinic failed')
                console.log(res.message)
            }
        }
    }

    render() {
        let { action } = this.state


        return (

            <div className="container manage-specialty-container">
                <div className="ms-title">Phòng khám</div>

                <div className="all-specialty row">
                    <div className="col-6 form-group">
                        <label>Tên phòng khám</label>
                        <input value={this.state.name}
                            onChange={(e) => {
                                this.handleChangeInput(e, 'name')
                            }}
                            type="text" className="form-control" placeholder="" />
                    </div>
                    <div className="col-6 form-group">

                        <div>Ảnh phòng khám</div>
                        <div className="preview-img-container">
                            <label className="label-upload" htmlFor="image">Tải ảnh &#160;
                                <i className="fas fa-cloud-upload-alt"></i>
                            </label>
                            <div className="preview-image" onClick={() => {
                                this.handleClickImage()
                            }} style={{
                                backgroundImage: `url(${this.state.previewImgURL})`
                            }}>

                            </div>
                            <input
                                hidden id="image"
                                onChange={(e) => { this.handleOnChangeImage(e) }}
                                type="file" className="form-control-file" placeholder="" />
                            {
                                this.state.isOpen && <Lightbox
                                    mainSrc={this.state.previewImgURL}
                                    onCloseRequest={() => this.setState({ isOpen: false })} />
                            }

                        </div>

                    </div>

                    <div className="col-12 form-group">
                        <label>Địa chỉ phòng khám</label>
                        <input value={this.state.address}
                            onChange={(e) => {
                                this.handleChangeInput(e, 'address')
                            }}
                            type="text" className="form-control" placeholder="" />
                    </div>

                    <div className="col-12 mt-3">

                        <MdEditor style={{ height: '300px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}

                        />
                    </div>
                    <div className="mt-3 col-12">
                        <button
                            onClick={(e) => { this.handleSaveClinic(e) }}
                            className={action === CRUD_ACTIONS.EDIT ? 'btn btn-warning' : 'btn btn-primary'}
                        >SAVE</button>
                    </div>
                    <TableManageSpecialty
                        table='phòng khám'

                        ArrSpecialty={this.state.arrClinic}
                        handleDeleteSpecialty={(id) => { this.handleDeleteClinic(id) }}
                        handleEditSpecialtyParent={(clinic) => { this.handleEditClinicParent(clinic) }}
                    />
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
