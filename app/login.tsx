import { trpc } from "@/utils/trpc";
import { router, useNavigation } from "expo-router";
import React, { useLayoutEffect, useState } from "react";
import { Input, View, Text, XStack } from "tamagui";
import { AuthContext } from "./_layout";
import Card from "@/components/Card";
import Button from "@/components/Button";

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
    <View rowGap="$2" m="$10">
      <Card rowGap="$2">
        <Text fontWeight={"bold"} fontSize={20} mb="$2">
          Log in
        </Text>
        <Input placeholder="Email" onChangeText={setEmail} />
        <Input
          secureTextEntry={true}
          placeholder="Password"
          onChangeText={setPassword}
        />
      </Card>

      <XStack flex={1} justifyContent="space-between">
        <Button
          width={"49%"}
          onPress={() => {
            router.push("/signup");
          }}
        >
          Sign up
        </Button>
        <Button
          width={"49%"}
          onPress={() => {
            setUserId(query.data!.id);
          }}
        >
          Log in
        </Button>
      </XStack>
    </View>
  );
}
