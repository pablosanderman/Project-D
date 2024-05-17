import { Button, View } from "tamagui";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useLayoutEffect } from "react";
import {
  convertRoomSize,
  convertRoomType,
  formatDate,
} from "@/utils/converters";
import { trpc } from "@/utils/trpc";

import { Text } from "tamagui";
import { CheckCircle2 } from "@tamagui/lucide-icons";

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
      headerbackVisible: false,
    });
  }, [navigation]);

  return (
    <View marginTop={"$8"} paddingHorizontal={"$2"}>
      <Text fontSize={"$7"}> {`Booking confirmed \n`}</Text>
      <CheckCircle2 size={"$7"} alignSelf="center"></CheckCircle2>
      <Text fontWeight={"bold"} alignSelf="center" fontSize={"$6"}>
        {`Room Info \n`}
      </Text>
      <Text alignSelf="center">
        {`Room: ${roomId}\nFloor: ${floor}\nRoom type: ${convertRoomType(
          roomType!
        )}\nCapacity: ${convertRoomSize(roomSize!)}\nTime: ${formatDate(
          startTime!,
          "timeonly"
        )} - ${formatDate(endTime!, "timeonly")} ${formatDate(
          startTime!,
          "weekday"
        )}`}
      </Text>
      <Text>
        {`\n(debug parameters)\n\ntype:    ${roomType}\nsize:    ${roomSize}\ntime:    ${new Date().toISOString()}`}
      </Text>
      <Button onPress={router.dismissAll}>Finish</Button>
    </View>
  );
}
