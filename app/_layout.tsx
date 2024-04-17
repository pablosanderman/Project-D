// import FontAwesome from "@expo/vector-icons/FontAwesome";
// import {
//   DarkTheme,
//   DefaultTheme,
//   ThemeProvider,
// } from "@react-navigation/native";
// import { useFonts } from "expo-font";
// import { Stack } from "expo-router";
// import * as SplashScreen from "expo-splash-screen";
// import { useEffect, useState } from "react";
//
// import { useColorScheme } from "@/components/useColorScheme";
//
// import { TamaguiProvider } from "tamagui";
//
// import { tamaguiConfig } from "../tamagui.config";
//
// export {
//   // Catch any errors thrown by the Layout component.
//   ErrorBoundary,
// } from "expo-router";
//
// export const unstable_settings = {
//   // Ensure that reloading on `/modal` keeps a back button present.
//   initialRouteName: "(tabs)",
// };
//
// // Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();
//
// export default function RootLayout() {
//   const [loaded] = useFonts({
//     Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
//     InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
//   });
//
//   useEffect(() => {
//     if (loaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [loaded]);
//
//   if (!loaded) {
//     return null;
//   }
//   return <RootLayoutNav />;
// }
//
// function RootLayoutNav() {
//   const colorScheme = useColorScheme();
//
//   const queryClient = new QueryClient();
//   const trpcClient = trpc.createClient({
//     links: [
//       httpBatchLink({
//         url: process.env.EXPO_PUBLIC_SERVER_URL!, // TODO: use enviornment variable
//       }),
//     ],
//   });
//
//   return (
//     <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme!}>
//       <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
//         <trpc.Provider client={trpcClient} queryClient={queryClient}>
//           <QueryClientProvider client={queryClient}>
//             <Stack>
//               <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//               <Stack.Screen name="modal" options={{ presentation: "modal" }} />
//             </Stack>
//           </QueryClientProvider>
//         </trpc.Provider>
//       </ThemeProvider>
//     </TamaguiProvider>
//   );
// }

import { trpc } from "@/utils/trpc";
import { httpBatchLink } from "@trpc/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

import { SplashScreen, Stack } from "expo-router";

import { useColorScheme } from "react-native";

import { TamaguiProvider } from "tamagui";
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
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="modal" options={{ presentation: "modal" }} />
            </Stack>
          </QueryClientProvider>
        </trpc.Provider>
      </ThemeProvider>
    </TamaguiProvider>
  );
}
