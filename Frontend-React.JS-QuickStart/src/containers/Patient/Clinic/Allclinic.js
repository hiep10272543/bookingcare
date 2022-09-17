import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import {
    getAllClinic

} from '../../../services/index'
import { withRouter } from "react-router";
import HomeHeader from '../../HomePage/Header/HomeHeader'
import HomeFooter from '../../HomePage/HomeFooter';
class Allclinic
    extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataClinic: [],
        }

    }

    async componentDidMount() {
        let res = await getAllClinic()
        if (res && res.errCode === 0) {
            console.log(res)
            this.setState({
                dataClinic: res.data
            })
        }

    }
    handleViewDetailClinic(item) {
        this.props.history.push(`/detail-clinic/${item.id}`)

    }


    render() {

        let { dataClinic
        } = this.state

        return (
            <div className="specialty-grid grid">
                <HomeHeader />
                <div className="all-specialty-tilte">
                    Danh sách phòng khám
                </div>
                <div>
                    {/* <div className="search-sp-doctor">
                        <Select
                            value={selectedProvince}
                            onChange={this.handleChange}
                            options={this.state.listProvinces}
                        />


                    </div> */}
                    {
                        dataClinic && dataClinic.length > 0 && dataClinic.map((item, i) => {
                            return (<div
                                key={i}
                                onClick={() => this.handleViewDetailClinic(item)}
                                className="item-specialty">
                                <img className="item-specialty-img" src={
                                    item.image

                                } />
                                <div>
                                    {item.name}
                                </div>
                            </div>)
                        })

                    }


                </div>
                <div style={{
                    background: 'white', marginTop: '15px'
                }}>

                    <HomeFooter />
                </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Allclinic
));
