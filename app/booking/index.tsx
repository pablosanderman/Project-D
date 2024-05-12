import { View } from "tamagui";
import { useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import NavigationSelection from "@/components/NavigationSelection";

export default function RoomType() {
  const options = [
    {
      text: "Meeting room",
      href: {
        pathname: "/booking/size",
        params: { roomType: "MEETING" },
      },
    },
    {
      text: "Focus room",
      href: {
        pathname: "/booking/size",
        params: { roomType: "FOCUS" },
      },
    },
    {
      text: "Desk",
      href: {
        pathname: "/booking/size",
        params: { roomType: "DESK" },
      },
    },
  ];

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Book a room",
      headerBackTitle: "Home",
    });
  }, [navigation]);

  return (
    <View marginTop={"$8"} paddingHorizontal={"$2"}>
      <NavigationSelection options={options} />
    </View>
  );
}
