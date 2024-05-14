import { Button, View } from "tamagui";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useLayoutEffect, useState } from "react";
import { trpc } from "@/utils/trpc";
import { formatDate } from "@/utils/converters";

import { Text } from "tamagui";

export default function Confirmation() {
  const { roomType, roomSize, startTime, endTime } = useLocalSearchParams<{
    roomType: string;
    roomSize: string;
    startTime: string;
    endTime: string;
  }>();
  const recommendation = {
    roomId: 0,
    floor: 0,
  };
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      // recommend booking function placeholders
      recommendation.roomId = 50;
      recommendation.floor = 1;
    })();
  }, []);

  const mutation = trpc.booking.create.useMutation({
    onSuccess() {
      setError(null); // clear any previous error
      router.push("/booking/finish");
    },
    onError(err) {
      setError(err.message);
    },
  });

  const createBooking = async () => {
    await mutation.mutateAsync({
      userId: 1,
      startTime: startTime as string,
      endTime: endTime as string,
      roomId: recommendation.roomId,
      status: "UPCOMING",
    });
  };

  const createBookingAndNavigate = async () => {
    await createBooking();
    router.push(href);
  };

  const href = {
    pathname: "/booking/finish",
    params: {
      roomType: roomType as string,
      roomSize: roomSize as string,
      startTime: startTime,
      endTime: endTime,
      roomId: recommendation.roomId,
      floor: recommendation.floor,
    },
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
        {`(debug parameters)\n\ntype:    ${roomType}\nsize:    ${roomSize}\ncurrent time:    ${new Date().toISOString()}`}
      </Text>
      {recommendation && (
        <Text>
          {`\n\n\n\nRoom Info\n\nRoom number: ${
            recommendation.roomId
          }\nType of room : ${roomType}\nFloor: ${
            recommendation.floor
          }\nTime: ${formatDate(startTime!, "timeonly")} - ${formatDate(
            endTime!,
            "timeonly"
          )}`}{" "}
          {formatDate(startTime!, "weekday")}
        </Text>
      )}
      <Button onPress={createBookingAndNavigate}>Confirm booking</Button>
      {error && <Text>Error: {error}</Text>}
    </View>
  );
}
