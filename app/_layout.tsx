import { trpc } from "@/utils/trpc";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";

import { Stack } from "expo-router";

import { useColorScheme } from "react-native";

import { loadAsync } from "expo-font";
import { createContext, useEffect, useState } from "react";
import { TamaguiProvider } from "tamagui";
import { tamaguiConfig } from "../tamagui.config";

export const AuthContext = createContext({
  userId: 1,
  setUserId: (_: number) => {},
});

export default function RootLayout() {
  const queryClient = new QueryClient();
  const trpcClient = trpc.createClient({
    links: [
      httpBatchLink({
        url: process.env.EXPO_PUBLIC_SERVER_URL!,
      }),
    ],
  });

  const colorScheme = useColorScheme();

  const [userId, setUserId] = useState(1);
  const authContextValue = { userId, setUserId };

  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await loadAsync({
        Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
        InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme!}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>
            <AuthContext.Provider value={authContextValue}>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              </Stack>
            </AuthContext.Provider>
          </QueryClientProvider>
        </trpc.Provider>
      </ThemeProvider>
    </TamaguiProvider>
  );
}
