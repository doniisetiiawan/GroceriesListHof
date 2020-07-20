/* eslint-disable react/no-access-state-in-setstate,react/prop-types */
import React, { Component } from 'react';
import {
  Body,
  Container,
  Content,
  Right,
  Text,
  CheckBox,
  List,
  ListItem,
  Fab,
  Icon,
} from 'native-base';
import { Alert } from 'react-native';

class ShoppingList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [
        { id: 1, name: 'bread' },
        { id: 2, name: 'eggs' },
      ],
    };
  }

  _handleProductPress = (product) => {
    this.state.products.forEach((p) => {
      if (product.id === p.id) {
        p.gotten = !p.gotten;
      }
      return p;
    });
    this.setState({ products: this.state.products });
  };

  _handleAddProductPress = () => {
    this.props.navigation.navigate('AddProduct', {
      addProduct: (product) => {
        this.setState({
          products: this.state.products.concat(product),
        });
      },
      deleteProduct: (product) => {
        this.setState({
          products: this.state.products.filter(
            (p) => p.id !== product.id,
          ),
        });
      },
      productsInList: this.state.products,
    });
  };

  _handleClearPress = () => {
    Alert.alert('Clear all items?', null, [
      { text: 'Cancel' },
      {
        text: 'Ok',
        onPress: () => this.setState({ products: [] }),
      },
    ]);
  };

  render() {
    return (
      <Container>
        <Content>
          <List>
            {this.state.products.map((p) => (
              <ListItem
                key={p.id}
                onPress={() => this._handleProductPress(p)}
              >
                <Body>
                  <Text
                    style={{
                      color: p.gotten ? '#bbb' : '#000',
                    }}
                  >
                    {p.name}
                  </Text>
                </Body>
                <Right>
                  <CheckBox
                    checked={p.gotten}
                    onPress={() => this._handleProductPress(p)}
                  />
                </Right>
              </ListItem>
            ))}
          </List>
        </Content>
        <Fab
          style={{ backgroundColor: '#5067FF' }}
          position="bottomRight"
          onPress={this._handleAddProductPress}
        >
          <Icon name="add" />
        </Fab>
        <Fab
          style={{ backgroundColor: 'red' }}
          position="bottomLeft"
          onPress={this._handleClearPress}
        >
          <Icon ios="ios-remove" android="md-remove" />
        </Fab>
      </Container>
    );
  }
}

export default ShoppingList;
