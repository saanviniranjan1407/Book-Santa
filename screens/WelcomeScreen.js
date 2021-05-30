import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Modal, ScrollView, KeyboardAvoidingView } from 'react-native';
import firebase from 'firebase';
import db from '../config';
import SantaClaus from '../components/santaClaus.js';

export default class WelcomeScreen extends Component{
    constructor(){
        super();
        this.state = {
            emailId: '',
            password: '',
            firstName: '',
            lastName: '',
            contact: '',
            address: '',
            confirmPassword: '',
            isModalVisible: 'false'
        }
    }

    showModal=()=>{
        return(
            <Modal animationType='fade'
                   transparent={true}
                   visible={this.state.isModalVisible}>
                <View>
                    <ScrollView style={{width: '100%'}}>
                        <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
                            <Text style={styles.modalTitle}>
                                Registration
                            </Text>
                            <TextInput style={styles.formTextInput}
                                       placeholder={'First Name'}
                                       maxLength={10}
                                       onChangeText={(Text)=>{
                                           this.setState({
                                               firstName: Text
                                           })
                                       }}>                                       
                            </TextInput>
                            <TextInput style={styles.formTextInput}
                                       placeholder={'Last Name'}
                                       maxLength={10}
                                       onChangeText={(Text)=>{
                                           this.setState({
                                               lastName: Text
                                           })
                                       }}>                                       
                            </TextInput>
                            <TextInput style={styles.formTextInput}
                                       placeholder={'Contact'}
                                       maxLength={10}
                                       keyboardType={'numeric'}
                                       onChangeText={(Text)=>{
                                           this.setState({
                                               contact: Text
                                           })
                                       }}>                                       
                            </TextInput>
                            <TextInput style={styles.formTextInput}
                                       placeholder={'address'}
                                       multiline={true}
                                       onChangeText={(Text)=>{
                                           this.setState({
                                               address: Text
                                           })
                                       }}>                                       
                            </TextInput>
                            <TextInput style={styles.formTextInput}
                                       placeholder={'Email'}
                                       keyboardType={'email-address'}
                                       onChangeText={(Text)=>{
                                           this.setState({
                                               emailId: Text
                                           })
                                       }}>                                       
                            </TextInput>
                            <TextInput style={styles.formTextInput}
                                       placeholder={'Password'}
                                       secureTextEntry={true}
                                       onChangeText={(Text)=>{
                                           this.setState({
                                               password: Text
                                           })
                                       }}>                                       
                            </TextInput>
                            <TextInput style={styles.formTextInput}
                                       placeholder={'Confirm Password'}
                                       secureTextEntry={true}
                                       onChangeText={(Text)=>{
                                           this.setState({
                                               confirmPassword: Text
                                           })
                                       }}>                                       
                            </TextInput>
                            <View>
                                <TouchableOpacity style={styles.registerButton}
                                                  onPress={()=>
                                                    this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)
                                                  }>
                                    <Text style={styles.registerButtonText}>
                                        Register
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.cancelButton}
                                                  onPress={()=>this.setState({isModalVisible: 'false'})}>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </Modal>
        )
    }

    userSignUp=(emailId, password, confirmPassword)=>{
        if(password !== confirmPassword){
            return ALert.alert('Password does not match!')
        }
        else{
            firebase.auth().createUserWithEmailAndPassword(emailId, password)
            .then(() => {
            // Signed in 
            db.collection('users').add({
                first_name: this.state.firstName,
                last_name: this.state.lastName,
                contact: this.state.contact,
                address: this.state.address,
                email_id: this.state.emailId
            })
            return ALert.alert('user added successfully!', 
            '', 
            [
                {text: 'OK',
                 onPress: ()=>{
                     this.setState({
                         isModalVisible: 'false'
                     })
                 }}
            ])
            // ...
            })
            .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            return Alert.alert(errorMessage);
            // ..
            })
        }
    }

    userLogin=(emailId, password)=>{
        firebase.auth().signInWithEmailAndPassword(emailId, password)
            .then(() => {
            // Signed in
            return ALert.alert('successfullt loged in!')
            // ...
            })
            .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            return Alert.alert(errorMessage);
            })
    }

    render(){
        return(
            <View style = {styles.container}>
                {this.showModal()}
                <View>
                    <SantaClaus/>
                    <Text style={{marginLeft: 80}}>
                        Book Santa
                    </Text>
                </View>
                <View>
                    <TextInput style = {styles.loginBox}
                                placeholder="abc@example.com"
                                keyboardType="email-address"
                                onChangeText={(text)=>{
                                    this.setState({
                                        emailId: text
                                    })
                                }}>
                        </TextInput>
                        <TextInput style = {styles.loginBox}
                                placeholder="enter password"
                                secureTextEntry={true}
                                onChangeText={(text)=>{
                                    this.setState({
                                        password: text
                                    })
                                }}>
                        </TextInput>
                </View>
                <View>
                    <TouchableOpacity style = {styles.touchableOpacity}
                                              onPress={()=>{
                                              this.userLogin(this.state.emailId, this.state.password)}}>
                        <Text style = {{textAlign: 'center'}}>
                            Login
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.touchableOpacity}
                                              onPress={()=>{
                                              this.setState({isModalVisible: 'true'})}}>
                        <Text style = {{textAlign: 'center'}}>
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        textAlign: 'center', 
        fontSize: 30
    },
    loginBox: {
        width: 300,
        height: 40,
        borderWidth: 1,
        fontSize: 20,
        margin: 10,
        paddingLeft: 10,
        alignSelf: "center"
    },
    touchableOpacity: {
        width: 90,
        height: 30,
        borderWidth: 1,
        marginTop: 20,
        paddingTop: 5,
        borderRadius: 10
    }
})