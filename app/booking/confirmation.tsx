import { Button, View } from "tamagui";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useLayoutEffect, useState } from "react";
import { trpc } from "@/utils/trpc";
import { RoomType, RoomSize, Booking, Room } from "@prisma/client";

import { Text } from "tamagui";
import { Use } from "react-native-svg";

export default function Confirmation() {
  const [newBooking, setNewBooking] = useState<Booking | null>(null);
  useEffect(() => {
    (async () => {
      createBooking();
    })();
  }, []);

  const { roomType, size } = useLocalSearchParams<{
    roomType: string;
    size: string;
  }>();

  const utils = trpc.useUtils();

  // get random room for development purposes
  const randomRoom = trpc.room.getRoomsByTypeAndSize.useQuery({
    type: roomType as RoomType,
    size: size as RoomSize,
  }).data?.[0];

  const mutation = trpc.booking.create.useMutation({
    onSuccess() {
      utils.booking.invalidate(); // refresh cache
    },
  });

  // create a demo booking with IN_PROGRESS status
  const createBooking = async () => {
    const booking = await mutation.mutateAsync({
      userId: 1,
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      roomId: randomRoom?.id!,
      status: "IN_PROGRESS",
    });

    const formattedBooking = {
      ...booking,
      startTime: new Date(booking.startTime),
      endTime: new Date(booking.endTime),
      createdAt: new Date(booking.createdAt),
      updatedAt: new Date(booking.updatedAt),
    };

    setNewBooking(formattedBooking);
  };

  const room = trpc.room.get.useQuery(randomRoom?.id!).data!;

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Confirm booking",
    });
  }, [navigation]);

  return (
    <View marginTop={"$8"} paddingHorizontal={"$2"}>
      <Text>
        {`(debug parameters)\n\ntype:    ${roomType}\nsize:    ${size}\ntime:    ${new Date().toISOString()}`}
      </Text>
      {newBooking && (
        <Text>
          {`\n\n\n\nRoom Info\n\nroom: ${room.name}\ntype: ${room.type}\nsize: ${room.size}\nstart:   ${newBooking.startTime}\nend:     ${newBooking.endTime}`}
        </Text>
      )}
    </View>
  );
}
