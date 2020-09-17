/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Text,Alert} from 'react-native';
import {notificationManager} from './src/NotificationManager';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.locaNotify = null
    this.senderID='977218090614'
  }
  componentDidMount(){
    this.locaNotify = notificationManager
    this.locaNotify.configure(this.onRegister, this.onNotification, this.onOpenNotification,this.senderID)
  }
  onRegister(token) {
    console.log("[Notification] Regisered:", token);
  }
  onNotification(notify) {
    console.log("[Notification] onNotification:", notify);
  }

  onOpenNotification(notify) {
    console.log("[Notification] onOpenNotification:", notify);
    Alert.alert.show('onOpenNotification')
  }
  onPressSendNotification = () => {
    const options = {
      soundName: 'default',
      playSound: true,
      vibrate: true,
    }
    this.locaNotify.showNotification(
      1,
      "App Notification",
      "Local Notification",
      {}, //data,
      options, //options
    )
  }
  onPressCancelNotification = () => {
    this.locaNotify.cancelAllLocalNotification();
  }
  render() {
    return(
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={this.onPressSendNotification}>
          <Text>Send Notification</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={this.onPressCancelNotification}>
          <Text>Cancel Notification</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button:{
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#DDDDDD',
    padding:10,
    width:200,
    marginTop:10,
  }
})