import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';


interface TabIconProps {
    icon: any;
    color: string;
    focused: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({ icon, color, focused }) => {
    return (
        <View>
            {/* <Image 
                source={icon}
            /> */}
            <Ionicons name={icon} size={24} color={color} />
        </View>
    )
}

const TabsLayout = () => {
    return (
        <>
            <Tabs>
                <Tabs.Screen 
                    name="home" 
                    options={{
                        title: 'Home',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => ( 
                            <TabIcon
                                icon="home"
                                color={color}
                                focused={focused}
                            />
                        )
                    }}
                />

                <Tabs.Screen 
                    name="categories" 
                    options={{
                        title: 'Categories',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => ( 
                            <TabIcon
                                icon="pricetags"
                                color={color}
                                focused={focused}
                            />
                        )
                    }}
                />

                <Tabs.Screen 
                    name="entries" 
                    options={{
                        title: 'Entries',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => ( 
                            <TabIcon
                                icon="list"
                                color={color}
                                focused={focused}
                            />
                        )
                    }}
                />
            </Tabs>
        </>
    )
}

export default TabsLayout