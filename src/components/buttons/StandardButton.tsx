import React from 'react';
import { Pressable, Text, View, StyleSheet, StyleProp, TextStyle, ViewStyle, GestureResponderEvent } from 'react-native';


interface StandardButtonProps {
    label?: string;
    style?: StyleProp<ViewStyle>;
    contentContainerStyle?: StyleProp<ViewStyle>;
    labelStyle?: StyleProp<TextStyle>;
    onPress?: (event: GestureResponderEvent) => void;
    enabled?: boolean;
    variant?: 'primary' | 'secondary' | 'warning' | 'danger' | 'success' | 'info';
}

export const StandardButton: React.FC<StandardButtonProps> = ({
    label,
    style,
    contentContainerStyle,
    labelStyle,
    onPress,
    variant = 'primary',
    enabled = true,
}) => {

    const theme = {
        primary: {
            background: '#aecafc',
            border: '#055bfa',
        },
        secondary: {
            background: '#ffcc99',
            border: '#ff6600',
        },
        warning: {
            background: '#ffffcc',
            border: '#ffcc00',
        },
        danger: {
            background: '#ffcccc',
            border: '#ff0000',
        },
        success: {
            background: '#ccffcc',
            border: '#00ff00',
        },
        info: {
            background: '#ccccff',
            border: '#0000ff',
        },
    };


    return (
        <Pressable
            disabled={!enabled}
            style={({ pressed }) => [styles.button,
            {
                backgroundColor: enabled ? theme[variant].background : 'lightgrey',
                borderColor: enabled ? theme[variant].border : 'grey',
                opacity: pressed ? 0.5 : 1,
            },
                style]}
            onPress={onPress}>
            <View style={[styles.contentContainer, contentContainerStyle]}>
                {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 20,
        padding: 10,
        margin: 5,
        borderWidth: 1,
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        color: 'black',
        fontSize: 14,
        fontWeight: 'bold',
    },
});


