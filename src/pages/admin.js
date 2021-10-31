/*admin.js*/
import React, { Component } from 'react';
import '../App.css';
import {Link} from "react-router-dom";
//Functional Component
class AdminPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            idResponse:null,
            nameResponse: null,
            mailResponse: null,
            timeResponse: null,
            users: [],
            nameInput: '',
            mailInput: '',
            passwordInput: '',
            status: '',
        }
        this.getUser = this.getUser.bind(this);
        this.postUser = this.postUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.nameInputChange= this.nameInputChange.bind(this);
        this.mailInputChange= this.mailInputChange.bind(this);
        this.passwordInputChange= this.passwordInputChange.bind(this);
    }

    updateUser(event) {
        const data = '{"name":"' + this.state.nameInput + '","mail":"' + this.state.mailInput + '","password":"' + this.state.passwordInput + '"}';
        console.log(data)
        fetch("http://localhost:3003/api/user/" + event.target.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data,
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        alert('User updated');
        this.getUser();
    }

    postUser() {
        const data = '{"name":"' + this.state.nameInput + '","mail":"' + this.state.mailInput + '","password":"' + this.state.passwordInput + '"}';
        fetch("http://localhost:3003/api/user/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data,
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        alert('User created');
        this.getUser();
    }

    deleteUser(event) {
        fetch('http://localhost:3003/api/user/' + event.target.id, { method: 'DELETE' })
            .then(() => this.setState({ status: 'Delete successful' }));
        alert('User deleted');
        this.getUser();
    }

    getUser() {
        const that = this;
        fetch("http://localhost:3003/api/user")
            .then(response => response.json())
            .then(function(response) {
                that.setState({ users: response });
                console.log(response);
            });
    }

    nameInputChange(event) {
        this.setState({nameInput: event.target.value})
    }

    mailInputChange(event) {
        this.setState({mailInput: event.target.value})
    }

    passwordInputChange(event) {
        this.setState({passwordInput: event.target.value})
    }

    componentDidMount() {
        this.getUser();
    }

    render() {
        return (
            <div>
                <h3 className={"header"}>User List</h3>
                <ul>
                    {this.state.users.map(user => (
                        <li key={user._id}>
                            <div className={"list"}>
                                {(() => {
                                    if (this.state.nameInput != '' || this.state.mailInput != '' || this.state.passwordInput != '') {
                                        return (
                                            <button className={'button'} id={user._id} onClick={this.updateUser}>
                                                Update
                                            </button>
                                        )
                                    }
                                })()}
                                {user.name}, {user.mail}
                                <button className={"button"} id={user._id} onClick={this.deleteUser}>
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className={"input-field"}>
                    <input
                        type="text"
                        value={this.state.nameInput}
                        onChange={this.nameInputChange}
                        placeholder={"Name"}
                    />
                    <input
                        type="text"
                        value={this.state.mailInput}
                        onChange={this.mailInputChange}
                        placeholder={"E-mail"}
                    />
                    <input
                        type="text"
                        value={this.state.passwordInput}
                        onChange={this.passwordInputChange}
                        placeholder={"Password"}
                    />
                    <button onClick={this.postUser}>
                        Add New User
                    </button>
                    <button onClick={this.getUser}>
                        Refresh user list
                    </button>
                    <Link className={'link'} to="/">User page</Link>
                </div>
            </div>
        );
    }
};

export default AdminPage;