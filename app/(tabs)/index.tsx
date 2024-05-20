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

  const fetchRooms = trpc.room.getRooms.useQuery();
  const fetchBookings = trpc.booking.get.useQuery({ userId: 1, filter: {} });

  const createBooking = async () => {
    console.log("createBooking");
    const rooms = fetchRooms.data; 
    const bookings = fetchBookings.data;

    if (rooms === undefined || bookings === undefined) return

    //filter rooms that are not booked at the desired time
    const availableRooms = rooms.filter(room => {
      const overlappingBooking = bookings.find(booking =>
        booking.roomId === room.id
        // booking.startTime < new Date().toISOString() &&
        // booking.endTime > new Date().toISOString()
      );
      return !overlappingBooking;
    });

    if (availableRooms.length === 0) {
      console.log("No rooms available");
      return;
    }

    else if (availableRooms.length > 1) {
    console.log("log test")
    mutation.mutate({
      userId: 1,
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      roomId: availableRooms[0].id,
      status: "UPCOMING",
      });
    };
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Project D</Text>
      <View
        style={styles.separator}
        // lightColor="#eee"
        // darkColor="rgba(255,255,255,0.1)"
      />
      <Link href="/booking/">Booking</Link>
      <Button onPress={() => router.push("/booking/")}>Book a room</Button>
      <Text>Hello World!</Text>
      <Button onPress={createBooking}>AAA</Button> 
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

