import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SpecImg from '../../../assets/Specialty/120331-co-xuong-khop.jpg';
import Tracking from '../../Patient/Tracking/Tracking'
import { withRouter } from "react-router";


class HandBook extends Component {

    constructor(props) {
        super(props);

    }
    next() {
        this.slider.slickNext();
    }
    previous() {
        this.slider.slickPrev();
    }

    handleClick = () => {
        this.props.history.push(`/detail-tracking-covid`)

    }

    render() {


        return (
            <div className="section-HandBook">
                <div className="section-content">

                    <div className="section-title">
                        Theo dõi diễn biến covid
                        <span
                            onClick={() => this.handleClick()}
                        >
                            <FormattedMessage id="homepage.moreInfor" />

                        </span>

                    </div>
                    <Tracking offMap={true} />
                    {/* <Slider ref={c => (this.slider = c)} {...this.props.settings}>
                        <div key={1}>
                            <div className="img-customize">
                                <img src={SpecImg} />
                                <div>Cơ Xương khớp</div>
                            </div>
                        </div>
                        <div key={2}>
                            <div className="img-customize">
                                <img src={SpecImg} />
                                <div>Cơ Xương khớp</div>

                            </div>
                        </div>
                        <div key={3}>
                            <div className="img-customize">
                                <img src={SpecImg} />
                                <div>Cơ Xương khớp</div>
                            </div>
                        </div>
                        <div key={4}>
                            <div className="img-customize">
                                <img src={SpecImg} />
                                <div>Cơ Xương khớp</div>
                            </div>
                        </div>
                        <div key={5}>
                            <div className="img-customize">
                                <img src={SpecImg} />
                                <div>Cơ Xương khớp</div>
                            </div>
                        </div>

                    </Slider>
                    <div className="button-arrow-slider">
                        <button className="button" onClick={() => { this.next() }}>
                            <i className="fas fa-arrow-left"></i>
                        </button>
                        <button className="button" onClick={() => { this.previous() }}>
                            <i className="fas fa-arrow-right"></i>
                        </button>
                    </div> */}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HandBook));
