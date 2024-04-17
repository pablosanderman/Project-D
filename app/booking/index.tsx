import { Text, View, XStack, Button } from "tamagui";
import { useNavigation, useRouter } from "expo-router";
import { useLayoutEffect } from "react";

export default function Booking() {
  const options = [
    {
      name: "Meeting room",
      href: "/booking/two",
    },
    {
      name: "Concentration room",
      href: "/booking/two",
    },
    {
      name: "Desk",
      href: "/booking/two",
    },
  ];

  const router = useRouter();

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Book a room",
    });
  }, [navigation]);

  return (
    <View marginTop={"$8"} paddingHorizontal={"$2"}>
      <XStack flexWrap="wrap">
        {options.map((option, index) => (
          <View key={index} width={"50%"}>
            <Button
              onPress={() => router.push(option.href)}
              size={"$10"}
              paddingHorizontal={"$2"}
              margin={3}
              borderRadius={"$4"}
            >
              <Text textAlign="center">{option.name}</Text>
            </Button>
          </View>
        ))}
      </XStack>
    </View>
  );
}
