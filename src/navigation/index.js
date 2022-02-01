import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../screens/Home';
import {StyleSheet, View} from 'react-native';
const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => {
          return {
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
              borderTopWidth: 0,
              height: 70,
              backgroundColor: '#21263E',
            },
            tabBarBackground: () => (
              <View
                style={{
                  backgroundColor: '#242B49',
                  flex: 1,
                  borderTopLeftRadius: 28,
                  borderTopRightRadius: 28,
                }}
              />
            ),
            tabBarIcon: props => {
              switch (route.name) {
                case 'Home':
                  return (
                    <View
                      style={{
                        backgroundColor: props.focused ? '#1B203B' : undefined,
                        ...styles.tabIconContainer,
                      }}>
                      <Foundation name="home" size={30} color="#6E7C84" />
                    </View>
                  );
                case 'Pokemon':
                  return (
                    <View
                      style={{
                        backgroundColor: props.focused ? '#1B203B' : undefined,
                        ...styles.tabIconContainer,
                      }}>
                      <MaterialCommunityIcons
                        name="pokemon-go"
                        size={32}
                        color="#6E7C84"
                      />
                    </View>
                  );
                case 'Messages':
                  return (
                    <View
                      style={{
                        backgroundColor: props.focused ? '#1B203B' : undefined,
                        ...styles.tabIconContainer,
                      }}>
                      <MaterialIcons name="message" size={26} color="#6E7C84" />
                    </View>
                  );
              }
            },
          };
        }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Pokemon" component={HomeScreen} />
        <Tab.Screen name="Messages" component={HomeScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabIconContainer: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 48 / 2,
  },
});
