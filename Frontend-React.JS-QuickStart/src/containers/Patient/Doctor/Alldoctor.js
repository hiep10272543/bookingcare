import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import {
    getAllDoctor

} from '../../../services/index'
import { withRouter } from "react-router";
import HomeHeader from '../../HomePage/Header/HomeHeader'
import HomeFooter from '../../HomePage/HomeFooter';
class AllDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataDoctor: [],
        }

    }

    async componentDidMount() {
        let res = await getAllDoctor()
        if (res && res.errCode === 0) {
            console.log(res)
            this.setState({
                dataDoctor: res.data
            })
        }

    }
    handleViewDetailDoctor(item) {
        this.props.history.push(`/detail-doctor/${item.id}`)

    }


    render() {

        let { dataDoctor
        } = this.state
        console.log(dataDoctor
        )
        return (
            <div className="specialty-grid grid">
                <HomeHeader />
                <div className="all-specialty-tilte">
                    Danh sách bác sĩ
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
                        dataDoctor && dataDoctor.length > 0 && dataDoctor.map((item, i) => {
                            return (<div
                                key={i}
                                onClick={() => this.handleViewDetailDoctor(item)}
                                className="item-specialty">
                                <img className="item-specialty-img" src={
                                    new Buffer(item.image, 'base64').toString('binary')

                                } />
                                <div>
                                    <div>{`${item.positionData.valueVi} ${item.lastName} ${item.firstName}`}</div>
                                    <div className="item-specialty-doctor">{item.Doctor_infor.clinicTypeData.name}</div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllDoctor));
