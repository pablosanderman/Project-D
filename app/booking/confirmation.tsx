import { trpc } from "@/utils/trpc";
import { Booking } from "@prisma/client";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { View } from "tamagui";

import { Text } from "tamagui";
import { AuthContext } from "../_layout";

export default function Confirmation() {
  const { userId } = useContext(AuthContext);
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

  const mutation = trpc.booking.create.useMutation({
    onSuccess() {
      utils.booking.invalidate(); // refresh cache
    },
  });

  // create a demo booking with IN_PROGRESS status
  // Hardcoded values for demonstration purposes: userId: 1, roomId: 50
  const createBooking = async () => {
    const booking = await mutation.mutateAsync({
      userId: userId!,
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      roomId: 50,
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
          {`\n\n\n\nRoom Info\n\nroom: *room name*\ntype: *roomType*\nsize: *roomSize*\nstart:   ${newBooking.startTime}\nend:     ${newBooking.endTime}`}
        </Text>
      )}
    </View>
  );
}
