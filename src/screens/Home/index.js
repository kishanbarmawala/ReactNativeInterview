import React, { useState } from 'react';
import { FlatList, Image, SafeAreaView, Text, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import style from './styles';

const Home = () => {
    const [formData, setFormData] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(true);

    [
        {
            name: '',
            email: '',
            pass: '',
        },
        {
            name: '',
            email: '',
            pass: '',
        },
    ]

    _onButtonPress = (type) => {
        if (type === 0) {
            if (formData.length === 0) { return }
            const temp = [...formData];
            temp.splice(formData.length - 1, 1);
            setFormData(temp);
        } else {
            let data = {
                name: name,
                email: email,
                pass: password,
            }
            setFormData([...formData, data]);
            setName('');
            setEmail('');
            setPassword('');
            setPasswordVisible('');
        }
    }
    onPressEyeButton = () => {
        console.log("onPressEyeButton");
        setPasswordVisible(!passwordVisible);
    }

    const _onSubmitPress = () => {
        if (name.length === 0) {
            alert("Please enter name")
        } else if (name.length < 5) {
            alert("Name should be 5 characters long")
        } else if (email.length === 0) {
            alert("Please enter email")
        } else if (emailValidate(email) === false) {
            alert("Enter correct email")
        } else if (password.length === 0) {
            alert("Please enter password")
        } else if (passValidate(password) === false) {
            alert("Use minimum eight characters, at least one letter and one number for password")
        } else {
            alert("You're good to go")
        }
    }

    const emailValidate = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(text) === false) {
            return false
        }
        return true
    }

    const passValidate = (text) => {
        // let reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        let reg = /^(?!.*[\s])(?=.*\d)(?=.*[!@#$%^&_*+])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
        if (reg.test(text) === false) {
            return false
        }
        return true
    }

    return (
        <SafeAreaView>
            <View style={ style.headerView }>
                <Text style={ { fontSize: 20 } }>{ 'Employees Details' }</Text>
                <View style={ style.headerButtonView }>
                    <TouchableOpacity style={ style.headerButtonText } onPress={ () => _onButtonPress(0) }>
                        <Text style={ style.buttonText } >{ '-' }</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={ style.headerButtonText } onPress={ () => _onButtonPress(1) }>
                        <Text style={ style.buttonText } >{ '+' }</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <FlatList
                keyExtractor={ item => item }
                data={ formData }
                renderItem={ ({ item, index }) => {
                    return <View style={ [/*{ backgroundColor: item },*/ style.colorView] }>
                        <Text style={ style.formTitle }>{ 'Employee details form' }</Text>
                        <TextInput
                            style={ style.textInput }
                            placeholder="Enter name"
                            value={ name }
                            onChangeText={ text => setName(text) }
                        />
                        <TextInput
                            style={ style.textInput }
                            placeholder="Enter email"
                            keyboardType='email-address'
                            value={ email }
                            onChangeText={ text => setEmail(text) }
                        />
                        <View style={ style.textInput }>
                            <TextInput
                                placeholder="Enter password"
                                secureTextEntry={ passwordVisible }
                                value={ password }
                                style={ { width: '86%', height: 30 } }
                                onChangeText={ text => setPassword(text) }
                            />
                            <TouchableOpacity style={ { height: 35, width: 35, justifyContent: 'center', alignItems: 'center' } } activeOpacity={ .5 } onPress={ () => onPressEyeButton() }>
                                <Image style={ style.imageIcon } source={ passwordVisible ? require('../../icons/eye.png') : require('../../icons/eye-slash.png') } />
                            </TouchableOpacity>
                        </View>
                        <View style={ { alignItems: 'center' } }>
                            <TouchableOpacity style={ style.buttonStyle } onPress={ () => _onSubmitPress() }>
                                <Text style={ { fontSize: 18 } }>{ 'Submit' }</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                } }
            />
        </SafeAreaView>
    )

}

export default Home;
