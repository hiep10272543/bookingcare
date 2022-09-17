import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { FormattedMessage } from "react-intl"
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import { toast } from 'react-toastify'
import "./ManageSpecialty.scss";
import MarkdownIt from 'markdown-it';
import Lightbox from 'react-image-lightbox';
import MdEditor from 'react-markdown-editor-lite';
import TableManageSpecialty from './TableManageSpecialty';
import { createSpecialty, getAllSpecialty, DeleteSpecialtyById, editSpecialty } from '../../../services'
const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            ArrSpecialty: [],
            action: "",
            id: '',
            previewImgURL: '',
            isOpen: false



        }

    }


    async componentDidMount() {

        this.handleGetAllSpecialty()






    }
    handleGetAllSpecialty = async () => {
        let res = await getAllSpecialty()
        if (res && res.errCode === 0) {
            this.setState({
                ArrSpecialty: res.data
            })
        }
    }


    handleDeleteSpecialty = async (id) => {

        await DeleteSpecialtyById(id)
        this.handleGetAllSpecialty()


    }

    componentDidUpdate() {

    }
    handleChangeInput(e) {
        this.setState({
            name: e.target.value
        })
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionMarkdown: text,
            descriptionHTML: html,

        })
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

    handleClickImage = () => {
        if (this.state.previewImgURL) {

            this.setState({ isOpen: true })
        }
    }

    handleEditSpecialtyParent = async (spec) => {


        this.setState({
            name: spec.name,
            imageBase64: spec.image,
            previewImgURL: spec.image,
            descriptionHTML: spec.descriptionHTML,
            descriptionMarkdown: spec.descriptionMarkdown,
            action: CRUD_ACTIONS.EDIT,
            id: spec.id

        }, () => { console.log(this.state) })


    }

    handleSaveSpecialty = async (e) => {
        e.preventDefault()
        let { action } = this.state

        if (action === CRUD_ACTIONS.EDIT) {

            let res = await editSpecialty(this.state)
            if (res && res.errCode === 0) {

                toast.success('Save specialty success')
                this.handleGetAllSpecialty()

                this.setState({
                    name: '',
                    imageBase64: '',
                    descriptionHTML: '',
                    descriptionMarkdown: '',
                    action: '',
                    id: '',
                    previewImgURL: ''


                })
            }
            else {
                toast.error('Save specialty failed')
                console.log(res.message)
            }


        }

        else {
            let res = await createSpecialty(this.state)
            if (res && res.errCode === 0) {

                toast.success('Add new specialty success')
                this.handleGetAllSpecialty()

                this.setState({
                    name: '',
                    imageBase64: '',
                    descriptionHTML: '',
                    descriptionMarkdown: '',
                    action: '',
                    id: '',
                    previewImgURL: ''




                })
            }
            else {
                toast.error('Add new specialty failed')
                console.log(res.message)
            }

        }

    }

    render() {



        return (

            <div className="container manage-specialty-container">
                <div className="ms-title"> Quản lý chuyên khoa</div>

                <div className="all-specialty row">
                    <div className="col-6 form-group">
                        <label>Tên chuyên khoa</label>
                        <input value={this.state.name}
                            onChange={(e) => {
                                this.handleChangeInput(e)
                            }}
                            type="text" className="form-control" placeholder="" />
                    </div>
                    <div className="col-6 form-group">
                        <div>Ảnh chuyên khoa</div>
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
                                onChange={(e) => { this.handleOnChangeImage(e) }}
                                type="file" className="form-control-file"
                                hidden id="image" name="image" />
                            {
                                this.state.isOpen && <Lightbox
                                    mainSrc={this.state.previewImgURL}
                                    onCloseRequest={() => this.setState({ isOpen: false })} />
                            }

                        </div>


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
                            onClick={(e) => { this.handleSaveSpecialty(e) }}
                            className=
                            {this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning' : 'btn btn-primary'}
                        >SAVE</button>
                    </div>

                    <TableManageSpecialty
                        ArrSpecialty={this.state.ArrSpecialty}
                        handleDeleteSpecialty={(id) => { this.handleDeleteSpecialty(id) }}
                        handleEditSpecialtyParent={(spec) => { this.handleEditSpecialtyParent(spec) }}
                        table='Chuyên Khoa'
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
