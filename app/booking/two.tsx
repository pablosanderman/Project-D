import { Text, View, Card, Button, XStack } from "tamagui";
import { useRouter } from "expo-router";

export default function Two() {
  const options = [
    {
      name: "1-2 people",
      href: "/booking/two",
    },
    {
      name: "2-4 people",
      href: "/booking/two",
    },
    {
      name: "4-8 people",
      href: "/booking/two",
    },
    {
      name: "8-16 people",
      href: "/booking/two",
    },
  ];

  const router = useRouter();

  return (
    <View marginTop={"$8"} paddingHorizontal={"$2"}>
      <XStack flexWrap="wrap">
        {options.map((option, index) => (
          <View key={index} width={"50%"}>
            <Button
              onPress={() => router.push(option.href)}
              size={"$10"}
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
