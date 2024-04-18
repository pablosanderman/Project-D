import { StyleSheet, FlatList } from "react-native";

import { Text, View, Button } from "tamagui";
import { trpc } from "@/utils/trpc";
import { Link, router } from "expo-router";
import { $Enums } from "@prisma/client";

export default function HomeScreen() {
  const utils = trpc.useUtils();
  const query = trpc.booking.getMostRecentBooking.useQuery({ userId: 1 });
  let data: { userId: number; startTime: string; endTime: string; roomId: number; status: $Enums.BookingStatus; id: number; createdAt: string; updatedAt: string; };
  if(query.data) {
    data = query.data;
  }

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
      
      <Button size="$10" marginBottom={10} marginTop={0} height={250} width={350} backgroundColor="darkgrey">
        {query.data && (
        <FlatList data={[query.data]} renderItem={({ item }) => (
          <View>
            <Text style={styles.title}>Booking</Text>
            <Text >Room {data.roomId}</Text>
            <Text >Start: {data.startTime}</Text>
            <Text >End: {data.endTime}</Text>
          </View>
        )} 
        />
        )}</Button>
      <Button size="$7" backgroundColor="grey" width={350} onPress={() => router.push("/booking/")}>book a room</Button>
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