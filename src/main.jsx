import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ShoppingList from './screens/shoppingList';
import AddProduct from './screens/addProduct';

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
        <Stack.Screen
          name="AddProduct"
          component={AddProduct}
          options={{
            title: 'Add a product',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Apps;
