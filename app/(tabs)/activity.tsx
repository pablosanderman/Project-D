import { FlatList } from "react-native";

import { trpc } from "@/utils/trpc";
import { useContext } from "react";
import {
  Button,
  ListItem,
  Separator,
  Text,
  ToggleGroup,
  View,
  XStack,
  YGroup,
  styled,
} from "tamagui";
import { AuthContext } from "../_layout";

import { Converter } from "@/utils/converter";

export default function ActivityScreen() {
  const { userId } = useContext(AuthContext);

  const query = trpc.booking.get.useQuery({ userId: userId });

  const time = new Date();
  time.setHours(time.getHours() + 8);

  const timeBack = new Date();
  timeBack.setHours(timeBack.getHours() - 8);

  return (
    <View>
      {query.data && (
        <View>
          <ToggleGroup type={"single"} width={"100%"}>
            <ToggleGroup.Item value="left" aria-label="Left aligned">
              <Text>Past</Text>
            </ToggleGroup.Item>
            <ToggleGroup.Item value="center" aria-label="Center aligned">
              <Text>Active</Text>
            </ToggleGroup.Item>
            <ToggleGroup.Item value="right" aria-label="Right aligned">
              <Text>Upcoming</Text>
            </ToggleGroup.Item>
          </ToggleGroup>
          <XStack>
            <YGroup width={"100%"}>
              <FlatList
                data={query.data.filter((item) => item)}
                renderItem={({ item: booking }) => (
                  <YGroup.Item>
                    <View
                      backgroundColor={"$gray3Dark"}
                      borderRadius={"$6"}
                      p="$4"
                      mb="$2"
                    >
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
                      <Text>Booked by: {booking.user.name}</Text>
                    </View>
                  </YGroup.Item>
                )}
              />
            </YGroup>
          </XStack>
        </View>
      )}

      {query.isLoading && query.isFetching && <Text>Loading...</Text>}
      {query.error && <Text>Something went wrong! {query.error.message}</Text>}
    </View>
  );
}
