import { Button, FlatList, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { trpc } from "@/utils/trpc";

export default function TabTwoScreen() {
  const query = trpc.booking.get.useQuery({ userId: 1 });

  return (
    <View style={styles.container}>
      <Text style={styles.separator}></Text>
      <Text style={styles.title}>Your booking</Text>
      {query.data && (
        <View>
          <FlatList
            data={query.data}
            renderItem={({ item }) => (
              <View style={styles.container}>
                <Text>Booking no. {item.id}</Text>
                <Text>Kamer {item.roomId}</Text>
                <Text>Start: {formatDate(item.startTime)}</Text>
                <Text>Eindigt: {formatDate(item.endTime)}</Text>
                <Text>Booking status: {item.status}</Text>
                <View style={styles.separator}></View>
              </View>
            )}
          />
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
