import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {Platform} from 'react-native';

class NotificationManager {
  configure = (onRegister, onNotification, onOpenNotification, senderID) => {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        onRegister(token.token)
        console.log('[NotificationManager] onRegister token', token.token);
      },
      onNotification: function (notification) {
        console.log('[NotificationManager] onNOTIFICATION:', notification);
        if(Platform.OS === 'ios') {
          if(notification.data.openedInForegroud){
            notification.userInteraction = true
          } 
        } else {
          notification.userInteraction =true
        }
        if(notification.userInteraction) {
          onOpenNotification(notification)
        }else{
          onNotification(notification)
        }
        if(Platform.OS === 'ios') {
          if(!notification.data.openedInForegroud){
            notification.finish('BackgroudFetchRessultNoData')
          }
        }else{
          notification.finish('BackgroudFetchRessultNoData')
        }
      },
      senderID: senderID
    });
  };
  _buildAndroidNotifiation = (id , title, message , data ={} ,options={}) => {
      return{
        id: id,
        autoCancel: true, // (optional) default: true
        largeIcon: options.largeIcon ||"ic_launcher", // (optional) default: "ic_launcher". Use "" for no large icon.
        smallIcon: options.smallIcon || "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
        bigText: message || "My big text that will be shown when notification is expanded", // (optional) default: "message" prop
        subText: title|| "This is a subText", // (optional) default: none
        vibrate:options.vibrate|| false, // (optional) default: true
        vibration: options.vibration || 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
        priority: options.priority || "high", // (optional) set notification priority, default: high
        visibility: "private", // (optional) set notification visibility, default: private
        importance: options.importance || "high", // (optional) set notification importance, default: high
        data: data,
      }
  }
  _buildIOSNotifiation = (id, title, message, data={}, options={}) => {
      return{
        alertAction: options.alertAction || "view", // (optional) default: view
        category: options.category || "", 
        userInfo: {
            id:id,
            item:data
        }
      }
  }
  showNotification = (id, title, message, data={}, options={}) => {
      PushNotification.localNotification({
          ...this._buildAndroidNotifiation(id,title,message,data,options),
          ...this._buildIOSNotifiation(id, title, message, data, options),
          title: title || "",
          message: message || "",
          playSound: options.playSound || false,
          soundName: options.soundName || 'default',
          userInteraction: false,
      })
  }
  cancelAllLocalNotification = () => {
      if(Platform.OS === 'ios'){
          PushNotificationIOS.removeAllDeliveredNotifications()
      }else{
          PushNotification.cancelAllLocalNotifications()
      }
  }
  unregister = () => {
      PushNotification.unregister()
  }
}
export const notificationManager = new NotificationManager();