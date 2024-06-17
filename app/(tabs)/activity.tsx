import { trpc } from "@/utils/trpc";
import { useContext, useState } from "react";
import { Text, View, XStack, YStack } from "tamagui";
import { AuthContext } from "../_layout";
import { Converter } from "@/utils/converter";
import Card from "@/components/Card";
import Button from "@/components/Button";

export default function ActivityScreen() {
  const { userId } = useContext(AuthContext);

  const query = trpc.booking.get.useQuery({ userId: userId });

  const time = new Date();
  time.setHours(time.getHours() + 8);

  const timeBack = new Date();
  timeBack.setHours(timeBack.getHours() - 8);

  const [statusFilter, setStatusFilter] = useState("ALL");

  return (
    <View mt="$4" mx="$2">
      <View>
        <XStack width={"100%"} flex={1} justifyContent="space-between">
          <Button
            width={"33%"}
            onPress={() => setStatusFilter("ALL")}
            backgroundColor={statusFilter === "ALL" ? "$gray8" : "$background"}
          >
            All
          </Button>
          <Button
            width={"33%"}
            onPress={() => setStatusFilter("IN_PROGRESS")}
            backgroundColor={
              statusFilter === "IN_PROGRESS" ? "$gray8" : "$background"
            }
          >
            Active
          </Button>
          <Button
            width={"33%"}
            onPress={() => setStatusFilter("UPCOMING")}
            backgroundColor={
              statusFilter === "UPCOMING" ? "$gray8" : "$background"
            }
          >
            Upcoming
          </Button>
        </XStack>
      </View>
      <View mt="$10">
        <YStack width={"100%"} gap="$2">
          {query.data
            ?.filter(
              (booking) =>
                booking.status === statusFilter || statusFilter === "ALL",
            )
            .map((booking) => (
              <Card borderRadius={"$4"} key={booking.id}>
                <Text>Room {booking.room.name}</Text>
                <Text>
                  At{" "}
                  <Text fontWeight={"bold"}>
                    {Converter.formatFromTimeToTime(
                      booking.startTime,
                      booking.endTime,
                    )}
                  </Text>{" "}
                  on{" "}
                  <Text fontWeight={"bold"}>
                    {Converter.formatDate(booking.startTime)}
                  </Text>
                </Text>
                <Text>
                  Status: {Converter.convertBookingStatus(booking.status)}
                </Text>
                <Text>
                  Booked by:{" "}
                  {booking.userId === userId
                    ? "You"
                    : booking.user.name + " " + booking.user.surname}
                </Text>
              </Card>
            ))}
        </YStack>
      </View>

      {query.isLoading && query.isFetching && <Text>Loading...</Text>}
      {query.error && <Text>Something went wrong! {query.error.message}</Text>}
    </View>
  );
}
