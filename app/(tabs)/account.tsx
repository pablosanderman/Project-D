import { Button, FlatList, StyleSheet } from "react-native";

import { trpc } from "@/utils/trpc";
import { router } from "expo-router";
import { Text, View } from "tamagui";

export default function AccountScreen() {
  const user = trpc.user.get.useQuery(1);

  return (
    <View style={styles.container}>
      <Text style={styles.separator}></Text>
      {user.data && <Text style={styles.title}>{user.data.name}</Text>}
      <View>
        <Button title="Log in" onPress={() => {router.push("./LoginScreen")}} />
      </View>
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
