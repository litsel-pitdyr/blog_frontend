import React, { Component } from 'react';
import './App.css';
import ErrorPage from "./pages/404.js";
import AdminPage from "./pages/admin.js";
import MainPage from "./pages"; ///< index.js will be automatically imported
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom";

class App extends Component {

  render() {
     return (
            <Router>
                <Switch>
                    <Route exact path="/" component={MainPage} />
                    <Route exact path="/admin" component={AdminPage} />
                    <Route exact path="/404" component={ErrorPage} />
                    <Redirect to="/404"/>
                </Switch>
            </Router>
        );
   }
}

/*<ul className="bold">
    {this.state.users.map(user => (
        <li key={user._id}>
            {user.name} {user.mail}
            <button onClick={this.updateUser}>
                Update
            </button>
        </li>
    ))}
</ul>
<button onClick={this.getUser}>
    Name
</button>
<button onClick={this.postUser}>
    Post
</button>
<input
    type="text"
    value={this.state.nameInput}
    onChange={this.nameInputChange}
    placeholder={"Enter name"}
/>
<input
    type="text"
    value={this.state.mailInput}
    onChange={this.mailInputChange}
    placeholder={"Enter e-mail"}
/>
<input
    type="text"
    value={this.state.passwordInput}
    onChange={this.passwordInputChange}
    placeholder={"Create password"}
/>*/

export default App;