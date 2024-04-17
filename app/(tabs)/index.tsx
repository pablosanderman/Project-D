import { StyleSheet } from "react-native";

import { Text, View, Button } from "tamagui";
import { trpc } from "@/utils/trpc";
import { Link, router } from "expo-router";

export default function HomeScreen() {
  const utils = trpc.useUtils();

  const mutation = trpc.booking.create.useMutation({
    onSuccess(input) {
      utils.booking.invalidate();
    },
  });
  const createBooking = () => {
    mutation.mutate({
      userId: 1,
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      roomId: 1,
      status: "UPCOMING",
    });
  };
  return (
    <View alignItems="center">
      <View
        // lightColor="#eee"
        // darkColor="rgba(255,255,255,0.1)"
      />
      <Button size="$10" marginBottom={10} marginTop={0} height={250} width={350} backgroundColor="darkgrey">hello</Button>
      <Button size="$7" backgroundColor="grey" width={350} onPress={() => router.push("/booking/")}>Book a room</Button>
    </View>
  );
}
