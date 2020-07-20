import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ShoppingList from './screens/shoppingList';

const Stack = createStackNavigator();

function Apps() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="ShoppingList"
          component={ShoppingList}
          options={{
            title: 'My Groceries List',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Apps;
