import { Button, View } from "tamagui";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useLayoutEffect } from "react";
import { trpc } from "@/utils/trpc";

import { Text } from "tamagui";

export default function Finish() {
  const { roomType, roomSize, startTime, endTime, roomId, floor } =
    useLocalSearchParams<{
      roomType: string;
      roomSize: string;
      startTime: string;
      endTime: string;
      roomId: string;
      floor: string;
    }>();

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Booking confirmed",
    });
  }, [navigation]);

  return (
    <View marginTop={"$8"} paddingHorizontal={"$2"}>
      <Text>
        {`(debug parameters)\n\ntype:    ${roomType}\nsize:    ${roomSize}\ntime:    ${new Date().toISOString()}`}
      </Text>
      <Text>
        {`\n\n\n\nRoom Info\n\nroom: ${roomId}\nfloor: ${floor}\ntype: ${roomType}\nsize: ${roomSize}\nstart:   ${startTime}\nend:     ${endTime}`}
      </Text>
      <Button onPress={router.dismissAll}>Finish</Button>
    </View>
  );
}
