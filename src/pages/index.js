import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,
    Redirect
} from "react-router-dom";

class MainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mailInput: '',
            passwordInput: '',
            titleInput: '',
            textInput: '',
            token: '',
            loginId: '',
            loggedIn: false,
            posts: [],
        }
        this.mailInputChange= this.mailInputChange.bind(this);
        this.passwordInputChange= this.passwordInputChange.bind(this);
        this.titleInputChange= this.titleInputChange.bind(this);
        this.textInputChange= this.textInputChange.bind(this);
        this.login= this.login.bind(this);
        this.logout= this.logout.bind(this);
        this.newPost= this.newPost.bind(this);
        this.updatePost= this.updatePost.bind(this);
        this.deletePost= this.deletePost.bind(this);
        this.getPosts= this.getPosts.bind(this);
    }

    mailInputChange(event) {
        this.setState({mailInput: event.target.value})
    }

    passwordInputChange(event) {
        this.setState({passwordInput: event.target.value})
    }

    titleInputChange(event) {
        this.setState({titleInput: event.target.value})
    }

    textInputChange(event) {
        this.setState({textInput: event.target.value})
    }

    login() {
        const data = '{"mail":"' + this.state.mailInput + '","password":"' + this.state.passwordInput + '"}';
        console.log(data)
        fetch("http://localhost:3003/api/user/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data,
        })
            .then(response => response.json())
            .then(response => this.setState({token: response.token, loginId: response.user._id}))
            .then(response => {
                console.log('New Token: ', this.state.token)
                this.setState({loggedIn: true})
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    logout() {
        this.setState({loggedIn: false, token: '', loginId: '', mailInput: '', passwordInput: ''})
    }

    getPosts() {
        const that = this;
        fetch("http://localhost:3003/api/posts")
            .then(response => response.json())
            .then(function(response) {
                that.setState({ posts: response.posts });
                console.log(response.posts);
            });
    }

    newPost() {
        const data = '{"title":"' + this.state.titleInput + '","text":"' + this.state.textInput + '"}';
        console.log(data)
        fetch("http://localhost:3003/api/posts", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.state.token,
            },
            body: data,
        })
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        alert('Post made');
        this.getPosts();
    }

    updatePost(event) {
        const data = '{"title":"' + this.state.titleInput + '","text":"' + this.state.textInput + '"}';
        console.log(data)
        fetch("http://localhost:3003/api/posts/" + event.target.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.state.token,
            },
            body: data,
        })
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        alert('Post updated');
        this.getPosts();
    }

    deletePost(event) {
        const that = this;
        fetch("http://localhost:3003/api/posts/" + event.target.id, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + this.state.token,
            },
        })
            .catch((error) => {
                console.error('Error:', error);
            });
        alert('Post deleted');
        this.getPosts();
    }

    componentDidMount() {
        this.getPosts();
    }

    render() {
        return (
            <div>
                <div>
                {(() => {
                    if (this.state.loggedIn == false) {
                        return (
                            <div className={'input-field'}>
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
                                <button onClick={this.login}>
                                    Login
                                </button>
                                <Link to="/admin">Admin page</Link>
                            </div>
                        )
                    } else {
                        return (
                            <div className={'input-field'}>
                                    <button onClick={this.logout}>
                                        Logout
                                    </button>
                                    <Link to="/admin">Admin page</Link>
                            </div>
                        )
                    }
                })()}
                </div>
                <ul className={'list'}>
                    {this.state.posts.map(post => (
                        <li key={post._id}>
                            <div>
                                {post.title}: {post.text} -{post.user.name}
                                {(() => {
                                    if (this.state.loginId === post.user._id) {
                                        return (
                                            <div>
                                                <button id={post._id} onClick={this.deletePost}>
                                                    Delete
                                                </button>
                                                {(() => {
                                                    if (this.state.titleInput != '' || this.state.textInput != '') {
                                                        return (
                                                            <button id={post._id} onClick={this.updatePost}>
                                                                Update
                                                            </button>
                                                        )
                                                    }
                                                })()}
                                            </div>
                                        )
                                    }
                                })()}
                            </div>
                        </li>
                    ))}
                </ul>
                <div className={'input-field'}>
                    <input
                        type="text"
                        value={this.state.titleInput}
                        onChange={this.titleInputChange}
                        placeholder={"Title"}
                    />
                    <input
                        type="text"
                        value={this.state.textInput}
                        onChange={this.textInputChange}
                        placeholder={"Text"}
                    />
                    <button onClick={this.newPost}>
                        Post
                    </button>
                    <button onClick={this.getPosts}>
                        Update post list
                    </button>
                </div>
            </div>
        );
    }
};

export default MainPage;