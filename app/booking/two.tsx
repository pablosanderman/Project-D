import { View } from "tamagui";
import { Href, useLocalSearchParams, useNavigation } from "expo-router";
import NavigationSelection from "@/components/NavigationSelection";
import { useLayoutEffect } from "react";

import { Text } from "tamagui";

export default function Two() {
  const { roomType } = useLocalSearchParams<{ roomType: string }>();

  const options = [
    {
      text: "1-2 people",
      href: {
        pathname: "/booking/two" as Href<string>,
        params: { roomType: roomType, people: "1-2" },
      },
    },
    {
      text: "2-4 people",
      href: {
        pathname: "/booking/two" as Href<string>,
        params: { roomType: roomType, people: "2-4" },
      },
    },
    {
      text: "4-8 people",
      href: {
        pathname: "/booking/two" as Href<string>,
        params: { roomType: roomType, people: "4-8" },
      },
    },
    {
      text: "8-16 people",
      href: {
        pathname: "/booking/two" as Href<string>,
        params: { roomType: roomType, people: "8-16" },
      },
    },
  ];

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Book a room",
    });
  }, [navigation]);

  return (
    <View marginTop={"$8"} paddingHorizontal={"$2"}>
      <Text>room type: {roomType}</Text>
      <NavigationSelection options={options} />
    </View>
  );
}
