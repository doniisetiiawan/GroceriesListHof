/* eslint-disable camelcase,react/prop-types,react/no-access-state-in-setstate */
import React, { Component } from 'react';
import {
  Body,
  Button,
  Container,
  Content,
  Fab,
  Footer,
  FooterTab,
  Form,
  Header,
  Icon,
  Input,
  Item,
  Label,
  List,
  ListItem,
  Right,
  Text,
  Title,
} from 'native-base';
import { AsyncStorage, Modal } from 'react-native';

class AddProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allProducts: [
        { id: 1, name: 'bread' },
        { id: 2, name: 'eggs' },
        { id: 3, name: 'paper towels' },
        { id: 4, name: 'milk' },
      ],
      productsInList: [],
      modalVisible: false,
      productName: '',
    };
  }

  UNSAFE_componentWillMount = async () => {
    const savedProducts = await AsyncStorage.getItem(
      '@allProducts',
    );
    if (savedProducts) {
      this.setState({
        allProducts: JSON.parse(savedProducts),
      });
    }

    this.setState({
      productsInList: this.props.route.params
        .productsInList,
    });
  };

  addNewProduct = async (name) => {
    const newProductsList = this.state.allProducts.concat({
      name,
      id: Math.floor(Math.random() * 100000),
    });

    await AsyncStorage.setItem(
      '@allProducts',
      JSON.stringify(newProductsList),
    );

    this.setState({
      allProducts: newProductsList,
      modalVisible: !this.state.modalVisible,
    });
  };

  _handleProductPress = (product) => {
    const productIndex = this.state.productsInList.findIndex(
      (p) => p.id === product.id,
    );
    if (productIndex > -1) {
      this.setState({
        productsInList: this.state.productsInList.filter(
          (p) => p.id !== product.id,
        ),
      });
      this.props.route.params.deleteProduct(product);
    } else {
      this.setState({
        productsInList: this.state.productsInList.concat(
          product,
        ),
      });
      this.props.route.params.addProduct(product);
    }
  };

  _handleAddProductPress = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  };

  async _handleRemovePress(product) {
    this.setState({
      allProducts: this.state.allProducts.filter(
        (p) => p.id !== product.id,
      ),
    });
    await AsyncStorage.setItem(
      '@allProducts',
      JSON.stringify(
        this.state.allProducts.filter(
          (p) => p.id !== product.id,
        ),
      ),
    );
  }

  render() {
    return (
      <Container>
        <Content>
          <List>
            {this.state.allProducts.map((product) => {
              const productIsInList = this.state.productsInList.find(
                (p) => p.id === product.id,
              );
              return (
                <ListItem
                  key={product.id}
                  onPress={() => this._handleProductPress(product)}
                >
                  <Body>
                    <Text
                      style={{
                        color: productIsInList
                          ? '#bbb'
                          : '#000',
                      }}
                    >
                      {product.name}
                    </Text>
                    {productIsInList && (
                      <Text note>
                        Already in shopping list
                      </Text>
                    )}
                  </Body>
                  <Right>
                    <Icon
                      ios="ios-remove-circle"
                      android="md-remove-circle"
                      style={{ color: 'red' }}
                      onPress={() => this._handleRemovePress(product)}
                    />
                  </Right>
                </ListItem>
              );
            })}
          </List>
        </Content>
        <Fab
          style={{ backgroundColor: '#5067FF' }}
          position="bottomRight"
          onPress={this._handleAddProductPress}
        >
          <Icon name="add" />
        </Fab>

        <Modal
          animationType="slide"
          visible={this.state.modalVisible}
        >
          <Container>
            <Header>
              <Body>
                <Title>Product</Title>
              </Body>
            </Header>
            <Content>
              <Form>
                <Item floatingLabel>
                  <Label>Enter product name</Label>
                  <Input
                    value={this.state.productName}
                    onChangeText={(productName) => this.setState({ productName })}
                  />
                </Item>
              </Form>
            </Content>

            <Footer>
              <FooterTab>
                <Button
                  onPress={this._handleAddProductPress}
                  light
                >
                  <Text> Cancel </Text>
                </Button>
                <Button
                  onPress={() => this.addNewProduct(
                    this.state.productName,
                  )}
                  success
                >
                  <Text> Ok </Text>
                </Button>
              </FooterTab>
            </Footer>
          </Container>
        </Modal>
      </Container>
    );
  }
}

export default AddProduct;
