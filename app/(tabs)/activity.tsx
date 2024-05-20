import { FlatList, StyleSheet } from "react-native";

import { trpc } from "@/utils/trpc";
import { useState } from "react";
import type { CardProps } from "tamagui";
import {
  ListItem,
  Card,
  Button,
  Separator,
  XStack,
  YGroup,
  styled,
  Text,
  View,
  H2,
  Paragraph,
  Image,
} from "tamagui";

import { inferRouterOutputs } from "@trpc/server";
import { Converter } from "@/utils/converter";
import { AppRouter } from "@/server";

export default function ActivityScreen() {
  const query = trpc.booking.get.useQuery({ userId: 1, filter: {} });
  type routerOutput = inferRouterOutputs<AppRouter>;
  type bookingGetOutput = routerOutput["booking"]["get"][0];
  // const [filterState, setFilterState] = useState<any>(noFilter);
  // function noFilter(item: bookingGetOutput): boolean {
  //   return true;
  // }
  // function setFilterPast() {
  //   setFilterState(FilterPast);
  // }
  // function FilterPast(item: bookingGetOutput): Boolean {
  //   return new Date(item.startTime) < new Date();
  // }

  return (
    <View style={styles.container}>
      {query.data && (
        <View>
          <View>
            <XStack gap={"$3"}>
              <Button width={"30%"} paddingHorizontal={10}>
                PAST
              </Button>
              <Button width={"30%"} paddingHorizontal={0}>
                ACTIVE
              </Button>
              <Button width={"30%"} paddingHorizontal={0}>
                UPCOMING
              </Button>
            </XStack>
          </View>
          <XStack>
            <YGroup width={"97%"} maxHeight={"95%"}>
              <FlatList
                data={query.data.filter((item) => item)}
                renderItem={({ item }) => (
                  <YGroup.Item>
                    <ListItem
                      title={"Booking no." + item.id}
                      marginBottom={"$2"}
                      backgroundColor={"grey"}
                    >
                      <Separator />
                      <Text>Kamer {item.roomId}</Text>
                      <Text>
                        At{" "}
                        <Text fontWeight={"bold"}>
                          {Converter.formatFromTimeToTime(
                            item.startTime,
                            item.endTime
                          )}
                        </Text>{" "}
                        on{" "}
                        <Text fontWeight={"bold"}>
                          {Converter.formatDate(item.startTime)}
                        </Text>
                      </Text>
                      <Text>
                        Booking status:{" "}
                        {Converter.convertBookingStatus(item.status)}
                      </Text>
                      <Text>Booked by: {item.user.name}</Text>
                    </ListItem>
                  </YGroup.Item>
                )}
              />
            </YGroup>
          </XStack>
        </View>
      )}
      {query.error && <Text>Something went wrong! {query.error.message}</Text>}
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
