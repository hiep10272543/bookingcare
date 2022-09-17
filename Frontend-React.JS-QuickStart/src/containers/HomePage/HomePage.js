import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './Header/HomeHeader';
import Specialty from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility';
import OutStandingDoctor from './Section/OutStandingDoctor';
import HandBook from './Section/TrackingCovid';
import About from './Section/About';
import HommeFooter from './HomeFooter'


import './HomePage.scss'
class HomePage extends Component {


    render() {
        let settings =
        {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,

            responsive: [
                {
                    breakpoint: 400,
                    settings: {
                        slidesToShow: 1,
                    },
                },

                {
                    breakpoint: 900,
                    settings: {
                        slidesToShow: 2,
                    },
                },
                {
                    breakpoint: 1150,
                    settings: {
                        slidesToShow: 3,
                    },
                },
                {
                    breakpoint: 1300,
                    settings: {
                        slidesToShow: 4,
                    },
                }
            ]
        }
        return (
            <>
                <HomeHeader isShowBanner={true} />
                <Specialty  settings={settings} />
                <MedicalFacility settings={settings} />
                <OutStandingDoctor settings={settings} />
                <HandBook settings={settings} />
                <About />
                <HommeFooter />




            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
