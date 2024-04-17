import { Button, FlatList, StyleSheet } from "react-native";

import { Text, View } from "tamagui";
import { trpc } from "@/utils/trpc";
import { ListItem, XStack, YGroup, Separator } from "tamagui";

export default function ActivityScreen() {
  const query = trpc.booking.get.useQuery({
    userId: 1,
    filter: { RoomType: "MEETING" },
  });

  return (
    <View style={styles.container}>
      {query.data && (
        <XStack elevation={1} flex={1} flexWrap="wrap">
          <FlatList
            data={query.data}
            renderItem={({ item }) => (
              <ListItem
                title={"Booking no." + item.id}
                alignSelf="center"
                backgroundColor={"grey"}
                marginBottom={"$2"}
                width={"95%"}
                borderRadius={"$2"}
                borderCurve="continuous"
              >
                <Separator />
                <Text>Kamer {item.roomId}</Text>
                <Text>Starts: {formatDate(item.startTime)}</Text>
                <Text>Ends: {formatDate(item.endTime)}</Text>
                <Text>Status: {item.status}</Text>
                <Text>Booked by: {item.user.name}</Text>
              </ListItem>
            )}
          />
        </XStack>
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
