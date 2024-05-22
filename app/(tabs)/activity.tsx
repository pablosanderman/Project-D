import { FlatList } from "react-native";

import { trpc } from "@/utils/trpc";
import {
  Button,
  ListItem,
  Separator,
  Text,
  View,
  XStack,
  YGroup,
  styled,
} from "tamagui";

import { AppRouter } from "@/server";
import { Converter } from "@/utils/converter";
import { inferRouterOutputs } from "@trpc/server";
import { useState } from "react";

export default function ActivityScreen() {
  const [filterState, setFilterState] = useState({ userId: 1, filter: {} });
  const query = trpc.booking.get.useQuery(filterState);
  type routerOutput = inferRouterOutputs<AppRouter>;
  type bookingGetOutput = routerOutput["booking"]["get"][0];
  // const [filterState, setFilterState] = useState<any>(noFilter);
  // function noFilter(item: bookingGetOutput): boolean {
  //   return true;
  // }
  // function setFilterPast() {
  //   setFilterState(FilterPast);
  // }
  // function FilterPast(item: bookingGetOutput): Boolean {r
  //   return new Date(item.startTime) < new Date();
  // }
  const time = new Date();
  time.setHours(time.getHours() + 8);

  const timeBack = new Date();
  timeBack.setHours(timeBack.getHours() - 8);

  return (
    <StyledContainer>
      {query.data && (
        <View>
          <View>
            <XStack gap={"$3"}>
              <Button
                width={"30%"}
                paddingHorizontal={10}
                onPress={() =>
                  setFilterState((prev) => ({
                    ...prev,
                    filter: {
                      startDate: new Date(0).toISOString(),
                      endDate: timeBack.toISOString(),
                    },
                  }))
                }
              >
                PAST
              </Button>
              <Button
                width={"30%"}
                paddingHorizontal={0}
                onPress={() =>
                  setFilterState((prev) => ({
                    ...prev,
                    filter: {
                      startDate: new Date().toISOString(),
                      endDate: time.toISOString(),
                    },
                  }))
                }
              >
                ACTIVE
              </Button>
              <Button
                width={"30%"}
                paddingHorizontal={0}
                onPress={() =>
                  setFilterState((prev) => ({
                    ...prev,
                    filter: { startDate: new Date().toISOString() },
                  }))
                }
              >
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
                      <StyledSeparator />
                      <Text>Room {item.roomId}</Text>
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

      {query.isLoading && query.isFetching && <Text>Loading...</Text>}
      {query.error && <Text>Something went wrong! {query.error.message}</Text>}
    </StyledContainer>
  );
}

const StyledContainer = styled(View, {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
});

const StyledSeparator = styled(Separator, {
  marginVertical: "$2",
  height: 1,
  width: "80%",
});
