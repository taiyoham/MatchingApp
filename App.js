import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "./screens/home/HomeScreen";
import ChatScreen from "./screens/chat/ChatScreen";
import StartScreen from "./screens/settings/StartScreen";
import SignUpScreen from "./screens/settings/SignUpScreen";



// 「ホーム」タブ
const HomeStack = createNativeStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
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





// 「設定」タブ
const SettingsStack = createNativeStackNavigator();
function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="StartScreen" component={StartScreen} />
      <SettingsStack.Screen name="SignUpScreen" component={SignUpScreen} />
    </SettingsStack.Navigator>
  );
}





const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="ホーム" component={HomeStackScreen} />
        <Tab.Screen name="チャット" component={ChatStackScreen} />
        <Tab.Screen name="設定" component={SettingsStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
