import { View } from "tamagui";
import { useLocalSearchParams, useNavigation } from "expo-router";
import NavigationSelection from "@/components/NavigationSelection";
import { useLayoutEffect } from "react";

export default function RoomSize() {
  const { roomType } = useLocalSearchParams<{ roomType: string }>();

  const options = [
    {
      text: "1-2 people",
      href: {
        pathname: "/booking/datetime",
        params: { roomType: roomType as string, roomSize: "1" },
      },
    },
    {
      text: "2-4 people",
      href: {
        pathname: "/booking/datetime",
        params: { roomType: roomType as string, roomSize: "2" },
      },
    },
    {
      text: "4-8 people",
      href: {
        pathname: "/booking/datetime",
        params: { roomType: roomType as string, roomSize: "4" },
      },
    },
    {
      text: "8-16 people",
      href: {
        pathname: "/booking/datetime",
        params: { roomType: roomType as string, roomSize: "8" },
      },
    },
  ];

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Choose room size",
    });
  }, [navigation]);

  return (
    <View marginTop={"$8"} paddingHorizontal={"$2"}>
      <NavigationSelection options={options} />
    </View>
  );
}
