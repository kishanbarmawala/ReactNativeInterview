import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

const Home = () => {
    const [formData, setFormData] = useState([randomRgb()]);
    return (
        <FlatList
            keyExtractor={ item => item }
            data={ color }
            renderItem={ ({ item }) => {
                return <View style={ [{ backgroundColor: item }, style.colorView] } />;
            } }
        />
    )
}

const randomRgb = () => {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgb(${red},${green},${blue})`;
};

const style = StyleSheet.create({
    colorView: {
        width: 100,
        height: 100,
    },
});

export default Home;
