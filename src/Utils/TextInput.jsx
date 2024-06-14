import React from 'react';
import { TextInput, View } from 'react-native';

const CustomTextInput = ({ value,onChangeText, placeholder, placeholderColor, keyboardType, secureTextEntry, style }) => {
    return (
        <View>
            <TextInput
                style={style}
                autoCapitalize="none"
                placeholder={placeholder}
                placeholderTextColor={placeholderColor}
                value={value}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
                onChangeText={onChangeText}
            />
        </View>
    );
};

export default CustomTextInput;
