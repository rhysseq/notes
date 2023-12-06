import { createStackNavigator } from '@react-navigation/stack';
import { Note } from '../screens/note/Note';
import { Notes } from '../screens/note/Notes';
import { RootStackParamList } from './types';

const RootStackNavigator = createStackNavigator<RootStackParamList>();

export const RootStack = () => {
    return (
        <RootStackNavigator.Navigator>
            <RootStackNavigator.Screen
                name="Notes"
                component={Notes}
                options={{ headerShown: false }}
            />
            <RootStackNavigator.Screen
                name="Note"
                component={Note}
                options={{}}
            />
        </RootStackNavigator.Navigator>
    );
}