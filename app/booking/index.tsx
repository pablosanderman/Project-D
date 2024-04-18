import { View } from "tamagui";
import { useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import NavigationSelection from "@/components/NavigationSelection";

export default function Booking() {
  const options = [
    {
      text: "Meeting room",
      href: "/booking/two",
    },
    {
      text: "Focus room",
      href: "/booking/two",
    },
    {
      text: "Desk",
      href: "/booking/two",
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
