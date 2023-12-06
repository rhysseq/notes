import { StyleProp, View, ViewStyle, useColorScheme } from "react-native";

export const StandardLayout = ({ children, style }: { children: React.ReactNode, style?: StyleProp<ViewStyle> }) => {
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? '#3e4444' : 'white',
    };
    return (
        <View style={[backgroundStyle, style]}>

            {children}
        </View>
    )
}