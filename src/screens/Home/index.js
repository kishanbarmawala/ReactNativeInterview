import React, { useState } from 'react';
import { StyleSheet, View, FlatList, SafeAreaView, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Home = () => {
    const [formData, setFormData] = useState([]);

    _onButtonPress = (type) => {
        if (type === 0) {
            if (formData.length === 0) { return }
            const temp = [...formData];
            temp.splice(formData.length - 1, 1);
            setFormData(temp);
        } else {
            setFormData([...formData, randomRgb()]);
        }
    }
    
    return (
        <SafeAreaView>
            <View style={ style.headerView }>
                <View style={ style.headerButtonView }>
                    <Text style={ style.headerText }>User From</Text>
                </View>
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
                renderItem={ ({ item }) => {
                    return <View style={ [{ backgroundColor: item }, style.colorView] } />;
                } }
            />
        </SafeAreaView>
    )
}

const randomRgb = () => {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgb(${red},${green},${blue})`;
};

const style = StyleSheet.create({
    headerView: {
        justifyContent: 'space-between',
        height: 44,
        backgroundColor: 'rgba(52, 52, 52, 0.1)',
        flexDirection: 'row',
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    headerButtonView: {
        height: 44,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerText: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        fontSize: 20,
        alignItems: 'center',
    },
    headerButtonText: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        backgroundColor: 'yellow',
        fontSize: 20,
        alignItems: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.1)',
        marginLeft: 8
    },
    colorView: {
        width: 100,
        height: 100,
    },
    buttonText: {
        fontSize: 26
    },
});

export default Home;
