import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { LANGUAGES } from '../../../utils/constant'
import { FormattedMessage } from "react-intl"
import { Grid, Card, CardContent, Typography, makeStyles } from '@material-ui/core'

class CardHighlight extends Component {
    constructor(props) {
        super(props);
        this.state = {



        }

    }


    async componentDidMount() {







    }

    componentDidUpdate() {

    }

    makeStyles(type) {
        if (type === 'Confirmed') return { borderLeft: '5px solid yellow' };
        if (type === 'recovered') return { borderLeft: '5px solid green' };
        else return { borderLeft: '5px solid red' }
    }






    render() {

        let { title, count, type } = this.props
        let styles = this.makeStyles(type)


        return (

            <Card>
                <CardContent style={styles}>
                    <Typography component='p' variant='body2'>
                        {title}
                    </Typography>
                    <Typography component='span' variant='body2'>
                        {count}
                    </Typography>
                </CardContent>
            </Card>



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

export default connect(mapStateToProps, mapDispatchToProps)(CardHighlight);
