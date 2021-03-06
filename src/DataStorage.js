import React from 'react';
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';

export const writeData = async (key, value) => {
	try {
		await AsyncStorage.setItem(key, value);
	} catch (e) {
		Alert.alert(e.message);
	}
}

export const readData = async (key) => {
	await AsyncStorage.getItem(key).then(response => {
		return response;
	})
}