import { Slot, Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        "SpaceMono-Regular": require("../assets/fonts/SpaceMono-Regular.ttf"),
    });

    useEffect(() => {
        if (fontsLoaded) {
          SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);
    
    if (!fontsLoaded) {
        return null;
    }

    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false}} />
        </Stack>
    );
    
}
