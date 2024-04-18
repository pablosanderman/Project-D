import { View } from "tamagui";
import { useNavigation } from "expo-router";
import NavigationSelection from "@/components/NavigationSelection";
import { useLayoutEffect } from "react";

export default function Two() {
  const options = [
    {
      text: "1-2 people",
      href: "/booking/two",
    },
    {
      text: "2-4 people",
      href: "/booking/two",
    },
    {
      text: "4-8 people",
      href: "/booking/two",
    },
    {
      text: "8-16 people",
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
