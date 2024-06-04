import { trpc } from "@/utils/trpc";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Input } from "tamagui";

export default function LoginScreen() {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isMatch, setIsMatch] = useState(true);
  const [password, setPassword] = useState("");
  const [saveUser, setSaveUser] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  const handleConfirmPasswordChange = (_password: string) => {
    setConfirmPassword(_password);
  };
  const mutation = trpc.user.create.useMutation({});
  const createUser = async (Password: string, Name: string, Email:string, Surname: string) => {
    await mutation.mutateAsync({
      password: Password,
      name: Name,
      email: Email,
      surname: Surname,
    });
  };

  useEffect(() => {
    setIsMatch(password === confirmPassword);
  }, [password, confirmPassword]);

  return (
    <View style={styles.container}>
      <View style={styles.popup}>
        <Text style={styles.text}>Sign up</Text>
        <View style={styles.row}>
          <Input style={styles.side} onChangeText={setName} placeholder="Name" />
          <Input style={styles.side} onChangeText={setSurname}placeholder="Surname" />
        </View>
        <Input style={styles.fields} placeholder="Email" />
        <Input
          style={isMatch ? styles.fields : styles.errorfields}
          secureTextEntry={true}
          onChangeText={handlePasswordChange}
          placeholder="Password"
        />
        <Input
          style={isMatch ? styles.fields : styles.errorfields}
          secureTextEntry={true}
          onChangeText={handleConfirmPasswordChange}
          placeholder="Confirm Password"
        />
        <Text style={styles.ErrorMessages}>
          {isMatch ? "" : "Please ensure both passwords are identical."}
        </Text>
        <Button
          style={styles.signup}
          onPress={() => {
            setSaveUser(true);
            createUser(password, name, email, surname);
            setSaveUser(false);
          }}
          backgroundColor={"darkgray"}
        >
          {" "}
          Sign up
        </Button>
      </View>
      <Text style={styles.askers}> Already have an account?</Text>
      <View style={styles.buttons}>
        <Button
          onPress={() => {
            router.push("./LoginScreen");
          }}
          backgroundColor={"darkgray"}
        >
          {" "}
          login
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
  signup: {
    width: 120,
    marginLeft: 65,
  },
  askers: {
    fontSize: 12,
  },
  side: {
    width: 100,
    marginLeft: 10,
  },
  row: {
    flexDirection: "row",
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
    width: 250,
    height: 325,
  },
  text: {
    fontSize: 20,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: "bold",
  },
  fields: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    paddingBottom: 10,
  },
  errorfields: {
    backgroundColor: "red",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    paddingBottom: 10,
  },
  ErrorMessages: {
    color: "red",
    fontSize: 10,
    textAlign: "center",
  },
});
