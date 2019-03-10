import React, {Component} from 'react'
import FacebookLogin from 'react-facebook-login'
import { GoogleLogin } from 'react-google-login';
import {Redirect} from 'react-router-dom'

import './Header.css'

class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            login: false,
            userid:'',
            photo : '',
            name: ''
        }
        this.isLogin = this.isLogin.bind(this);
    }

    componentDidMount(){
        this.setState({
            login: false
        })
    }

    isLogin(type,response){
        if(type==='facebook' && response.email){
            this.setState({
                login: true,
                userid: response.email,
                photo: response.picture.data.url,
                name: response.name,
            }, () => {
                localStorage.setItem('login',JSON.stringify(this.state.login))
            })
        }

        if(type==='google' && response.w3.U3){
            this.setState({
                login: true,
                userid:response.w3.U3,
                name: response.w3.ig,
                photo: response.w3.Paa,
            }, () =>{
                localStorage.setItem('login',JSON.stringify(this.state.login))
            })
        }
    }

    render(){
        const responseFacebook = (response) => {
            this.isLogin('facebook', response)
        }

        const responseGoogle = (response) => {
            this.isLogin('google', response)
        }

        return(
            <div>
                {this.state.login ? <Redirect
                    to={{
                        pathname: "/dashboard/",
                        state: { photo: this.state.photo, name: this.state.name, userid: this.state.userid}
                    }}
                /> :
                <div className='header'>
                    <p>Welcome to goplaybook</p>
                    <div className='login-btn'>
                        <h3>Login with</h3>
                        <FacebookLogin
                            appId="530962174082722"
                            autoLoad={false}
                            fields="name,email,picture"
                            //onClick={this.componentClicked}
                            callback={responseFacebook}
                            icon="fa-facebook"
                            textButton=""
                            size="small"
                            cssClass="fb-btn"
                        />
                        <GoogleLogin
                            clientId="208818866586-e6qdnrhs6g5pkv6mqtsam7jk57m9i8m2.apps.googleusercontent.com"
                            buttonText=""
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            className="google-btn"
                        />
                    </div>
                </div>
                }
            </div>

        )
    }
}

export default Header