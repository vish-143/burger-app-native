import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';
import PushNotification from 'react-native-push-notification';

export default ForegroundHandler = () => {
    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            console.log("Notification received from foreground", remoteMessage);
        });

        PushNotification.localNotification({
            channelId: "channel-id",
            title: "Android app",
            body: "Test body",
            soundName: "default",
            vibrate: true,
            playSound: true
        });
        return unsubscribe
    }, [])
    return null
}