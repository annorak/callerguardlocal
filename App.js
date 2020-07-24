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

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';
import {createAppContainer} from 'react-navigation';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

function CallScreen() { 
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Call Screen!</Text>
    </View>
  );
}

function CallLogs() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Call Logs!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings Screen!</Text>
    </View>
  );
}

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="CallLogs"
      activeColor="#e91e63"
      labelStyle={{ fontSize: 12 }}
      style={{ backgroundColor: 'tomato' }}
    >
      <Tab.Screen
        name="CallLogs"
        component={CallLogs}
        options={{
          tabBarLabel: 'Call Logs',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="CallScreen"
        component={CallScreen}
        options={{
          tabBarLabel: 'Calls',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

// export default class App extends Component {
//   state = {
//     twilioInited: false
//   };

//   getAuthToken = () => {
//     return fetch('http://ec2-54-189-89-6.us-west-2.compute.amazonaws.com:8234/iOSToken', { 
//       method: 'get',
//     })
//       .then(response => response.text())
//       .catch((error) => console.error(error));
//   } 
 
//   //http://ec2-54-189-89-6.us-west-2.compute.amazonaws.com:8234/iOSToken

//   getMicrophonePermission = () => {
//     const audioPermission = PermissionsAndroid.PERMISSIONS.RECORD_AUDIO;

//     return PermissionsAndroid.check(audioPermission).then(async result => {
//       if (!result) {
//         const granted = await PermissionsAndroid.request(audioPermission, {
//           title: 'Microphone Permission',
//           message: 'App needs access to you microphone ' + 'so you can talk with other users.',
//         });
//       }
//     });
//   }
  
//   initTwilio = async () => { 
//     const token = await this.getAuthToken();
//     console.log ('Got auth token: ' + token);

//     if (Platform.OS === 'android') {
//       await this.getMicrophonePermission();
//     }
    
//     const success = await TwilioVoice.initWithToken(token);
//     console.log(success);

//     TwilioVoice.addEventListener('deviceReady', () => {
//       console.log('Device has been configured.');
//       this.setState({ twilioInited: true });
//     });
    
//     console.log('twilioinited is ' + this.statetwilioInited);

//   //   try {
//   //   	if (! (await TwilioVoice.initWithToken (token))) {
//   //       console.log ("Failed to init TwilioVoice");
// 	//     }
//   //   } catch (e) {
// 	// console.log (e);
//   //   }

//     if (Platform.OS === 'ios') { //required for ios
//       TwilioVoice.configureCallKit({  
//         appName: 'callerid',
//       });
//       console.log('CallKit Configured');
//     }
//   };

//   makeCall = () => TwilioVoice.connect({ To: 'Alice' });

//   render() {
//     return (
//       <View style={styles.container}>
//         <TouchableOpacity onPress={() => this.initTwilio()}>
//           <View>
//               <Text>Init Twilio!!</Text>
//           </View>
//         </TouchableOpacity>
//         <TouchableOpacity disabled={!this.state.twilioInited} onPress={() => this.makeCall()}>
//           <View>
//             <Text style={styles.highlight}>Ready to receive calls: ({this.state.twilioInited ? 'ready' : 'not ready'})</Text>
//           </View>
//         </TouchableOpacity>
//       </View>
//     );
//   }

// }

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