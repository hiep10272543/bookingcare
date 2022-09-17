import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import { getAllSpecialty } from '../../../services/index'
import { withRouter } from "react-router";
import HomeHeader from '../../HomePage/Header/HomeHeader'
import HomeFooter from '../../HomePage/HomeFooter';
class AllSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: [],
        }

    }

    async componentDidMount() {
        let res = await getAllSpecialty()
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data
            })
        }

    }
    handleViewSpecialty(item) {
        this.props.history.push(`/detail-specialty/${item.id}`)

    }
    render() {

        let { dataSpecialty } = this.state
        console.log(dataSpecialty)
        return (
            <div className="specialty-grid grid">
                <HomeHeader />
                <div className="all-specialty-tilte">
                    Danh sách chuyên khoa
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
                        dataSpecialty && dataSpecialty.length > 0 && dataSpecialty.map((item, i) => {
                            return (<div

                                key={i}
                                onClick={() => this.handleViewSpecialty(item)}
                                className="item-specialty">
                                <img className="item-specialty-img" src={item.image} />
                                <div>{item.name}</div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllSpecialty));
