import { AuthContext } from "../_layout";
import { Button, Text, View } from "tamagui";
import { Compass } from "@tamagui/lucide-icons";
import { Converter } from "@/utils/converter";
import { prettyRoomType } from "@/utils/prettyRoomType";
import { router } from "expo-router";
import { trpc } from "@/utils/trpc";
import { useContext } from "react";

export default function HomeScreen() {
  const { userId } = useContext(AuthContext);

  const query = trpc.booking.get.useQuery({
    userId: userId,
    filter: { status: "UPCOMING" },
  });

  return (
    <View rowGap="$2">
      {query.data?.map((booking) => (
        <View
          key={booking.id}
          backgroundColor={"$gray3Dark"}
          borderRadius={"$6"}
          height={"$12"}
          p="$4"
        >
          <Text>
            {prettyRoomType(booking.room.type)} {booking.room.name}
          </Text>
          <Text>
            {Converter.formatTime(booking.startTime)}-
            {Converter.formatTime(booking.endTime)}
          </Text>
          <Button
            position="absolute"
            bottom="$2"
            right="$2"
            backgroundColor={"$gray9"}
            height={"$4"}
            width={"$4"}
            borderRadius={9999}
            onPress={() =>
              router.push({
                pathname: "/navigation",
                params: { roomId: booking.roomId },
              })
            }
          >
            <Compass />
          </Button>
        </View>
      ))}
      <Button onPress={() => router.push("/booking/")}>Book a room</Button>
    </View>
  );
}
