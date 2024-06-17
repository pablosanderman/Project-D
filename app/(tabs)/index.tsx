import { AuthContext } from "../_layout";
import { Button, Text, View } from "tamagui";
import { Compass } from "@tamagui/lucide-icons";
import { Converter } from "@/utils/converter";
import { prettyRoomType } from "@/utils/prettyRoomType";
import { router } from "expo-router";
import { trpc } from "@/utils/trpc";
import { useContext } from "react";
import Card from "@/components/Card";

export default function HomeScreen() {
  const { userId } = useContext(AuthContext);

  const query = trpc.booking.get.useQuery(
    {
      userId: userId,
      filter: { status: "UPCOMING" },
    },
    { refetchOnMount: true },
  );

  return (
    <View rowGap="$2" mt="$4" mx="$2">
      {query.data?.slice(0, 1).map((booking) => (
        <Card height={"$12"} key={booking.id}>
          <Text marginBottom={"$1"}>
            <Text fontWeight={"bold"}>{prettyRoomType(booking.room.type)}</Text>{" "}
            {booking.room.name}
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
        </Card>
      ))}
      <Button onPress={() => router.push("/booking/")}>Book a room</Button>
    </View>
  );
}
