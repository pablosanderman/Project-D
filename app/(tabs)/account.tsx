import { StyleSheet } from "react-native";
import { trpc } from "@/utils/trpc";
import { Text, Button, View } from "tamagui";
import { Settings, Info } from "@tamagui/lucide-icons";

export default function AccountScreen() {
  const user = trpc.user.get.useQuery(1);
  return (
    <View style={styles.container}>
      <Text style={styles.separator}></Text>
      {user.data && (
        <View>
          <Text style={styles.title}>{user.data.name?.split(" ")[0]}</Text>
          <Text style={styles.title}>{user.data.name?.split(" ")[1]}</Text>
        </View>
      )}
      <View gap={"$3"}>
        <Button>
          <Settings></Settings>Settings
        </Button>
        <Button>
          <Info></Info>About the app
        </Button>
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
