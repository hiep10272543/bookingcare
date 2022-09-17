import { isBuffer } from 'lodash';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Modal, ModalBody, ModalHeader, Button, ModalFooter } from 'reactstrap';
import _ from 'lodash';
class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            firstName: '',
            lastName: '',
            address: '',
        }
    }

    componentDidMount() {


        let User = this.props.User
        if (User && !_.isEmpty(User)) {

            this.setState({ id: User.id, firstName: User.firstName, lastName: User.lastName, address: User.address })

        }

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



    handleEditUpdate = () => {
        let isvalid = this.checkDateValue()
        if (isvalid === true) {
            this.props.UpdateUser(this.state)
        }
        this.props.callback()()


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
                        Edit new user
                    </ModalHeader>
                    <ModalBody>
                        <div className="container">
                            <div className="row">
                                <form action="/crud " method="post">

                                    <div className="form-row">
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
                            onClick={() => { this.handleEditUpdate() }}
                            className="px-3"
                            color="primary"

                        >
                            Save
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
