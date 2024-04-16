import { Button, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { trpc } from "@/utils/trpc";
import { CardDemo } from "@/components/CardDemo";
import { Link } from "expo-router";

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
    <View style={styles.container}>
      <Text style={styles.title}>Project D</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Link href="/booking/">Booking</Link>
      {/* <CardDemo /> */}
      <Text>Hello World!</Text>
      <Button onPress={createBooking} title="AAA" />
      {mutation.error && (
        <Text>Something went wrong! {mutation.error.message}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
