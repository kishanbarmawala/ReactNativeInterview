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
    const flatScroll = useRef(null);

    const _onButtonPress = (type, index) => {
        if (type === 0) {
            if (formData.length === 0) {
                return
            }
            const temp = [...formData];
            temp.splice(index, 1);
            setFormData(temp);
        } else {
            const lastData = formData[formData.length - 1]
            if (formData.length === 0 || "name" in lastData == true) {
                setFormData([...formData, {}]);
                setName('');
                setEmail('');
                setPassword('');
                setPasswordVisible(true);
            }
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
            let data = { name: name, email: email, password: password }
            const temp = [...formData];
            temp[index] = data
            setFormData(temp);
            setPasswordVisible(true)
            alert("Data saved successfully!")
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
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <View style={style.headerView}>
                    <Text style={{ fontSize: 20 }}>{'Employees Details'}</Text>
                    <View style={style.headerButtonView}>
                        <TouchableOpacity style={style.headerButtonText} onPress={() => _onButtonPress(1, 0)}>
                            <View style={style.headerButtonView}>
                                <Text style={style.buttonText} >{'+'}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <FlatList
                        style={{ flex: 1 }}
                        data={formData}
                        ref={flatScroll}
                        removeClippedSubviews={false}
                        onContentSizeChange={() => flatScroll.current.scrollToEnd()}
                        renderItem={({ item, index }) => {
                            return <View style={style.colorView}>
                                <Text style={style.formTitle}>{"name" in formData[index] == false ? 'Employee details form' : 'Employee details'}</Text>
                                <TextInput
                                    style={style.textInput}
                                    placeholder="Enter name"
                                    editable={"name" in formData[index] ? false : true}
                                    value={formData[index].name}
                                    onChangeText={text => {
                                        if ("name" in formData[index] == false) {
                                            setName(text)
                                        }
                                    }}
                                />
                                <TextInput
                                    style={style.textInput}
                                    placeholder="Enter email"
                                    keyboardType='email-address'
                                    editable={"email" in formData[index] ? false : true}
                                    value={formData[index].email}
                                    onChangeText={text => {
                                        if ("email" in formData[index] == false) {
                                            setEmail(text)
                                        }
                                    }}
                                />

                                <View style={style.textInput}>
                                    <TextInput
                                        placeholder="Enter password"
                                        secureTextEntry={"password" in formData[index] ? true : passwordVisible}
                                        editable={"password" in formData[index] ? false : true}
                                        value={formData[index].password}
                                        style={{ width: '88%', height: 40, paddingLeft: 0 }}
                                        onChangeText={text => {
                                            if ("password" in formData[index] == false) {
                                                setPassword(text)
                                            }
                                        }}
                                    />
                                    {"name" in formData[index] == false &&
                                        <TouchableOpacity style={{ height: 35, width: 35, justifyContent: 'center', alignItems: 'center' }} activeOpacity={.5} onPress={() => _onPressEyeButton()}>
                                            <Image style={style.imageIcon} source={passwordVisible ? require('../../icons/eye.png') : require('../../icons/eye-slash.png')} />
                                        </TouchableOpacity>

                                    }
                                </View >
                                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                    {"name" in formData[index] == false &&
                                        <View style={{ alignItems: 'center' }}>
                                            <TouchableOpacity style={style.buttonStyle} onPress={() => _onSubmitPress(index)}>
                                                <Text style={{ fontSize: 18 }}>{'Submit'}</Text>
                                            </TouchableOpacity>
                                        </View>

                                    }
                                    <View style={{ alignItems: 'center' }}>
                                        <TouchableOpacity style={style.buttonStyle} onPress={() => _onButtonPress(0, index)}>
                                            <Text style={{ fontSize: 18 }} >{'Delete'}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        }} />
                    {Platform.OS === 'ios' ? <KeyboardSpacer /> : null}
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Home;