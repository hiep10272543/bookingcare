import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { LANGUAGES } from '../../../utils/constant'
import { FormattedMessage } from "react-intl"
import { Grid, Card, CardContent, Typography } from '@material-ui/core'
import CardHighlight from './Card'
import './Highlight.scss'
class Highlight extends Component {
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
        let { reportByCountry } = this.props
        let data = reportByCountry[reportByCountry.length - 1]



        return (

            <Grid container spacing={3}>
                <Grid item sm={4} xs={12}>
                    <Card>
                        <CardHighlight
                            type='Confirmed'
                            count={data && data.Confirmed}
                            title={' Số ca nhiễm'}

                        />
                    </Card>
                </Grid>
                <Grid item sm={4} xs={12}>
                    <CardHighlight
                        type='recovered'
                        count={data && data.Recovered}
                        title={'Số khỏi bệnh'}

                    />

                </Grid>
                <Grid item sm={4} xs={12}>
                    <CardHighlight
                        type='deaths'
                        count={data && data.Deaths}
                        title={'Số ca tử vong'}

                    />

                </Grid>

            </Grid>




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

export default connect(mapStateToProps, mapDispatchToProps)(Highlight);
