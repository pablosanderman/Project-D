import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Card, XStack, YStack, Text, View } from "tamagui";
import { styled } from "@tamagui/core";

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

  return (
    <View>
      <Text>Book a room</Text>
      <Col>
        {options.map((option, index) => (
          <Item onPress={() => router.push(option.href)} key={index}>
            <Text>{option.name}</Text>
          </Item>
        ))}
      </Col>
    </View>
  );
}

const Col = styled(View, {
  flex: 1,
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "flex-start",
});

const Item = styled(Card, {
  width: "50%",
});
