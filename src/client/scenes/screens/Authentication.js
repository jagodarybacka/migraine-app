import React from 'react';
import { StyleSheet, Text, Button, TextInput, View, AsyncStorage } from 'react-native';
import bcrypt from 'react-native-bcrypt'

export default class Authentication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      username: '',
      hasProfile: false,
      changePassword: false,
      newPassword: '',
      counter: 3,
      disableSubmit: false
    };
  }

  componentDidMount() {
    const { navigation } = this.props;

    this.setState({
      hasProfile: navigation.getParam('hasProfile', false),
      changePassword: navigation.getParam('changePassword', false),
    })
  }

  async _registerNewUser(password) {
    try {
      const pswd = password || this.state.password;
      const user = this.state.username;
      const userExist = await AsyncStorage.getItem(user) !== null

      if (userExist && !password) { // Abort when user try to create existing user
        return false
      }

      // Creates pair of username - password hash in database
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(pswd, salt);
      await AsyncStorage.setItem(user, hash)

      return true;
    } catch (err) {
      console.log(err)
    }
  }

  async _isPasswordCorrect() {
    try {
      const username = this.state.username;
      const hash = await AsyncStorage.getItem(username);

      if (!hash) {
        return false
      }
      return await bcrypt.compareSync(this.state.password, hash)
    } catch (err) {
      console.log(err)
    }
  }

  async _changePassword() {
    const passwordCorrect = await this._isPasswordCorrect();

    if (passwordCorrect) {
      await this._registerNewUser(this.state.newPassword);
      return true;
    } else {
      return false;
    }
  }

  _validateInputs() {
    const usernameValid = !!this.state.username.length;
    const passwordValid = !!this.state.password.length;
    const newPasswordValid = !!this.state.newPassword.length;

    if (this.state.changePassword) {
      return usernameValid && passwordValid && newPasswordValid;
    }
    return usernameValid && passwordValid;
  }

  async handleSubmit() {
    // Not allow brute force
    if (!this.state.counter) {
      this.props.navigation.navigate('Home')
      return;
    }

    // Validate inputs
    if (!this._validateInputs()) {
      this.setState((prevState) => ({
        counter: prevState.counter - 1
      }))

      this.setState({
        disableSubmit: false
      })

      return;
    }

    // Try to change password
    if (this.state.changePassword) {
      if (await this._changePassword()) {
        this.props.navigation.navigate('Note', {
          username: this.state.username,
          secret: this.state.password,
          newSecret: this.state.newPassword
        })
      } else {
        this.setState((prevState) => ({
          counter: prevState.counter - 1
        }))
      }

      this.setState({
        disableSubmit: false
      })
      return;
    }

    // Try to log in existing user
    if (this.state.hasProfile) {
      if (await this._isPasswordCorrect()) {
        this.props.navigation.navigate('Note', {
          username: this.state.username,
          secret: this.state.password
        })
      } else {
        this.setState((prevState) => ({
          counter: prevState.counter - 1
        }))
      }
      this.setState({
        disableSubmit: false
      })

      return;
    }

    // Try to register new user
    if (await this._registerNewUser()) {
      this.props.navigation.navigate('Home', {
        newUser: true
      })
    } else {
      this.props.navigation.navigate('Home', {
        userExists: true
      })
    }
  }

  render() {
    const header = this.state.hasProfile ? 'Log In' : (this.state.changePassword ? 'Change password': 'Register');
    const submitBtn = this.state.hasProfile ? 'Submit' : (this.state.changePassword ? 'Change password': 'Create new user')
    const errorMessage = <Text style={{color: 'red'}}>{`Wrong username or password, ${this.state.counter} attempts left`}</Text>

    return (
      <View style={styles.container}>
        <Text style={styles.text}>{header}</Text>
        <TextInput
          placeholder="Type your username here"
          onChangeText={(username) => this.setState({username})}
        />
        <TextInput
          style={{height: 40}}
          placeholder="Type your password here"
          secureTextEntry
          onChangeText={(password) => this.setState({password})}
        />
        {
          this.state.changePassword && (
            <TextInput
              style={{height: 40}}
              placeholder="Type your new password here"
              secureTextEntry
              onChangeText={(newPassword) => this.setState({newPassword})}
            />
          )
        }
        {
          this.state.counter < 3 && errorMessage
        }
        <Button
          title={this.state.disableSubmit ? 'Loading...' : submitBtn}
          onPress={() => {
            this.setState({disableSubmit: true}, () => {
              this.handleSubmit()
            })
          }}
          disabled={this.state.disableSubmit}
          style={styles.button}/>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  button: {
    marginTop: 75,
    height: 50
  }
});
