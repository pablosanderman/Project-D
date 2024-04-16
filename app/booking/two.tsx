import { Text, View } from "@/components/Themed";
import { useRouter } from "expo-router";
import { Card, XStack, YStack } from "tamagui";

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
    <View>
      <Text>Book a room</Text>
      {options.map((option, index) => (
        <Card onPress={() => router.push(option.href)} key={index}>
          <Text>{option.name}</Text>
        </Card>
      ))}
    </View>
  );
}
