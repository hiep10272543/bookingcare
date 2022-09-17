import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { LANGUAGES } from '../../../utils/constant'
import { FormattedMessage } from "react-intl"
import './CountrySelector.scss'
import { FormControl, InputLabel, NativeSelect, FormHelperText } from '@material-ui/core'
class CountrySelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valueInput: ''


        }

    }


    async componentDidMount() {







    }

    componentDidUpdate() {

    }
    handleChange = () => {

    }


    render() {
        let { countries } = this.props

        return (

            <div>
                <FormControl >
                    <InputLabel htmlFor='country-selector' shrink>
                        Quốc Gia
                    </InputLabel>
                    <NativeSelect
                        value={this.props.country}
                        onChange={this.props.handleChange}
                        inputProps={{
                            name: 'country',
                            id: 'country-selector'
                        }}

                    >
                        {countries && countries.map((country, i) => {
                            return <option key={i} value={country.Slug}>
                                {country.Country}
                            </option>

                        })}
                    </NativeSelect>
                    <FormHelperText>
                        Lựa chọn quốc gia
                    </FormHelperText>

                </FormControl>

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

export default connect(mapStateToProps, mapDispatchToProps)(CountrySelector);
