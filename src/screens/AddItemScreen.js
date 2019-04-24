import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableHighlight, StyleSheet, TextInput, Button } from 'react-native';
import firebase, { db } from '../config';

import { readData } from '../DataStorage';
import AsyncStorage from '@react-native-community/async-storage';

import styles from '../styles/stylesComponent';

let addItem = (a, b, c, uid) => {
  db.ref('/products/' + uid).push({
    name: a,
    price: b,
    quantity: c
  });
};

export default class AddItemScreen extends Component {
  state = {
    name: '',
    price: '',
    quantity: '',
    uid: '',
    errorQty: false,
    errorPrice: false,
    errorName: false,
    submitValid: true
  };

  async getUserId(){
    try {
      const response = await AsyncStorage.getItem('uid');
      alert(response);
      console.log(response);
      this.setState({uid: response});
    }
    catch (error) {
      console.log("Error while storing the token");
    }
  }

  componentDidMount() {
    this.getUserId();
  }
  
  handleChangeName = (text) => {
    const reg = /^[a-zA-Z]+$/;
    let correctName = text.match(reg) ? this.setState({submitValid: true, errorName: false}) : this.setState({errorName: true,  submitValid: false});
    this.setState({name:text});
  }

  handleChangePrice = (text) => {
    const reg = /^[+]?([1-9][0-9]*(?:[\.][0-9]*)?|0*\.0*[1-9][0-9]*)(?:[eE][+-][0-9]+)?$/;
    let correctPrice = text.match(reg) ? this.setState({submitValid: true, errorPrice: false}) : this.setState({errorPrice: true, submitValid: false});
    this.setState({price:text});
  }
  
  handleChangeQuantity = (text) => {
    const reg = /^[1-9]\d*$/;
    let correctEntry = text.match(reg) ? this.setState({submitValid: true, errorQty: false}) : this.setState({errorQty: true, submitValid: false});
    this.setState({quantity:text});
  }   

  handleSubmit = () => {
    console.log(readData)
    if(this.state.submitValid){
      addItem(this.state.name, this.state.price, this.state.quantity, this.state.uid);
      this.nameInputRef.clear();
      this.priceInputRef.clear();
      this.quantityInputRef.clear();
      console.log("handle submit triggered");
      alert('item saved!');
    }
  };



  render(){
    let errorQtyVisible;
    let errorNameVisible;
    let errorPriceVisible;
    let errorSubmitVisible;
    this.state.errorName ? (errorNameVisible = <Text>letters only, no numbers and special characters</Text>) : null;
    this.state.errorPrice ? (errorPriceVisible = <Text>numbers only, no text and special characters</Text>) : null;
    this.state.errorQty ? (errorQtyVisible = <Text>please enter a number</Text>) : null;
    (this.state.submitValid === false) ? (errorSubmitVisible = <Text>please correct the inputs</Text>) : null;
    return(
    <ScrollView style={styles.scrollContainer}>

      <Text style={styles.title}>Add Item</Text>
      <TextInput
        ref={ref => this.nameInputRef = ref}
        style={styles.itemInput}
        onChangeText={this.handleChangeName}
        placeholder='Item name'
      />
      {errorNameVisible}
      <TextInput
        ref={ref => this.priceInputRef = ref}
        style={styles.itemInput}
        onChangeText={this.handleChangePrice}
        placeholder='Item price'
      />
      {errorPriceVisible}
      <TextInput
        ref={ref => this.quantityInputRef = ref}
        style={styles.itemInput}
        onChangeText={this.handleChangeQuantity}
        placeholder='Item quantity'
      />
      {errorQtyVisible}
      <TouchableHighlight
        style={styles.button}
        
        onPress={this.handleSubmit}
      >
       <Text style={styles.buttonText}>Add</Text>
      </TouchableHighlight>
      {errorSubmitVisible}
      </ScrollView>
    );
  }
}
