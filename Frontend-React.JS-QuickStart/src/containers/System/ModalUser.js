import { isBuffer } from 'lodash';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Modal, ModalBody, ModalHeader, Button, ModalFooter } from 'reactstrap';

class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }
    }

    componentDidMount() {

    }

    toggle = () => { return this.props.callback() }

    handleOnChangeInPut = (e, type) => {
        this.setState({
            [type]: e.target.value
        })

    }

    checkDateValue = () => {
        let arr = Object.keys(this.state)
        let valid = true
        for (let i = 0; i < arr.length; i++) {
            if (this.state[arr[i]] === '') {
                valid = false
                alert(`Missing your ${arr[i]}`)
                break;
            }

        }
        return valid
    }

    handleAddNewUser = () => {
        let isvalid = this.checkDateValue()
        if (isvalid === true) {
            this.props.CreateNewUser(this.state)
            let copy = this.state
            let arr = Object.keys(this.state)

            for (let i = 0; i < arr.length; i++) {
                copy[arr[i]] = ''
            }
            this.setState(copy)
        }


    }

    render() {



        return (
            <div className="text-center" >
                <Modal
                    centered
                    size="lg"
                    toggle={this.toggle()}
                    isOpen={this.props.isOpen}
                >
                    <ModalHeader toggle={() => { this.toggle() }} >
                        Add new user
                    </ModalHeader>
                    <ModalBody>
                        <div className="container">
                            <div className="row">
                                <form action="/crud " method="post" >
                                    <div className="row">
                                        <div className="form-group col-6">
                                            <label for="email">Email</label>
                                            <input
                                                value={this.state.email}
                                                onChange={(e) => { this.handleOnChangeInPut(e, 'email') }}
                                                type="email" className="form-control" id="email" placeholder="Email" />
                                        </div>
                                        <div className="form-group col-6">
                                            <label for="password">Password</label>
                                            <input
                                                value={this.state.password}
                                                onChange={(e) => { this.handleOnChangeInPut(e, 'password') }}
                                                type="password" className="form-control" id="password" name="password" placeholder="Password" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-12">
                                            <label for="firstName">First Name</label>
                                            <input
                                                value={this.state.firstName}
                                                onChange={(e) => { this.handleOnChangeInPut(e, 'firstName') }}
                                                type="text" className="form-control" id="firstName" name="firstName" placeholder="firstName" />
                                        </div>
                                        <div className="form-group col-12">
                                            <label for="lastName">Last Name</label>
                                            <input
                                                value={this.state.lastName}
                                                onChange={(e) => { this.handleOnChangeInPut(e, 'lastName') }}
                                                type="Text" className="form-control" id="lastName" name="lastName" placeholder="lastName" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label for="address">Address</label>
                                        <input
                                            value={this.state.address}
                                            onChange={(e) => { this.handleOnChangeInPut(e, 'address') }}
                                            type="text" className="form-control" id="address" name="address" placeholder="1234 Main St" />
                                    </div>

                                </form>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            className="px-3"
                            color="primary"
                            onClick={() => { this.handleAddNewUser() }}
                        >
                            add
                        </Button>
                        {' '}
                        <Button
                            className="px-1"

                            onClick={this.props.callback()}

                        >
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
