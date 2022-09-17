import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import { getAllUsers, handleLogin } from "../../../services/userService"
import * as actions from "../../../store/actions"
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select'
import { getDetailDoctor } from '../../../services/index'
import { LANGUAGES, CRUD_ACTIONS } from '../../../utils'

const options = [
    // { value: 'chocolate', label: 'Chocolate' },
    // { value: 'strawberry', label: 'Strawberry' },
    // { value: 'vanilla', label: 'Vanilla' }
]



const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!


class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //
            contentMarkdown: '',
            contentHTML: '',
            description: '',
            selectedDoctor: '',
            doctorArr: [],
            hasOlData: false,



            //
            listPrice: [],
            listPayment: [],
            listProvinces: [],
            listClinic: [],
            listSpecialty: [],

            selectedPrice: '',
            selectedPayment: '',
            selectedProvinces: '',
            selectedClinic: '',
            selectedSpecialty: '',

            nameClinic: '',
            addressClinic: '',
            note: '',


        }

    }




    componentDidMount() {
        this.props.fetchDoctorStart()
        this.props.getRequiredDoctorInfo()

    }


    buildDataInputSelect = (InputData) => {
        let results = []
        let language = this.props.language
        if (InputData && InputData.length > 0) {
            results = InputData.map((doctor, i) => ({
                value: doctor.id,
                label: `${doctor.lastName}  ${doctor.firstName}`
            }))
        }
        return results
    }


    buildInputSelect = (InputData, type) => {
        let results = []
        let language = this.props.language
        if (InputData && InputData.length > 0) {
            if (type === 'SPECIALTY') {
                results = InputData.map((item, i) => {
                    return {
                        value: item.id,
                        label: item.name
                    }


                })

            }


            else {
                results = InputData.map((item, i) => {

                    let label = language === LANGUAGES.VI ? item.valueVi : item.valueEn
                    return {
                        value: item.keyMap,
                        label: label
                    }



                })

            }


        }
        return results
    }




    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.doctors !== this.props.doctors) {
            this.setState({
                doctorArr: this.props.doctors
            })
        }
        if ((prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor)
            // || (prevProps.language !== this.props.language)
        ) {
            let { resPrice, resPayment, resProvince, resSpecialty, resClinic } = this.props.allRequiredDoctorInfor
            this.setState({
                listPrice: this.buildInputSelect(resPrice, ''),
                listPayment: this.buildInputSelect(resPayment, ''),
                listProvinces: this.buildInputSelect(resProvince, ''),
                listSpecialty: this.buildInputSelect(resSpecialty, 'SPECIALTY'),
                listClinic: this.buildInputSelect(resClinic, 'SPECIALTY')

            }, () => { console.log(this.state) })


        }
        if (prevProps.language !== this.props.language) {
            let { resPrice, resPayment, resProvince } = this.props.allRequiredDoctorInfor
            let {
                selectedPrice,
                selectedPayment,
                selectedProvinces,
            } = this.state
            let price = this.buildInputSelect(resPrice)
            let payment = this.buildInputSelect(resPayment)
            let province = this.buildInputSelect(resProvince)


            this.setState({
                listPrice: price,
                listPayment: payment,
                listProvinces: province,
                selectedPrice: price.find((item) => {
                    return selectedPrice && item.value === selectedPrice.value
                }),
                selectedPayment: payment.find((item) => {
                    return selectedPayment && item.value === selectedPayment.value
                }),
                selectedProvinces: province.find((item) => {
                    return selectedProvinces && item.value === selectedProvinces.value
                })
            })


        }




    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,

        })
    }

    handleSaveContentMarkdown() {
        console.log(this.state.selectedSpecialty)
        this.props.saveDetailDoctorStart(
            {
                contentHTML: this.state.contentHTML,
                contentMarkdown: this.state.contentMarkdown,
                description: this.state.description,
                id: this.state.selectedDoctor.value,
                selectedPrice: this.state.selectedPrice.value,
                selectedPayment: this.state.selectedPayment.value,
                selectedProvinces: this.state.selectedProvinces.value,
                specialtyId: this.state.selectedSpecialty.value,
                clinicId: this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value : '',
                nameClinic: this.state.nameClinic,
                addressClinic: this.state.addressClinic,
                note: this.state.note,
                action: this.state.hasOlData ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE


            }


        )
        this.setState({
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',
            selectedPrice: '',
            selectedPayment: '',
            selectedProvinces: '',
            nameClinic: '',
            addressClinic: '',
            note: '',
            selectedSpecialty: '',
            selectedClinic: '',
            hasOlData: false

        })

    }


    handleChange = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
        let { language } = this.props
        this.setState({
            description: "",
            contentMarkdown: "",
            contentHTML: "",
            selectedPrice: '',
            selectedPayment: '',
            selectedProvinces: '',
            nameClinic: '',
            addressClinic: '',
            note: '',
            selectedSpecialty: '',
            selectedClinic: '',
            hasOlData: false

        })

        let res = await getDetailDoctor(selectedDoctor.value)
        console.log(res)
        if (res && res.errCode === 0 && res.data && res.data.Markdown && res.data.Markdown.contentMarkdown) {
            let markdown = res.data.Markdown

            let selectedPrice = {}
            let selectedPayment = {}
            let selectedProvinces = {}
            let selectedSpecialty = {}
            let selectedClinic = {}

            let nameClinic = ''
            let addressClinic = ''
            let note = ''

            if (res.data.Doctor_infor && res.data.Doctor_infor.priceTypeData.valueVi) {
                let labelPrice = language === LANGUAGES.VI ? res.data.Doctor_infor.priceTypeData.valueVi : res.data.Doctor_infor.priceTypeData.valueEn
                let labelPayment = language === LANGUAGES.VI ? res.data.Doctor_infor.paymentTypeData.valueVi : res.data.Doctor_infor.paymentTypeData.valueEn
                let labelProvince = language === LANGUAGES.VI ? res.data.Doctor_infor.provinceTypeData.valueVi : res.data.Doctor_infor.provinceTypeData.valueEn



                selectedPrice = {
                    value: res.data.Doctor_infor.priceId,
                    label: labelPrice
                }
                selectedSpecialty = {
                    value: res.data.Doctor_infor.specialtyId,
                    label: res.data.Doctor_infor.specialtyTypeData.name
                }

                selectedClinic = {
                    value: res.data.Doctor_infor.clinicId,
                    label: res.data.Doctor_infor.clinicTypeData.name
                }

                selectedPayment = {
                    value: res.data.Doctor_infor.paymentId,
                    label: labelPayment
                }
                selectedProvinces = {
                    value: res.data.Doctor_infor.provinceId,
                    label: labelProvince
                }

                nameClinic = res.data.Doctor_infor.nameClinic
                addressClinic = res.data.Doctor_infor.addressClinic
                note = res.data.Doctor_infor.note
            }


            this.setState({
                contentMarkdown: markdown.contentMarkdown,
                contentHTML: markdown.contentHTML,
                description: markdown.description,
                hasOlData: true,
                nameClinic,
                addressClinic,
                note,
                selectedPrice,
                selectedPayment,
                selectedProvinces,
                selectedSpecialty,
                selectedClinic
            })

        }





    };

    handleChangeSlectedDoctorInfor = async (selectedOptions, name) => {
        let stateName = name.name
        this.setState({
            [stateName]: selectedOptions
        })


    }


    handleChangeText = (e, id) => {
        this.setState({
            [id]: e.target.value,
        }, () => {
            console.log(this.state[id])
        })
    }




    render() {
        const { usersRedux, selectedDoctor, doctorArr, hasOlData, selectedPrice, hasSubMenu, selectedPayment, selectedProvinces, selectedSpecialty, selectedClinic, } = this.state
        return (

            <div className="users-container" >
                <div className="title text-center">
                    <FormattedMessage id="admin.manage-doctor.title" />
                </div>
                <div className="container">
                    <div className="row">

                        <div className="more-info row my-3">
                            <div className=" col-4 content-left">
                                <label>
                                    <FormattedMessage id="admin.manage-doctor.select-doctor" />

                                </label>
                                <Select
                                    value={selectedDoctor}
                                    onChange={this.handleChange}
                                    options={this.buildDataInputSelect(this.state.doctorArr)}
                                />
                                {/* <input className="form-control" placeholder="" /> */}
                            </div>
                            <div className="col-8 content-right form-group">
                                <label>
                                    <FormattedMessage id="admin.manage-doctor.intro" />

                                </label>
                                <textarea
                                    value={this.state.description}
                                    onChange={(e) => {
                                        this.handleChangeText(e, 'description');
                                    }}
                                    className="form-control">
                                </textarea>
                            </div>


                        </div>


                        <div className="mb-3 more-infor-extra row">
                            <div className="form-group col-4">
                                <label>
                                    <FormattedMessage id="admin.manage-doctor.price" />

                                </label>
                                <Select
                                    value={selectedPrice}
                                    onChange={this.handleChangeSlectedDoctorInfor}
                                    name='selectedPrice'
                                    options={this.state.listPrice}
                                />

                            </div>
                            <div className="form-group col-4">
                                <label>
                                    <FormattedMessage id="admin.manage-doctor.payment" />

                                </label>
                                <Select
                                    value={selectedPayment}
                                    onChange={this.handleChangeSlectedDoctorInfor}
                                    name='selectedPayment'
                                    options={this.state.listPayment}
                                />

                            </div>
                            <div className="form-group col-4">
                                <label>
                                    <FormattedMessage id="admin.manage-doctor.province" />

                                </label>
                                <Select
                                    value={selectedProvinces}
                                    onChange={this.handleChangeSlectedDoctorInfor}
                                    name='selectedProvinces'
                                    options={this.state.listProvinces}
                                />

                            </div>

                            <div className="form-group col-4">
                                <label>
                                    <FormattedMessage id="admin.manage-doctor.address" />
                                </label>
                                <input
                                    value={this.state.addressClinic}
                                    onChange={(e) => {
                                        this.handleChangeText(e, 'addressClinic');
                                    }}

                                    className="form-control" />

                            </div>
                            <div className="form-group col-4">
                                <label>
                                    <FormattedMessage id="admin.manage-doctor.notes" />

                                </label>
                                <input
                                    value={this.state.note}
                                    onChange={(e) => {
                                        this.handleChangeText(e, 'note');
                                    }}
                                    className="form-control" />

                            </div>
                            <div className="form-group col-4">
                                <label>
                                    <FormattedMessage id="admin.manage-doctor.specialty" />


                                </label>
                                <Select
                                    value={selectedSpecialty}
                                    onChange={this.handleChangeSlectedDoctorInfor}
                                    name='selectedSpecialty'
                                    options={this.state.listSpecialty}
                                />

                            </div>
                            <div className="form-group col-12">
                                <label>
                                <FormattedMessage id="admin.manage-doctor.clinic" />
                                    

                                </label>
                                <Select
                                    value={selectedClinic}
                                    onChange={this.handleChangeSlectedDoctorInfor}
                                    name='selectedClinic'
                                    options={this.state.listClinic}
                                />

                            </div>
                        </div>

                        <MdEditor style={{ height: '300px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.contentMarkdown}

                        />


                        <div>
                            <button onClick={() => this.handleSaveContentMarkdown()}
                                className={hasOlData === true ? " my-3 btn btn-warning" : " my-3 btn btn-primary"}>

                                <FormattedMessage id="admin.manage-doctor.save" />



                            </button>

                        </div>
                    </div>
                </div>
            </div >

        );
    }

}

const mapStateToProps = state => {
    return {
        doctors: state.admin.doctors,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchDoctorStart: () => dispatch(actions.fetchDoctorStart()),
        saveDetailDoctorStart: (data) => dispatch(actions.saveDetailDoctorStart(data)),
        getRequiredDoctorInfo: () => dispatch(actions.getRequiredDoctorInfo()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
