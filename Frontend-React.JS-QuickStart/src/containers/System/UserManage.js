import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import { getAllUsers, CreateUser, DeleteUser, UpdateUserData } from "../../services/userService"
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModal: false,
            isOpenModalEdit: false,
            User: {},

        }

    }




    async componentDidMount() {
        this.handleGetAllUsers()
    }


    handleGetAllUsers = async () => {
        let response = await getAllUsers('all')
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.user
            })

        }
    }

    handleAddNewUser = () => {
        let toggle = this.state.isOpenModal
        this.setState({ isOpenModal: !toggle })


    }



    handleEditNewUser = (User) => {
        let toggle = this.state.isOpenModalEdit
        this.setState({ isOpenModalEdit: !toggle })
        this.setState({ User: User })




    }
    toggle = () => {
        let toggle = this.state.isOpenModalEdit
        this.setState({ isOpenModalEdit: !toggle })

    }

    CreateNewUser = async (data) => {
        let response = await CreateUser(data)
        if (response && response.errCode !== 0) {
            alert(response.message)
        }
        else {
            this.handleGetAllUsers()
            this.handleAddNewUser()
        }
    }

    handleDeleteUser = async (user) => {
        try {
            let response = await DeleteUser(user.id)
            if (response && response.errCode === 0) {
                this.handleGetAllUsers()

            }
            else {
                alert(response.message)
            }
        }
        catch (err) {
            console.error(err)
        }

    }

    UpdateUser = async (data) => {
        try {
            let response = await UpdateUserData(data)
            if (response && response.errCode === 0) {
                this.handleGetAllUsers()

            }
            else {
                alert(response.message)
            }
        }
        catch (err) {
            console.error(err)
        }
    }

    render() {
        let arrUsers = this.state.arrUsers
        return (

            <div className="users-container" >
                <ModalUser
                    CreateNewUser={this.CreateNewUser}
                    isOpen={this.state.isOpenModal}
                    callback={() => this.handleAddNewUser}

                />


                {
                    this.state.isOpenModalEdit && <ModalEditUser
                        callback={() => this.toggle}
                        isOpen={this.state.isOpenModalEdit}
                        User={this.state.User}
                        UpdateUser={this.UpdateUser}
                    />
                }


                <div className="title text-center">Manage users with react</div>
                <div className="container">
                    <div className="row">
                        <div className="my-1">
                            <button
                                onClick={() => { this.handleAddNewUser() }}
                                className="btn btn-primary px-3">
                                add new user
                            </button>
                        </div>
                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {

                                    arrUsers && arrUsers.map((User, i) => {
                                        return (

                                            <tr key={i}>
                                                <th>
                                                    {i}

                                                </th>
                                                <td>
                                                    {User.email}
                                                </td>
                                                <td>
                                                    {User.firstName}
                                                </td>
                                                <td>
                                                    {User.address}

                                                </td>
                                                <td>
                                                    <button
                                                        onClick={() => { this.handleDeleteUser(User) }}

                                                        className="m-1 px-2 btn btn-primary" href="" role="button">Delete</button>
                                                    <button
                                                        onClick={() => { this.handleEditNewUser(User) }}

                                                        className="m-1 px-3 btn btn-primary" href="" role="button">Edit</button>
                                                </td>
                                            </tr>


                                        )

                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div >
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
