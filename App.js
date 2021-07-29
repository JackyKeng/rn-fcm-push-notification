import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import PushNotificationService from './js/services/PushNotificationService';

export default function App() {
	useEffect(() => {
		PushNotificationService.init();
	}, []);

	return (
		<View style={styles.container}>
			<Text>Welcome to React Native Push Notification</Text>
			<Button
				title="Trigger Local Notification"
				onPress={() => PushNotificationService._localNotification(
					'Test Title',
					'Test body message'
				)}
			></Button>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
