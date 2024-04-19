import { Button, View } from "tamagui";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import { trpc } from "@/utils/trpc";
import { RoomType, RoomSize } from "@prisma/client";

import { Text } from "tamagui";

export default function Confirmation() {
  const { roomType, size } = useLocalSearchParams<{
    roomType: string;
    size: string;
  }>();

  const utils = trpc.useUtils();

  // get random room for development purposes
  const rooms = trpc.room.getRoomsByTypeAndSize.useQuery({
    type: roomType as RoomType,
    size: size as RoomSize,
  });

  const mutation = trpc.booking.create.useMutation({
    onSuccess() {
      utils.booking.invalidate();
    },
  });

  // create a demo booking with IN_PROGRESS status
  const createBooking = () => {
    mutation.mutate({
      userId: 1,
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      roomId: room?.id!,
      status: "IN_PROGRESS",
    });
  };

  const room = rooms.data?.[0];

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Confirm booking",
    });
  }, [navigation]);

  return (
    <View marginTop={"$8"} paddingHorizontal={"$2"}>
      <Text>
        {`type:    ${roomType}\nsize:    ${size}\ntime:    ${new Date().toISOString()}`}
      </Text>
      <Button onPress={createBooking}>Confirm</Button>
    </View>
  );
}
