import { Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Button({ buttonLabelStyle, buttonStyle, onPress, children }) {
    return (
        <View>
            <TouchableOpacity style={buttonStyle} onPress={onPress}>
                 <Text style={buttonLabelStyle}>{children}</Text>
            </TouchableOpacity>
        </View>
    )
}

