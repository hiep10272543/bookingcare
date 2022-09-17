import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { LANGUAGES } from '../../../utils/constant'
import { FormattedMessage } from "react-intl"
// import './DefaultClass.scss'
class DefaultClass extends Component {
    constructor(props) {
        super(props);
        this.state = {



        }

    }


    async componentDidMount() {







    }

    componentDidUpdate() {

    }



    render() {



        return (

            <div className="grid">


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

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);
