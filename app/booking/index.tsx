import { View } from "tamagui";
import { Href, useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import NavigationSelection from "@/components/NavigationSelection";

export default function Booking() {
  const options = [
    {
      text: "Meeting room",
      href: {
        pathname: "/booking/two" as Href<string>,
        params: { roomType: "MEETING" },
      },
    },
    {
      text: "Focus room",
      href: {
        pathname: "/booking/two" as Href<string>,
        params: { roomType: "FOCUS" },
      },
    },
    {
      text: "Desk",
      href: {
        pathname: "/booking/two" as Href<string>,
        params: { roomType: "DESK" },
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
