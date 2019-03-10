import React, {Component} from 'react';
import './DashBoard.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Adhaar from '../Adhaar/Adhaar'
import {Redirect} from 'react-router-dom'

export default class DashBoard extends Component{
    constructor(props){
        super(props);
        this.state = {
            sport : '',
            team: '',
            person:'',
            event: '',
            show_card: false
        }
    }

    componentWillUnmount(){
        localStorage.removeItem('login')
    }

    logOut(){
        localStorage.removeItem('login')
        this.setState({
            event: ''
        })
    }
    closeModal(){
        this.setState({
            show_card: false
        })
    }
    handleSportsChange(event){
        this.setState({
            sport : event.target.value
        })
    }
    handleTeamChange(event){
        this.setState({
            team : event.target.value
        })
    }
    handlePersonChange(event){
        this.setState({
            person : event.target.value
        })
    }
    handleEventChange(event){
        this.setState({
            event : event.target.value
        })
    }

    handleSubmit(e){
        e.preventDefault();
        localStorage.setItem(this.props.location.state.userid, JSON.stringify(this.state))
        this.setState({
            show_card: false
        })
    }

    showCard(e) {
        e.preventDefault();
        this.setState({
            show_card: true
        })
    }

    render(){
        const props = this.props.location.state
        const login = localStorage.getItem('login')
        const userinfo = props ? JSON.parse(localStorage.getItem(props.userid)) : ''
        return(
            <div>
                {(login) ?
                    <div>
                        {this.state.show_card && <Adhaar
                            show_card={this.state.show_card}
                            closeModal={this.closeModal.bind(this)}
                            name={props.name}
                            photo={props.photo}
                            userid={props.userid}
                        />
                        }
                        <div>
                            <div className='cover'>
                                <img className='cover-photo' src= '/cover.jpg' alt='cover' />
                                <p onClick={this.logOut.bind(this)}>Logout</p>
                            </div>
                            <div className='profile'>
                                <img className='profile-photo' src={props.photo} alt='profile' />
                            </div>
                            <div className='profile-info'>
                                <header className='profile-header'>
                                    <h1>Welcome</h1>
                                    <h1>{props.name}</h1>
                                </header>
                                <main className='profile-body'>
                                    <div className='user-info'>
                                        <h1>Your Info</h1>
                                        <div>
                                            <h2>Favorite Sport : {userinfo ? userinfo.sport : ''}</h2>
                                            <h2>Favorite Team : {userinfo ? userinfo.team : ''}</h2>
                                            <h2>Favorite Sportsperson : {userinfo ? userinfo.person : ''}</h2>
                                            <h2>Favourite Sporting Event : {userinfo ? userinfo.event : ''}</h2>
                                        </div>
                                        <br />
                                        <Button className='show-card' disabled={userinfo ? false : true} variant="contained" size="medium" onClick={this.showCard.bind(this)}>
                                            Generate Aadhaar
                                        </Button>
                                    </div>
                                    <form onSubmit={this.handleSubmit.bind(this)}>
                                        <h1>goplaybook Aadhaar Form (Edit Info)</h1>
                                        <TextField
                                            required
                                            id="fav-sport"
                                            label="Favorite Sport"
                                            className='form-text'
                                            value={this.state.sport}
                                            onChange={this.handleSportsChange.bind(this)}
                                            margin="normal"
                                        />
                                        <TextField
                                            required
                                            id="fav-team"
                                            label="Favorite Team"
                                            className='form-text'
                                            value={this.state.team}
                                            onChange={this.handleTeamChange.bind(this)}
                                            margin="normal"
                                        />
                                        <TextField
                                            required
                                            id="fav-person"
                                            label="Favorite Sports Person"
                                            className='form-text'
                                            value={this.state.person}
                                            onChange={this.handlePersonChange.bind(this)}
                                            margin="normal"
                                        />
                                        <TextField
                                            required
                                            id="fav-event"
                                            label="Favorite Sporting Event"
                                            className='form-text'
                                            value={this.state.event}
                                            onChange={this.handleEventChange.bind(this)}
                                            margin="normal"
                                        />
                                        <br />
                                        <br />
                                        <br />
                                        <Button variant="contained" size="medium" type='submit'>
                                            Save
                                        </Button>
                                    </form>
                                </main>
                            </div>
                        </div>
                    </div>
                : <Redirect
                        to={{
                            pathname: "/",
                        }}
                    />
                }

            </div>

        )
    }
}

