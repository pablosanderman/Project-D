import { FlatList, StyleSheet } from "react-native";

import { trpc } from "@/utils/trpc";
import { useState } from "react";
import {
  ListItem,
  Button,
  Separator,
  XStack,
  YGroup,
  styled,
  Text,
  View,
} from "tamagui";

export default function ActivityScreen() {
  const query = trpc.booking.get.useQuery({ userId: 1, filter: {} });


  return (
    <View style={styles.container}>
      {query.data && (
        <View>
          <View>
            <XStack>
              <Button width={"30%"} paddingHorizontal={0}>PAST</Button>
              <Button width={"30%"} paddingHorizontal={0}>ACTIVE</Button>
              <Button width={"30%"} paddingHorizontal={0}>UPCOMING</Button>
            </XStack>
          </View>
          <XStack>
            <YGroup width={"95%"} maxHeight={"95%"}>
              <FlatList
                data={query.data}
                
                renderItem={({ item }) => (
                  <YGroup.Item>
                    <ListItem
                      title={"Booking no." + item.id}
                      marginBottom={"$2"}
                      backgroundColor={"grey"}
                    >
                      <Separator />
                      <Text>Kamer {item.roomId}</Text>
                      <Text>Start: {formatDate(item.startTime)}</Text>
                      <Text>Eindigt: {formatDate(item.endTime)}</Text>
                      <Text>Status van de boeking: {item.status}</Text>
                      <Text>Geboekt door: {item.user.name}</Text>
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

const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const formattedDate = date.toLocaleString("nl-NL", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  return formattedDate;
};

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
