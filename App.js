/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import TwilioVoice from 'react-native-twilio-programmable-voice';

export default class App extends Component {
  state = {
    twilioInited: false
  };

  getAuthToken = () => {
    return fetch('http://ec2-54-189-89-6.us-west-2.compute.amazonaws.com:8234/iOSToken', { 
      method: 'get',
    })
      .then(response => response.text())
      .catch((error) => console.error(error));
  } 
 
  //http://ec2-54-189-89-6.us-west-2.compute.amazonaws.com:8234/iOSToken

  getMicrophonePermission = () => {
    const audioPermission = PermissionsAndroid.PERMISSIONS.RECORD_AUDIO;

    return PermissionsAndroid.check(audioPermission).then(async result => {
      if (!result) {
        const granted = await PermissionsAndroid.request(audioPermission, {
          title: 'Microphone Permission',
          message: 'App needs access to you microphone ' + 'so you can talk with other users.',
        });
      }
    });
  }

  initTwilio = async () => { 
    const token = await this.getAuthToken();
    console.log (token);

    if (Platform.OS === 'android') {
      await this.getMicrophonePermission();
    }

    TwilioVoice.addEventListener('deviceReady', () => {
      this.setState({ twilioInited: true });
      console.log('Device has been configured.');
    });

    TwilioVoice.addEventListener('deviceNotReady', () => {
      console.log('Device not ready.');
    });

    try {
    	if (! (await TwilioVoice.initWithToken (token))) {
        console.log ("Failed to init TwilioVoice");
	    }
    } catch (e) {
	console.log (e);
    }

    if (Platform.OS === 'ios') { //required for ios
      TwilioVoice.configureCallKit({  
        appName: 'callerid',
      });
      console.log('CallKit Configured');
    }
  };

  makeCall = () => TwilioVoice.connect({ To: 'Alice' });

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.initTwilio()}>
          <View>
              <Text>Init Twilio!!!</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity disabled={!this.state.twilioInited} onPress={() => this.makeCall()}>
          <View>
            <Text style={styles.highlight}>Ready to recieve calls: ({this.state.twilioInited ? 'ready' : 'not ready'})</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  highlight:{
    fontWeight:'700',
  }
});