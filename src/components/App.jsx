import React, {Component} from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginPage from './LoginPage/LoginPage'
import DashBoard from './Dashboard/DashBoard'

class App extends Component {
    render(){
        return(
            <Router>
                <div>
                    <Route exact path="/" component={LoginPage} />
                    <Route path="/dashBoard/" component={DashBoard} />
                </div>
            </Router>
        )
    }
}

export default App