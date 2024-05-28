import { trpc } from "@/utils/trpc";
import { httpBatchLink } from "@trpc/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import "react-native-gesture-handler";

import { SplashScreen, Stack } from "expo-router";

import { useColorScheme } from "react-native";

import { TamaguiProvider, PortalProvider } from "tamagui";
import { tamaguiConfig } from "../tamagui.config";
import { useFonts } from "expo-font";
import { useEffect } from "react";

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

  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme!}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>
            <PortalProvider>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              </Stack>
            </PortalProvider>
          </QueryClientProvider>
        </trpc.Provider>
      </ThemeProvider>
    </TamaguiProvider>
  );
}
