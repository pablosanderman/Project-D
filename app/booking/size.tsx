import { View } from "tamagui";
import { useLocalSearchParams, useNavigation } from "expo-router";
import NavigationSelection from "@/components/NavigationSelection";
import { useLayoutEffect } from "react";

import { Text } from "tamagui";

export default function RoomSize() {
  const { roomType } = useLocalSearchParams<{ roomType: string }>();

  const options = [
    {
      text: "1-2 people",
      href: {
        pathname: "/booking/datetime",
        params: { roomType: roomType as string, roomSize: "ONE_TO_TWO" },
      },
    },
    {
      text: "2-4 people",
      href: {
        pathname: "/booking/datetime",
        params: { roomType: roomType as string, roomSize: "TWO_TO_FOUR" },
      },
    },
    {
      text: "4-8 people",
      href: {
        pathname: "/booking/datetime",
        params: { roomType: roomType as string, roomSize: "FOUR_TO_EIGHT" },
      },
    },
    {
      text: "8-16 people",
      href: {
        pathname: "/booking/datetime",
        params: { roomType: roomType as string, roomSize: "EIGHT_TO_SIXTEEN" },
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
      <NavigationSelection options={options} />
    </View>
  );
}
