import { trpc } from "@/utils/trpc";
import { router, useNavigation } from "expo-router";
import React, { useEffect, useLayoutEffect, useState } from "react";
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
  const [Error, setError] = useState("");
  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Sign up",
    });
  }, [navigation]);

  const handleConfirmPasswordChange = (_password: string) => {
    setConfirmPassword(_password);
  };
  const mutation = trpc.user.create.useMutation({});
  const createUser = async (
    Password: string,
    Name: string,
    Email: string,
    Surname: string,
  ) => {
    try {
      await mutation.mutateAsync({
        password: Password,
        name: Name,
        email: Email,
        surname: Surname,
      });
    } catch (error) {
      setError(error as string);
    }
  };

  const [isFormValid, setIsFormValid] = useState(false);
  const utils = trpc.useUtils();
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    setIsMatch(password === confirmPassword);
    setIsFormValid(
      password !== "" &&
        name !== "" &&
        surname !== "" &&
        confirmPassword !== "",
    );
  }, [password, name, surname, confirmPassword]);

  return (
    <View style={styles.container}>
      <View style={styles.popup}>
        <Text style={styles.text}>Sign up</Text>
        <View style={styles.row}>
          <Input
            style={styles.side}
            onChangeText={setName}
            placeholder="Name"
          />
          <Input
            style={styles.side}
            onChangeText={setSurname}
            placeholder="Surname"
          />
        </View>
        <Input
          style={styles.fields}
          onChangeText={setEmail}
          placeholder="Email"
        />
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
        <Text style={isMatch ? styles.disappear : styles.ErrorMessages}>
          {isMatch ? "" : "Please ensure both passwords are identical."}
        </Text>
        <Text style={Error === "" ? styles.disappear : styles.ErrorMessages}>
          {Error === ""
            ? ""
            : "We encountered a problem trying to create your account, maybe it exists already?"}
        </Text>
        <View style={isMatch ? styles.signup : styles.nosignup}>
          <Button
            disabled={!isFormValid}
            onPress={() => {
              setSaveUser(true);
              createUser(password, name, email, surname);
              setSaveUser(false);
              setCounter(counter + 1);
            }}
            backgroundColor={"darkgray"}
          >
            Sign up
          </Button>
        </View>
      </View>
      <Text style={styles.askers}> Already have an account?</Text>
      <View style={styles.buttons}>
        <Button
          onPress={() => {
            router.push("./LoginScreen");
          }}
          backgroundColor={"darkgray"}
        >
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
  validsignup: {
    width: 120,
    marginLeft: 65,
    backgroundColor: "green",
  },
  disappear: {
    width: 0,
    height: 0,
  },
  signup: {
    borderRadius: 10,
    width: 120,
    marginTop: 10,
    marginLeft: 65,
    backgroundColor: "lightgray",
  },
  nosignup: {
    borderRadius: 10,
    width: 120,
    marginTop: 10,
    marginLeft: 65,
    backgroundColor: "red",
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
