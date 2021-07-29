import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification, { Importance } from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';

const CHANNEL_ID = 'rn-fcm-channel';

export default class PushNotificationService {
	static init = () => {
		this.#configure();
		this.#createChannel();
    this.#checkPermission();
    this.#onMessage();
	};

	static #configure = () => {
		PushNotification.configure({
			onRegister: function (token) {
        // Will use Firebase Token
				// console.log('TOKEN:', token);
			},
			onNotification: function (notification) {
				console.log('NOTIFICATION:', notification);
				notification.finish(PushNotificationIOS.FetchResult.NoData);
			},
			permissions: {
				alert: true,
				badge: true,
				sound: true,
			},
			popInitialNotification: true,
			requestPermissions: true,
		});
	};

	static #createChannel = () => {
		PushNotification.channelExists(CHANNEL_ID, exist => {
			if (!exist) {
				PushNotification.createChannel(
					{
						channelId: CHANNEL_ID, // (required)
						channelName: 'React Native Firebase Cloud Messaging Channel', // (required)
						channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
						playSound: true, // (optional) default: true
						soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
						importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
						vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
					},
					created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
				);
			}
		});
	};

  static #onMessage = () => {
		const unsubscribe = messaging().onMessage(async remoteMessage => {
			console.log("MESSAGE: ", remoteMessage)
		});
		return unsubscribe;
	};

  static #checkPermission = () => {
    messaging()
			.hasPermission()
			.then(() => {
        messaging()
          .getToken()
          .then(token => {
            console.log("TOKEN: ", token)
          })
      });
  }

  static _localNotification = (title, body) => {
    PushNotification.localNotification({
      channelId: CHANNEL_ID,
      title: title,
      message: body,
    })
  }
}
