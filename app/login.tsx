import { trpc } from "@/utils/trpc";
import { router, useNavigation } from "expo-router";
import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Input } from "tamagui";
import { AuthContext } from "./_layout";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userId, setUserId } = React.useContext(AuthContext);
  const query = trpc.user.logIn.useQuery({ email, password });

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Log in",
      headerBackTitle: "Account",
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.popup}>
        <Text style={styles.text}>Login</Text>
        <Input
          style={styles.fields}
          placeholder="Email"
          onChangeText={setEmail}
        />
        <Input
          style={styles.fields}
          secureTextEntry={true}
          placeholder="Password"
          onChangeText={setPassword}
        />
      </View>

      <View style={styles.buttons}>
        <Button
          onPress={() => {
            router.push("/signup");
          }}
          backgroundColor={"darkgray"}
        >
          {" "}
          Sign up
        </Button>
        <Button
          onPress={() => {
            setUserId(query.data!.id);
          }}
          backgroundColor={"darkgray"}
        >
          {" "}
          Log in
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ecf0f1",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: 200,
    marginTop: 10,
  },
  popup: {
    backgroundColor: "white",
    borderRadius: 10,
    width: 200,
    height: 155,
  },
  text: {
    fontSize: 20,
    marginLeft: 10,
    marginTop: 10,
    fontWeight: "bold",
  },
  fields: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    paddingBottom: 10,
  },
});
