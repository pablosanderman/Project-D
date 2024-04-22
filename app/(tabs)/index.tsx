import { StyleSheet, FlatList } from "react-native";

import { Text, View, Button } from "tamagui";
import { trpc } from "@/utils/trpc";
import { Link, router } from "expo-router";
import { $Enums } from "@prisma/client";
import { formatDate } from "@/utils/converters";
import { AlignCenter } from "@tamagui/lucide-icons";

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
  //   // Function to split the string into month and day
  //   function splitDate(dateString: string): { month: number, day: number } {
  //     const date = new Date(dateString);
  //     const month = date.getMonth() + 1; // Months are zero-based, so we add 1
  //     const day = date.getDate();
  //     return { month, day };
  // }

  // // Function to extract hours and minutes
  //   function extractTime(dateString: string): { hours: number, minutes: number } {
  //     const date = new Date(dateString);
  //     const hours = date.getHours();
  //     const minutes = date.getMinutes();
  //     return { hours, minutes };
  //   }

  const dateString = data.startTime;
  const enddatesString = data.endTime;
  const startTime = formatDate(dateString, "nl-NL");
  const endTime = formatDate(enddatesString, "nl-NL");
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
