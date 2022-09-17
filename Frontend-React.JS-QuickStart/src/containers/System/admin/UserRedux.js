import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCode } from "../../../services/index";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions'
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';
import { toast } from 'react-toastify';

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            roleArr: [],
            positionArr: [],
            previewImgURL: '',
            photoIndex: 0,
            isOpen: false,

            email: "",
            password: "",
            firstName: "",
            lastName: "",
            phonenumber: "",
            address: "",
            gender: "M",
            position: "P0",
            role: "R1",
            avatar: "",
            action: "",
            id: ""

        }
    }



    async componentDidMount() {
        // try {
        //     let data = await getAllCode('gender')
        //     this.setState({
        //         arrGender: data.message
        //     })


        // }
        // catch (e) {
        //     console.error(e)
        // }



        this.props.fetchGenderStart()
        this.props.getPositionStart()
        this.props.getRoleStart()





    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genders !== this.props.genders) {
            this.setState({
                genderArr: this.props.genders
            })
        }

        if (prevProps.roles !== this.props.roles) {
            this.setState({
                roleArr: this.props.roles
            })
        }

        if (prevProps.positions !== this.props.positions) {
            this.setState({
                positionArr: this.props.positions
            })
        }
        if (prevProps.users !== this.props.users) {
            this.setState({
                email: "",
                password: "",
                firstName: "",
                lastName: "",
                phonenumber: "",
                address: "",
                gender: "M",
                position: "P0",
                role: "R1",
                avatar: "",
                action: "",
                id: "",
                previewImgURL: '',


            })
        }



    }

    handleOnChangeImage = async (e) => {
        let file = e.target.files[0]
        if (file) {

            let Base64 = await CommonUtils.getBase64(file)

            const objectUrl = URL.createObjectURL(file)
            await this.setState({
                previewImgURL: objectUrl,
                avatar: Base64
            }, () => { console.log(this.state.avatar) })
        }




    }
    handleClickImage = () => {
        if (this.state.previewImgURL) {

            this.setState({ isOpen: true })
        }
    }



    handleSaveUser = (e) => {
        e.preventDefault()
        let isvalid = this.checkValidateInput()
        let { action } = this.state
        if (isvalid) {
            if (action === CRUD_ACTIONS.EDIT) {
                this.props.editUserStart({
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    address: this.state.address,
                    id: this.state.id,
                    avatar: this.state.avatar,




                })


            }

            else {

                this.props.saveUserStart({
                    email: this.state.email,
                    password: this.state.password,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    address: this.state.address,
                    gender: this.state.gender,
                    roleId: this.state.role,
                    phonenumber: this.state.phonenumber,
                    positionId: this.state.position,
                    avatar: this.state.avatar,

                })
            }
        }
        else return


    }

    handleOnChangeInPut = (e, type) => {
        this.setState({
            [type]: e.target.value
        })

    }

    checkValidateInput = () => {
        let isvalid = true
        let arrCheck = [
            "email",
            "password",
            "firstName",
            "lastName",
            "phonenumber",
            "address"
        ]
        for (let i = 0; i < arrCheck.length; i++) {
            let data = this.state[arrCheck[i]]
            if (!data) {
                isvalid = true
                toast.error(`Mising ${arrCheck[i]}`)

                break;
            }

        }
        return isvalid
    }


    handleEditUserParent = (user) => {
        let imageBase64 = ''
        if (user.image) {

            imageBase64 = new Buffer(user.image, 'base64').toString('binary')

        }
        this.setState({
            email: user.email,
            password: "hardcode",
            firstName: user.firstName,
            lastName: user.lastName,
            phonenumber: user.phonenumber,
            address: user.address,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            id: user.id,
            previewImgURL: imageBase64,
            action: CRUD_ACTIONS.EDIT

        })

    }

    render() {
        let { language, isLoadingGener } = this.props
        let { genderArr, roleArr, positionArr, isOpen
            , email
            , password
            , firstName
            , lastName
            , phonenumber
            , address
            , gender
            , position
            , role
            , avatar
            , action
        } = this.state

        return (
            <div className="user-redux-container">
                <div className="title" >Manage Users</div>
                <div className="user-redux-body">
                    <div className="container">
                        <div className="row">
                            <form>
                                <div className="row">
                                    <div className="col-12">
                                        <FormattedMessage id="manage-user.add" />
                                    </div>
                                    <div className="form-group col-3">
                                        <label htmlFor="email">
                                            <FormattedMessage id="manage-user.email" />
                                        </label>
                                        <input
                                            value={email}
                                            onChange={(e) => { this.handleOnChangeInPut(e, 'email') }}
                                            type="email" className="form-control" id="email" placeholder="hiep.716t26@gmail.com"
                                            disabled={action === CRUD_ACTIONS.EDIT ? "disabled" : ""}
                                        />
                                    </div>
                                    <div className="form-group col-3">
                                        <label htmlFor="password"><FormattedMessage id="manage-user.password" /></label>
                                        <input
                                            disabled={action === CRUD_ACTIONS.EDIT ? "disabled" : ""}

                                            value={password}
                                            onChange={(e) => { this.handleOnChangeInPut(e, 'password') }}
                                            type="password" className="form-control" id="password" name="password" placeholder="1234678" />
                                    </div>
                                    <div className="form-group col-3">
                                        <label htmlFor="firstName">
                                            <FormattedMessage id="manage-user.firstName" />
                                        </label>
                                        <input
                                            value={firstName}
                                            onChange={(e) => { this.handleOnChangeInPut(e, 'firstName') }}
                                            type="text" className="form-control" id="firstName" name="firstName" placeholder="Hiệp" />
                                    </div>
                                    <div className="form-group col-3">
                                        <label htmlFor="lastName">
                                            <FormattedMessage id="manage-user.lastName" />

                                        </label>
                                        <input
                                            value={lastName}
                                            onChange={(e) => { this.handleOnChangeInPut(e, 'lastName') }}
                                            type="Text" className="form-control" id="lastName" name="lastName" placeholder="Nguyễn" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-3">
                                        <label htmlFor="phonenumber">
                                            <FormattedMessage id="manage-user.phonenumber" />

                                        </label>
                                        <input
                                            disabled={action === CRUD_ACTIONS.EDIT ? "disabled" : ""}

                                            value={phonenumber}
                                            onChange={(e) => { this.handleOnChangeInPut(e, 'phonenumber') }}
                                            type="text" className="form-control" id="phonenumber" name="phonenumber" placeholder="036XXXXXXXXXXX" />
                                    </div>
                                    <div className="form-group col-9">
                                        <label htmlFor="address">
                                            <FormattedMessage id="manage-user.addres" />

                                        </label>
                                        <input

                                            value={address}
                                            onChange={(e) => { this.handleOnChangeInPut(e, 'address') }}
                                            type="Text" className="form-control" id="address" name="address" placeholder="214 Nguyễn Xiển" />
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="form-group col-3">
                                        <label htmlFor="gender">
                                            <FormattedMessage id="manage-user.gender" />

                                        </label>
                                        <select
                                            disabled={action === CRUD_ACTIONS.EDIT ? "disabled" : ""}

                                            onChange={(e) => { this.handleOnChangeInPut(e, 'gender') }}
                                            value={this.state.gender}

                                            className="form-control" name="gender" id="gender">
                                            {
                                                genderArr.map((item, i) => (<option key={i} value={item.keyMap}>
                                                    {
                                                        language === LANGUAGES.VI ? item.valueVi : item.valueEn
                                                    }</option>))
                                            }


                                        </select>
                                    </div>
                                    <div className="form-group col-3">
                                        <label htmlFor="position">
                                            <FormattedMessage id="manage-user.positionID" />

                                        </label>
                                        <select
                                            disabled={action === CRUD_ACTIONS.EDIT ? "disabled" : ""}

                                            onChange={(e) => { this.handleOnChangeInPut(e, 'position') }}
                                            value={this.state.position}

                                            className="form-control" name="position" id="position">
                                            {
                                                positionArr.map((item, i) => (<option key={i} value={item.keyMap}>
                                                    {
                                                        language === LANGUAGES.VI ? item.valueVi : item.valueEn
                                                    }</option>))
                                            }
                                        </select>
                                    </div>
                                    <div className="form-group col-3">
                                        <label htmlFor="role">
                                            <FormattedMessage id="manage-user.roleId" />

                                        </label>
                                        <select
                                            disabled={action === CRUD_ACTIONS.EDIT ? "disabled" : ""}

                                            onChange={(e) => { this.handleOnChangeInPut(e, 'role') }}
                                            value={this.state.role}
                                            className="form-control" name="role" id="role">
                                            {
                                                roleArr.map((item, i) => (<option key={i} value={item.keyMap}>
                                                    {
                                                        language === LANGUAGES.VI ? item.valueVi : item.valueEn
                                                    }</option>))
                                            }

                                        </select>
                                    </div>
                                    <div className="form-group col-3">
                                        <label htmlFor="image">
                                            <FormattedMessage id="manage-user.image" />
                                        </label>
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
                                            <input onChange={(e) => {
                                                this.handleOnChangeImage(e)
                                            }} hidden type="file" id="image" name="image" />

                                            {
                                                isOpen && <Lightbox
                                                    mainSrc={this.state.previewImgURL}
                                                    onCloseRequest={() => this.setState({ isOpen: false })} />
                                            }

                                        </div>

                                    </div>

                                </div>
                                <button
                                    onClick={(e) => { this.handleSaveUser(e) }}
                                    className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning my-3" : "btn btn-primary my-3"}>
                                    {
                                        this.state.action === CRUD_ACTIONS.EDIT ?
                                            <FormattedMessage id="manage-user.edit" /> :
                                            <FormattedMessage id="manage-user.save" />
                                    }

                                </button>

                            </form>


                            <div className="col-12">
                                <TableManageUser
                                    action={this.props.action}
                                    handleEditUserParent={this.handleEditUserParent}
                                />

                            </div>
                        </div>
                    </div>
                </div>


            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
        roles: state.admin.roles,
        positions: state.admin.positions,
        users: state.admin.users,
        isLoadingGener: state.admin.isLoadingGener


    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        saveUserStart: (data) => dispatch(actions.saveUserStart(data)),
        editUserStart: (data) => dispatch(actions.editUserStart(data)),



    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
