import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { LANGUAGES } from '../../../utils/constant'
import { FormattedMessage } from "react-intl"
import './Tracking.scss'
import HomeFooter from '../../HomePage/HomeFooter';
import Header from '../../HomePage/Header/HomeHeader';
import CountrySelector from './CountrySelector'
import Highlight from './Highlight'
import Summary from './Summary'
import { getCountry, getReportByCountry } from '../../../services'
class Tracking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countries: [],
            country: '',
            countryId: '',
            reportByCountry: [],
        }

    }


    async componentDidMount() {

        let res = await getCountry()
        if (res && res.data.length > 0) {
            let countries = res.data

            this.setState({
                countries: countries,
                country: "vietnam",
                countryId: 'vn',

            })


        }








    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.country !== this.state.country) {
            let res = await getReportByCountry(this.state.country)
            if (res && res.data.length > 0) {
                this.setState({ reportByCountry: res.data }
                )
            }

        }


    }

    handleChange = (e) => {
        let CountrySelector = this.state.countries.filter((item) => {
            return item.Slug === e.target.value
        })
        let countryId = CountrySelector[0].ISO2.toLowerCase()
        console.log(countryId)
        this.setState({
            country: e.target.value,
            countryId: countryId



        }

        )
    }

    render() {
        let { offMap } = this.props


        return (

            <div className="grid">
                <>  {
                    !offMap && <Header />

                }
                    <div className="container tracking-container">
                        <CountrySelector countries={this.state.countries}
                            handleChange={this.handleChange} country={this.state.country}
                        />
                        <Highlight reportByCountry={this.state.reportByCountry} />
                        {
                            !offMap && <Summary reportByCountry={this.state.reportByCountry}
                                selectedCountryId={this.state.countryId}
                            />

                        }



                    </div>
                    {
                        !offMap && <HomeFooter />

                    }
                </>

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

export default connect(mapStateToProps, mapDispatchToProps)(Tracking);
