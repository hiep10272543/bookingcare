import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SpecImg from '../../../assets/Specialty/120331-co-xuong-khop.jpg';
import * as actions from "../../../store/actions/index"
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { withRouter } from "react-router";



class OutStandingDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctors: [],
        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
                arrDoctors: this.props.topDoctorsRedux
            })
        }
    }

    componentDidMount() {
        this.props.loadTopDoctor()
    }

    next() {
        this.slider.slickNext();
    }
    previous() {
        this.slider.slickPrev();
    }


    handleViewDetailDoctor(item) {
        this.props.history.push(`/detail-doctor/${item.id}`)

    }
    handleViewAllDoctor() {
        this.props.history.push(`/all-doctor`)

    }
    render() {

        let { arrDoctors } = this.state
        return (
            <div className="section-outStandingDoctor">
                <div className="section-content">

                    <div className="section-title">
                        <FormattedMessage id="homepage.outstanding-doctor" />
                        <span
                            onClick={() => this.handleViewAllDoctor()}
                        >
                            <FormattedMessage id="homepage.search" />

                        </span>
                    </div>
                    <Slider ref={c => (this.slider = c)} {...this.props.settings}>

                        {

                            arrDoctors && arrDoctors.length > 0 && arrDoctors.concat(arrDoctors).concat(arrDoctors).map((item, i) => {
                                let imageBase64 = ''
                                if (item.image) {
                                    imageBase64 = new Buffer(item.image, 'base64').toString('binary')

                                }

                                return (<div key={i} onClick={() => this.handleViewDetailDoctor(item)} >
                                    <div className="img-outStandingDoctor">
                                        <img src={imageBase64} />
                                        <div>{`${this.props.language === LANGUAGES.VI ? `${item.positionData.valueVi}` : `${item.positionData.valueEn}`} ${item.firstName} ${item.lastName}`}</div>
                                    </div>
                                </div>)
                            })
                        }



                    </Slider>
                    <div className="button-arrow-slider">
                        <button className="button" onClick={() => { this.next() }}>
                            <i className="fas fa-arrow-left"></i>
                        </button>
                        <button className="button" onClick={() => { this.previous() }}>
                            <i className="fas fa-arrow-right"></i>
                        </button>
                    </div>
                </div >
            </div >



        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        topDoctorsRedux: state.admin.topDoctors,
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctor: () => dispatch(actions.fetchTopDoctor())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor))
