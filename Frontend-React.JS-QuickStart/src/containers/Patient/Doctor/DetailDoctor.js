import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import HomeHeader from "../../HomePage/Header/HomeHeader"
import { getDetailDoctor } from "../../../services/userService"
import './DetailDoctor.scss'
import { LANGUAGES } from '../../../utils/constant'
import HomeFooter from '../../HomePage/HomeFooter';
import DoctorSchedule from './DoctorSchedule';
import DoctorExtraInfor from './DoctorExtraInfor';
class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {},
            position: {},


        }

    }


    async componentDidMount() {

        if (this.props.match.params.id) {
            let id = this.props.match.params.id
            let res = await getDetailDoctor(id)
            if (res && res.errCode === 0) {
                this.setState({
                    detailDoctor: res.data,
                    position: res.data.positionData,
                    id: id
                })
            }

        }





    }

    componentDidUpdate() {

    }



    render() {
        let { image, firstName, lastName, positionData, contentHTML, Markdown } = this.state.detailDoctor



        return (

            <div className="grid">
                <HomeHeader isShowBanner={false} />


                <div className="container">
                    <div className="my-15 intro-doctor col-12 row">
                        <div className="content-left">
                            <img src={image} className="content-left-img"></img>

                        </div>
                        <div className="content-right">
                            <h2 className="header-description-detail"
                            >{this.props.language === LANGUAGES.VI ? `${this.state.position.valueVi}` : `${this.state.position.valueEn}`} {firstName} {lastName}</h2>
                            <p className="content-description-detail">{
                                Markdown && Markdown.description
                            }</p>
                        </div>
                    </div>

                </div>
                <div className="container">

                    <div className="schedule-doctor">
                        <div className="conten-s-left">
                            <DoctorSchedule id={
                                this.props.match.params.id

                            }

                            />
                        </div>
                        <div className="conten-s-right">
                            <DoctorExtraInfor id={this.props.match.params.id} />
                        </div>
                    </div>
                </div>
                <div className="col-12 py-3 detail-infor-docctor">
                    {

                        Markdown && Markdown.contentHTML &&
                        <div className="container" dangerouslySetInnerHTML={{ __html: Markdown.contentHTML }} >
                        </div>
                    }

                </div>

                <div className="col-12"></div>
                <div className="col-12">
                    <HomeFooter className=""></HomeFooter>
                </div>





            </div>




        );
    }
}

const mapStateToProps = state => {
    return {
        DetailDoctorMenuPath: state.app.DetailDoctorMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
