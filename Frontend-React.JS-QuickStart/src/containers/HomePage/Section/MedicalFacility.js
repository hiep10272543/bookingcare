import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllClinic } from "../../../services/index"
import SpecImg from '../../../assets/Specialty/120331-co-xuong-khop.jpg'
import { withRouter } from "react-router";



class MedicalFacility extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataClinics: []
        }

    }
    next() {
        this.slider.slickNext();
    }
    previous() {
        this.slider.slickPrev();
    }


    async componentDidMount() {
        let res = await getAllClinic()
        if (res && res.errCode === 0) {

            this.setState({ dataClinics: res.data ? res.data : [] })
        }

    }
    handleViewClinic(item) {
        this.props.history.push(`/detail-clinic/${item.id}`)


    }
    handleViewAllClinic() {
        this.props.history.push(`/all-clinic`)


    }
    render() {
        let { dataClinics } = this.state
        console.log(dataClinics)
        return (
            <div className="section-medicalFacility">
                <div className="section-content">

                    <div className="section-title">
                        Cơ sở y tế nổi bật
                        <span
                            onClick={() => this.handleViewAllClinic()}
                        >TÌM KIẾM</span>
                    </div>
                    <Slider ref={c => (this.slider = c)} {...this.props.settings}>

                        {
                            dataClinics && dataClinics.length > 0 && dataClinics.map((item, i) => {
                                return (
                                    <div
                                        onClick={() => this.handleViewClinic(item)}

                                        key={i}>

                                        <div className="img-customize">
                                            <img src={item.image} />
                                            <div>{item.name}</div>
                                        </div>
                                    </div>
                                )
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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
