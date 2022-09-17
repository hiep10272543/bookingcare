import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { LANGUAGES } from '../../../utils/constant'
import { FormattedMessage } from "react-intl"
import { Grid, Card, CardContent, Typography, Button, ButtonGroup } from '@material-ui/core'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import highchartsMap from "highcharts/modules/map";
import moment from 'moment'
import './Summary.scss'
import HighMap from './HighMap';


class Summary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: [],
            reportType: 'all',
            mapData: {}


        }

    }


    async componentDidMount() {

        let options = this.generateOptions(this.props.reportByCountry)
        this.setState({
            options: options,
            reportType: 'all'
        })






    }

    generateOptions = (data) => {

        const categories = data.map((item) => {
            return moment(item.Date).format('DD/MM/YYYY')
        });

        return {
            chart: {
                height: 500,
            },
            title: {
                text: 'Tổng ca nhiễm',
            },
            xAxis: {
                categories: categories,
                crosshair: true,
            },
            colors: ['#F3585B'],
            yAxis: {
                min: 0,
                title: {
                    text: null,
                },
                labels: {
                    align: 'right',
                },
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat:
                    '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y} ca</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true,
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0,
                },
            },
            series: [
                {
                    name: 'Tổng Ca nhiễm',
                    data: data.map((item) => item.Confirmed),
                },
            ],
        };

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.reportByCountry !== this.props.reportByCountry) {

            let options = this.generateOptions(this.props.reportByCountry)


            let selectedCountryId = this.props.selectedCountryId
            if (selectedCountryId) {
                let mapData = await import(`@highcharts/map-collection/countries/${selectedCountryId}/${selectedCountryId}-all.geo.json`)

                this.setState({
                    options: options,
                    reportType: 'all',
                    mapData: mapData
                })
            }





        }
        if (prevState.reportType !== this.state.reportType) {
            let reportByCountry = this.props.reportByCountry
            let report = []
            if (

                this.state.reportType === 'all'

            ) {
                report = reportByCountry
            }
            if (
                this.state.reportType === '30'
            ) {
                report = reportByCountry.slice(reportByCountry.length - 30)
            }
            if (
                this.state.reportType === '7'

            ) {
                report = reportByCountry.slice(reportByCountry.length - 7)
            }

            let options = this.generateOptions(report)
            this.setState({
                options
            })



        }




    }





    render() {
        let { reportType } = this.state
        return (

            <>
                <Grid container spacing={3}>
                    <Grid item sm={8} xs={12}>
                        <ButtonGroup size='small' style={{
                            display: 'flex',
                            justifyContent: 'flex-end'
                        }}>
                            <Button
                                color={
                                    reportType === 'all' ? 'secondary' : ''
                                }
                                onClick={() => {
                                    this.setState({
                                        reportType: 'all'
                                    })
                                }}>Tất cả</Button>
                            <Button
                                color={
                                    reportType === '30' ? 'secondary' : ''
                                }
                                onClick={() => {
                                    this.setState({
                                        reportType: '30'
                                    })
                                }}>30 ngày</Button>
                            <Button
                                color={
                                    reportType === '7' ? 'secondary' : ''
                                }
                                onClick={() => {
                                    this.setState({
                                        reportType: '7'
                                    })
                                }}>7 ngày</Button>
                        </ButtonGroup>
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={this.state.options}
                        />

                    </Grid>
                    <Grid item sm={4} xs={12}>
                        <HighMap mapData={this.state.mapData} />
                    </Grid>

                </Grid>

            </>




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

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
