import { StyleSheet } from "react-native";
import { Text, View, Button } from "tamagui";
import { trpc } from "@/utils/trpc";
import { router } from "expo-router";
import { $Enums } from "@prisma/client";
import { Converter } from "@/utils/converter";

export default function HomeScreen() {
  const utils = trpc.useUtils();

  const query = trpc.booking.getMostRecentBooking.useQuery({ userId: 1 });
  let data: {
    userId: number;
    startTime: string;
    endTime: string;
    roomId: number;
    status: $Enums.BookingStatus;
    id: number;
    createdAt: string;
    updatedAt: string;
  } = {
    userId: 0,
    startTime: "",
    endTime: "",
    roomId: 0,
    status: "UPCOMING",
    id: 0,
    createdAt: "",
    updatedAt: "",
  };
  if (query.data) {
    data = query.data;
  }

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

    if (rooms === undefined || bookings === undefined) return;

    //filter rooms that are not booked at the desired time
    const availableRooms = rooms.filter((room) => {
      const overlappingBooking = bookings.find(
        (booking) => booking.roomId === room.id,
        // booking.startTime < new Date().toISOString() &&
        // booking.endTime > new Date().toISOString()
      );
      return !overlappingBooking;
    });

    if (availableRooms.length === 0) {
      console.log("No rooms available");
      return;
    } else if (availableRooms.length > 1) {
      console.log("log test");
      mutation.mutate({
        userId: 1,
        startTime: new Date().toISOString(),
        endTime: new Date().toISOString(),
        roomId: availableRooms[0].id,
        status: "UPCOMING",
      });
    }
  };

  const dateString = data.startTime;
  const enddatesString = data.endTime;
  const startTime = Converter.formatDate(dateString);
  const endTime = Converter.formatDate(enddatesString);

  return (
    <View style={{}}>
      <Button
        size="$10"
        elevation={"$6"}
        shadowColor={"black"}
        padding={"none"}
        marginBottom={10}
        marginTop={0}
        marginLeft={10}
        height={200}
        width={350}
        backgroundColor="darkgrey"
      >
        <View justifyContent="center">
          <View>
            <Text style={styles.title}>Booking</Text>
            <Text width={75}>Room {data?.roomId}</Text>
          </View>
          <View>
            <Text>Start: {startTime}</Text>
            <Text>End: {endTime}</Text>
          </View>
        </View>
      </Button>
      <Button
        size="$7"
        backgroundColor="grey"
        width={350}
        shadowColor={"$orange2Dark"}
        shadowOpacity={80}
        elevation={"$6"}
        marginLeft={10}
        onPress={() => router.push("/booking/")}
      >
        book a room
      </Button>
      <Button onPress={() => router.push("/navigation/")}>Navigation</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
