import React, {Component} from 'react';
import styled from 'styled-components';
import {Link} from "react-router-dom";

import Header from '../components/Header';
import Menubar from '../components/Menubar';
import Button from '../components/Button';
import axios from 'axios';

const SettingsComponent = styled.div`
  justify-content: center;
  display: block;
  padding: 7rem 0;
  margin: 0;
  text-align: center;
`
class Settings extends Component {
  constructor(props){
    super(props);

    const isLoggedIn = localStorage.getItem('isLogged');
    this.state = {
      isLogged: isLoggedIn === 'true',
      message: 'Waiting to log out'
    }
    this.handleLogOut = this.handleLogOut.bind(this);
  }  

  logout(){
    localStorage.setItem('isLogged',false);
    this.setState((prevState) =>(
      {
        isLogged: false
      }
    ))
    console.log(this.state)
  }

  handleLogOut() {
    axios.get('/logout').then(res => {
      console.log(this.state.message); 
      this.setState({message: res.data.message});
      this.logout();
      window.location = '/';
		}).catch(err =>{
			console.log(err);
			this.setState({message: "Failed to log out!"});
		});
  };

  componentWillMount(){
    const isLoggedIn = localStorage.getItem('isLogged');
    this.setState((prevState) => (
      {
        isLogged: isLoggedIn === 'true'
      }
    ))
    console.log(this.state.isLogged)
  }

  render() {
    return (
      <SettingsComponent className="Settings">
        <Header />
          <Button type="submit" onClick={this.handleLogOut} text="Log out" primary />
        <Menubar />
      </SettingsComponent>
    );
  }
}


export default Settings;
