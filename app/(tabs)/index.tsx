import { StyleSheet } from "react-native";
import { Text, View, Button } from "tamagui";
import { trpc } from "@/utils/trpc";
import { router } from "expo-router";
import { $Enums } from "@prisma/client";
import { Converter } from "@/utils/converter";

export default function HomeScreen() {
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
            <Text width={75}>Room {data.roomId}</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
