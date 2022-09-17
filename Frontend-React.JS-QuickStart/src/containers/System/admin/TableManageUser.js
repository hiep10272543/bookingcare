import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import { getAllUsers, handleLogin } from "../../../services/userService"
import * as actions from "../../../store/actions"
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';


const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}

class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usersRedux: []
        }

    }




    componentDidMount() {
        this.props.getAllUserStart()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.users !== this.props.users) {
            this.setState({
                usersRedux: this.props.users

            })
        }

    }

    handleDeleteUser = (id) => {
        this.props.deleteUserStart(id)
    }


    handleEditUser = (user) => {
        this.props.handleEditUserParent(user)


    }
    render() {
        const { usersRedux } = this.state
        return (
            <>
                <div className="users-container" >
                    <div className="title text-center">Table User</div>
                    <div className="container">
                        <div className="row">
                            <div className="my-1">
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
                                        usersRedux && usersRedux.map((User, i) => {
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
                                                        "{User.address}

                                                    </td>
                                                    <td>
                                                        <button
                                                            onClick={() => {
                                                                this.handleDeleteUser(User.id)
                                                            }}
                                                            className="m-1 px-2 btn btn-primary" href="" role="button">Delete</button>
                                                        <button
                                                            onClick={() => this.handleEditUser(User)}
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
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        users: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllUserStart: () => dispatch(actions.getAllUserStart()),
        deleteUserStart: (id) => dispatch(actions.deleteUserStart(id)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
