import React from 'react';
import { StyleSheet, Text, Button, TextInput, View, AsyncStorage } from 'react-native';
import CryptoJS from 'crypto-js'

export default class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      username: '',
      secret: '',
      newSecret: '',
      successMessage: false
    };
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const isNewSecret = navigation.getParam('newSecret', false)

    await this.setState({
      secret: navigation.getParam('secret', false),
      newSecret: navigation.getParam('newSecret', false),
      username: navigation.getParam('username', false),
    })

    await this._getNote();
    isNewSecret && await this._switchSecrets();
  }

  async _getNote() {
    try {
      const user = this.state.username;
      const rawNote = await AsyncStorage.getItem(`${user}:note`);
      if (rawNote === null) {
        return;
      }

      // Decryption of message
      const bytes = await CryptoJS.AES.decrypt(rawNote, this.state.secret)
      const message = bytes.toString(CryptoJS.enc.Utf8);
      this.setState({
        text: message
      })
    } catch (err){
      console.log(err)
    }
  }

  async _setNote(newSecret) {
    const user = this.state.username;
    const secret = newSecret || this.state.secret // seting a secret to old or new secret

    // Encryption of message
    const ciphertext = CryptoJS.AES.encrypt(this.state.text, secret);
    const result = await AsyncStorage.setItem(`${user}:note`, ciphertext.toString())

    this.setState({
      successMessage: true
    })
  }

  async _switchSecrets() {
    const newSecret = this.state.newSecret
    await this._setNote(newSecret);
    this.setState({
      secret: newSecret
    })
  }

  render() {
    const message = <Text style={{color: 'green'}}>Your note has been saved</Text>

    return (
      <View style={styles.container}>
        <Text style={styles.text}>Note</Text>
        {
          this.state.successMessage && message
        }
        <TextInput
          style={{flex: 1}}
          multiline={true}
          numberOfLines={5}
          value={this.state.text}
          placeholder="Write your note here ..."
          onChangeText={(text) => this.setState({
            text,
            successMessage: false
          })}
        />
        <Button
          title="Save"
          style={styles.button}
          onPress={() => this._setNote()}/>
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
