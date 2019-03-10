import React, {Component} from 'react'
import Modal from '@material-ui/core/Modal';
import './Adhaar.css'
import { Twitter } from 'react-social-sharing'

export default class AdhaarCard extends Component {
    render(){
        const info = JSON.parse(localStorage.getItem(this.props.userid))
        return(
            <Modal className='modal' open={this.props.show_card}>
                <div className='adhaar-card'>
                    <div className='top-bar' onClick={this.props.closeModal}><h3 >X</h3></div>
                    <div className='card-image'>
                        <img src={this.props.photo} alt='profile'/>
                        <p>{this.props.name}</p>
                    </div>
                    <div className='card-info'>
                        <p>Favorite Sport : {info.sport}</p>
                        <p>Favorite Team : {info.team}</p>
                        <p>Favorite Sportsperson : {info.person}</p>
                        <p>Favourite Sporting Event : {info.event}</p>
                        <div className='share-btn'>
                            <Twitter link="http://localhost:3000/dashboard/" />
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }
}