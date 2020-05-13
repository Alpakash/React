import React from 'react'
import Home from '../screens/Home'
import {useQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Splash from "../screens/Splash";
import Typography from "../screens/Typography";
import {createStackNavigator} from "@react-navigation/stack";
import Onboarding from "../screens/Onboarding/Onboarding";
import TabBar from "./TabBar";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const GET_TOKEN = gql`
    { 
        onboardingComplete @client 
        token @client
    }`;

const AppNavigation = () => {
    //@ts-ignore
    const { data: { onboardingComplete } } = useQuery(GET_TOKEN);
    return (
        <NavigationContainer>
            {!onboardingComplete && (
                <Stack.Navigator>
                    <Stack.Screen name="Onboarding" component={Onboarding}  options={{
                        headerShown: false
                    }}/>
                </Stack.Navigator>
            )}

            {onboardingComplete && (
                <Tab.Navigator
                    tabBar={props => <TabBar {...props}/>}
                    backBehavior={"none"}
                    tabBarOptions={{"showIcon": true}}
                >
                    <Tab.Screen
                        name={"Home"}
                        component={Home}
                        options={{
                            tabBarLabel: "Homie",
                            tabBarIcon: ({color, size, style}: any) => (
                                <MaterialCommunityIcons name={"home"} color={color} size={size} style={style}/>
                            )
                        }}/>
                    <Tab.Screen
                        name={"Splash"}
                        component={Splash}
                        options={{
                            tabBarLabel: "Splash",
                            tabBarIcon: ({color, size, style}: any) => (
                                <MaterialCommunityIcons name={"image-filter-vintage"} color={color}
                                                        style={style}
                                                        size={size}/>
                            )
                        }}/>

                    <Tab.Screen
                        name={"Typography"}
                        component={Typography}
                        options={{
                            tabBarLabel: "Typography",
                            tabBarIcon: ({color, size, style}: any) => (
                                <MaterialCommunityIcons name={"pen"} color={color} style={style} size={size}/>
                            )
                        }}/>
                </Tab.Navigator>
            )}
        </NavigationContainer>
    )
};

export default AppNavigation
