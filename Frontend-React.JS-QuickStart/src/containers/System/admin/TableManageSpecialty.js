import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import { getAllSpecialty, DeleteSpecialtyById } from "../../../services/userService"
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

class TableManageSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ArrSpecialty: []
        }

    }




    componentDidMount() {
    }


    componentDidUpdate(prevProps, prevState, snapshot) {


    }




    handleEditSpecialty = (spec) => {
        this.props.handleEditSpecialtyParent(spec)


    }
    render() {
        const { ArrSpecialty } = this.props
        return (
            <>
                <div className="users-container" >
                    <div className="title text-center">Danh sách {this.props.table}</div>
                    <div className="container">
                        <div className="row">
                            <div className="my-1">
                            </div>
                            <table className="table">
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>

                                        <th scope="col"
                                            style={{
                                                textAlign: 'end',
                                                paddingRight: '50px'
                                            }}
                                        >Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        ArrSpecialty && ArrSpecialty.length > 0 && ArrSpecialty.map((item, i) => {
                                            return (

                                                <tr key={i}>
                                                    <th>
                                                        {i}
                                                    </th>
                                                    <td>
                                                        {item.name}
                                                    </td>
                                                    <td
                                                        style={{ textAlign: 'end' }}
                                                    >
                                                        <button
                                                            onClick={() => {

                                                                this.props.handleDeleteSpecialty(item.id)
                                                            }}
                                                            className="m-1 px-2 btn btn-primary" href="" role="button">Delete</button>
                                                        <button
                                                            onClick={() => this.handleEditSpecialty(item)}
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

export default connect(mapStateToProps, mapDispatchToProps)(TableManageSpecialty);
