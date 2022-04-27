import React, { useRef, useState } from 'react';
import { FlatList, Image, Platform, SafeAreaView, Text, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import style from './styles';

const Home = () => {
    const [formData, setFormData] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(true);
    const [buttonType, setButtonType] = useState('plus');
    const [submitTapped, setSubmitTapped] = useState(false);
    const flatScroll = useRef(null);

    const _onButtonPress = (type) => {
        if (type === 0) {
            setButtonType('minus')
            if (formData.length === 0) {
                setFormData([]);
                return
            }
            const temp = [...formData];
            temp.pop();
            setFormData(temp);
            if (temp.length === 0) {
                return
            }
            let d = temp[temp.length - 1]
            setName(d.name);
            setEmail(d.email);
            setPassword(d.password);
            setPasswordVisible(true);
            setSubmitTapped(false);
        } else {
            setButtonType('plus')
            setFormData([...formData, {}]);
            setName('');
            setEmail('');
            setPassword('');
            setPasswordVisible(true);
            setSubmitTapped(false);
        }
    }

    const _onPressEyeButton = () => {
        setPasswordVisible(!passwordVisible);
    }

    const _onSubmitPress = (index) => {
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
            alert("Data saved successfully!")
            let data = { name: name, email: email, password: password }
            formData[index] = data
            setFormData(formData)
            setSubmitTapped(true)
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
        let reg = /^(?!.*[\s])(?=.*\d)(?=.*[!@#$%^&_*+])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
        if (reg.test(text) === false) {
            return false
        }
        return true
    }

    return (
        <SafeAreaView style={ { flex: 1 } }>
            <View style={ { flex: 1 } }>
                <View style={ style.headerView }>
                    <Text style={ { fontSize: 20 } }>{ 'Employees Details' }</Text>
                    <View style={ style.headerButtonView }>
                        <TouchableOpacity style={ style.headerButtonText } onPress={ () => _onButtonPress(0) }>
                            <View style={ style.headerButtonView }>
                                <Text style={ style.buttonText } >{ '-' }</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={ style.headerButtonText } onPress={ () => _onButtonPress(1) }>
                            <View style={ style.headerButtonView }>
                                <Text style={ style.buttonText } >{ '+' }</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={ { flex: 1 } }>
                    <FlatList
                        style={ { flex: 1 } }
                        data={ formData }
                        ref={ flatScroll }
                        removeClippedSubviews={ false }
                        onContentSizeChange={ () => flatScroll.current.scrollToEnd() }
                        renderItem={ ({ item, index }) => {
                            let isLastElement = index === formData.length - 1
                            return <View style={ style.colorView }>
                                <Text style={ style.formTitle }>{ 'Employee details form' }</Text>
                                <TextInput
                                    style={ style.textInput }
                                    placeholder="Enter name"
                                    editable={ "name" in formData[index] ? false : true }
                                    value={ isLastElement === true ? name : formData[index].name }
                                    onChangeText={ text => {
                                        if (isLastElement === true) {
                                            setName(text)
                                        }
                                    } }
                                />
                                <TextInput
                                    style={ style.textInput }
                                    placeholder="Enter email"
                                    keyboardType='email-address'
                                    editable={ "name" in formData[index] ? false : true }
                                    value={ isLastElement === true ? email : formData[index].email }
                                    onChangeText={ text => {
                                        if (isLastElement === true) {
                                            setEmail(text)
                                        }
                                    } }
                                />
                                <View style={ style.textInput }>
                                    <TextInput
                                        placeholder="Enter password"
                                        secureTextEntry={ isLastElement === true ? passwordVisible : true }
                                        editable={ "name" in formData[index] ? false : true }
                                        value={ isLastElement === true ? password : formData[index].password }
                                        style={ { width: '88%', height: 40, paddingLeft: 0 } }
                                        onChangeText={ text => {
                                            if (isLastElement === true) {
                                                setPassword(text)
                                            }
                                        } }
                                    />
                                    { submitTapped ? null : isLastElement && buttonType === 'plus' ?
                                        <TouchableOpacity style={ { height: 35, width: 35, justifyContent: 'center', alignItems: 'center' } } activeOpacity={ .5 } onPress={ () => _onPressEyeButton() }>
                                            <Image style={ style.imageIcon } source={ passwordVisible ? require('../../icons/eye.png') : require('../../icons/eye-slash.png') } />
                                        </TouchableOpacity>
                                        : null
                                    }
                                </View>
                                { submitTapped ? null : isLastElement && buttonType === 'plus' ?
                                    <View style={ { alignItems: 'center' } }>
                                        <TouchableOpacity style={ style.buttonStyle } onPress={ () => _onSubmitPress(index) }>
                                            <Text style={ { fontSize: 18 } }>{ 'Submit' }</Text>
                                        </TouchableOpacity>
                                    </View>
                                    : null
                                }
                            </View>
                        } } />
                    { Platform.OS === 'ios' ? <KeyboardSpacer /> : null }
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Home;