import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "./screens/home/HomeScreen";
import ChatScreen from "./screens/chat/ChatScreen";
import StartScreen from "./screens/home/start/StartScreen";
import SignUpScreen from "./screens/home/start/SignUpScreen";
import MailSignUpScreen from "./screens/home/start/MailSignUpScreen";
import InitialNameSetting from "./screens/home/start/InitialNameSettingScreen";
import InitialImageSettingScreen from "./screens/home/start/InitialImageSettingScreen";
import { Provider, useDispatch } from 'react-redux';
import { store } from './redux/store';
import { onAuthStateChanged } from 'firebase/auth';








// 「ホーム」タブ
const HomeStack = createNativeStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="StartScreen" component={StartScreen} options={{
        headerShown: false,
        tabBarStyle: { display: 'none' },
        }} />
      <HomeStack.Screen name="新規登録" component={SignUpScreen} />
      <HomeStack.Screen name="初期設定（画像）" component={InitialImageSettingScreen} />
      <HomeStack.Screen name="初期設定（ニックネーム）" component={InitialNameSetting} options={{
        headerShown: false,
        tabBarStyle: { display: 'none' },
        }} />
      <HomeStack.Screen name="メールで登録">
        {(props) => <MailSignUpScreen {...props} type={"signup"} />}
      </HomeStack.Screen>
    </HomeStack.Navigator>
  );
}



// 「チャット」タブ
const ChatStack = createNativeStackNavigator();
function ChatStackScreen() {
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen name="ChatScreen" component={ChatScreen} />
    </ChatStack.Navigator>
  );
}




// // 「設定」タブ
// const SettingsStack = createNativeStackNavigator();
// function SettingsStackScreen() {
//   return (
//     <SettingsStack.Navigator>
//       <SettingsStack.Screen name="StartScreen" component={StartScreen} options={{ headerShown: false }} />
//       <SettingsStack.Screen name="新規登録" component={SignUpScreen} />
//       <SettingsStack.Screen name="メールで登録">
//       {(props) => <MailSignUpScreen {...props} type={"signup"} />}
//       </SettingsStack.Screen>
//     </SettingsStack.Navigator>
//   );
// }







const Tab = createBottomTabNavigator();

export default function App() {
  


  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen name="ホーム" component={HomeStackScreen} />
          <Tab.Screen name="チャット" component={ChatStackScreen} />
          {/* <Tab.Screen name="設定" component={SettingsStackScreen} /> */}
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
