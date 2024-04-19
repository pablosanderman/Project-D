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
        pathname: "/booking/confirmation" as Href<string>,
        params: { roomType: roomType, size: "ONE_TO_TWO" },
      },
    },
    {
      text: "2-4 people",
      href: {
        pathname: "/booking/confirmation" as Href<string>,
        params: { roomType: roomType, size: "TWO_TO_FOUR" },
      },
    },
    {
      text: "4-8 people",
      href: {
        pathname: "/booking/confirmation" as Href<string>,
        params: { roomType: roomType, size: "FOUR_TO_EIGHT" },
      },
    },
    {
      text: "8-16 people",
      href: {
        pathname: "/booking/confirmation" as Href<string>,
        params: { roomType: roomType, size: "EIGHT_TO_SIXTEEN" },
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
