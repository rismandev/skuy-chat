import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {validatePhone} from '../../utils/constants';
// Styles
import styles from '../../styles';
// Dimensions
const DeviceHeight = Dimensions.get('window').height;

const AuthScreen = () => {
  // STATE
  const [state, setState] = React.useState({
    phone: null,
    errorPhone: null,
    confirmation: null,
    confirmCode: null,
    verificationCode: null,
    userId: null,
  });

  const handleSendCode = async () => {
    // Request to send OTP
    if (validatePhone(state.phone)) {
      const confirmation = await auth().signInWithPhoneNumber(state.phone);
      setState({...state, errorPhone: false, confirmation: confirmation});
    } else {
      setState({...state, errorPhone: 'Invalid phone number'});
    }
  };

  return (
    <SafeAreaView style={styles.Flex1}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={[styles.Flex1, styles.bgWhite]}>
        <View style={[styles.Flex1, styles.Center, Styles.Body]}>
          <Image
            source={require('../../assets/images/icon_splash.png')}
            style={Styles.Image}
          />
          <Text style={Styles.Title}>Welcome to SkuyChat</Text>
          <Text style={Styles.Desc}>
            "Easy chat with friends all over the world"
          </Text>
          <KeyboardAvoidingView style={Styles.InputView} behavior="height">
            {/* <TouchableOpacity style={[Styles.CountryCode, styles.Center]}>
              <Text style={Styles.CountryCodeText}>+62</Text>
            </TouchableOpacity> */}

            {state.confirmation ? (
              <TextInput
                placeholder="Confirmation code"
                placeholderTextColor="grey"
                style={Styles.PhoneNumber}
                keyboardType="phone-pad"
                value={state.confirmCode}
                onChangeText={number =>
                  setState({...state, confirmCode: number, errorPhone: false})
                }
              />
            ) : (
              <TextInput
                placeholder="Your phone number (+62)"
                placeholderTextColor="grey"
                style={Styles.PhoneNumber}
                keyboardType="phone-pad"
                value={state.phone}
                onChangeText={number =>
                  setState({...state, phone: number, errorPhone: false})
                }
              />
            )}
            {state.errorPhone && (
              <Text style={Styles.ErrorText}>{state.errorPhone}</Text>
            )}
          </KeyboardAvoidingView>
          <TouchableOpacity style={Styles.Button} onPress={handleSendCode}>
            <Text style={Styles.ButtonText}>Continue</Text>
          </TouchableOpacity>

          {console.log(state)}
        </View>

        <View style={Styles.Footer}>
          <Text style={Styles.TextFooter}>
            By signing in, you agree with the
          </Text>
          <TouchableOpacity>
            <Text style={Styles.TermOfService}>Term of Service</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AuthScreen;

const Styles = StyleSheet.create({
  Body: {
    minHeight: DeviceHeight - 200,
  },
  Image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 15,
  },
  Title: {
    fontSize: 24,
    color: '#00AF80',
    fontFamily: 'Roboto-Black',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  Desc: {
    fontSize: 13,
    color: 'black',
    fontFamily: 'Roboto-Regular',
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  InputView: {
    width: '100%',
    marginTop: 50,
    paddingHorizontal: 25,
  },
  CountryCode: {
    borderWidth: 1,
    borderColor: '#ededed',
    borderRadius: 10,
    width: 50,
    height: 50,
    elevation: 5,
    backgroundColor: 'white',
  },
  CountryCodeText: {
    fontSize: 13,
    color: 'black',
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
  },
  PhoneNumber: {
    borderWidth: 1,
    borderColor: '#ededed',
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 5,
    paddingHorizontal: 20,
    height: 50,
  },
  ErrorText: {
    fontSize: 13,
    color: 'red',
    marginLeft: 5,
    marginTop: 5,
  },
  Button: {
    marginTop: 50,
    backgroundColor: '#00AF80',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#00AF80',
    elevation: 5,
  },
  ButtonText: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'Roboto-Medium',
  },
  Footer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 25,
    flexDirection: 'row',
  },
  TextFooter: {
    fontSize: 13,
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
  },
  TermOfService: {
    fontSize: 13,
    fontFamily: 'Roboto-Medium',
    textAlign: 'center',
    color: '#00AF80',
    marginLeft: 3,
    textDecorationLine: 'underline',
  },
});
