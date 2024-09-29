import 'react-native-gesture-handler'; // Ensure this is at the top
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/Home'; // Import the Home component
import LabDetails from './src/LabDetails'; // Import the LabDetails component
import AddLab from './src/AddLab';
import BookService from './src/BookService';

const Stack = createNativeStackNavigator(); // Create a stack navigator

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* Ensure only Screen components are direct children of Stack.Navigator */}
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="LabDetails" component={LabDetails} />
        <Stack.Screen name="AddLab" component={AddLab} options={{ title: 'إضافة مختبر جديد' }} />
        <Stack.Screen name="BookService" component={BookService} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
