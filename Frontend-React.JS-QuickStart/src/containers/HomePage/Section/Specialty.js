import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SpecImg from '../../../assets/Specialty/120331-co-xuong-khop.jpg'
import { getAllSpecialty } from '../../../services/index'
import { withRouter } from "react-router";
class Specialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: [],
        }

    }
    next() {
        this.slider.slickNext();
    }
    previous() {
        this.slider.slickPrev();
    }

    async componentDidMount() {
        let res = await getAllSpecialty()
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data
            })
        }

    }
    handleViewSpecialty(item) {
        this.props.history.push(`/detail-specialty/${item.id}`)

    }
    handleViewAllSpecialty() {
        this.props.history.push(`/all-specialty`)

    }
    render() {

        let { dataSpecialty } = this.state
        return (
            <div id="specialty" className="section-specialty">
                <div className="section-content">

                    <div className="section-title">
                        <FormattedMessage id="homepage.specialty" />
                        <span
                            onClick={() => this.handleViewAllSpecialty()}

                        >
                            <FormattedMessage id="homepage.moreInfor" />

                        </span>

                    </div>
                    <Slider ref={c => (this.slider = c)} {...this.props.settings}>

                        {
                            dataSpecialty && dataSpecialty.length > 0 &&
                            dataSpecialty.map((item, i) => {
                                return (
                                    <div
                                        onClick={() => this.handleViewSpecialty(item)}
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
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
