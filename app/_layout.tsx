import { Slot, Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { store } from "../store/store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

SplashScreen.preventAutoHideAsync();

// Create a QueryClient instance
const queryClient = new QueryClient();

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
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <Stack>
                    <Stack.Screen name="index" options={{ headerShown: false }} />
                </Stack>
            </QueryClientProvider>
        </Provider>
    );
    
}
