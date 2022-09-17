import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeFooter.scss';

class HomeFooter extends Component {


    render() {

        return (
            <div className="homeFooter">




                <div>&copy;2022 Nguyễn Văn Hiệp.</div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
