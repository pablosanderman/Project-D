import { Button, View } from "tamagui";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect, useState } from "react";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import { Text } from "tamagui";

export default function DateTime() {
  const { roomType, roomSize } = useLocalSearchParams<{
    roomType: string;
    roomSize: string;
  }>();
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const href = {
    pathname: "/booking/confirmation",
    params: {
      roomType: roomType as string,
      roomSize: roomSize as string,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
    },
  };

  const onChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShowDatePicker(false);
  };

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Book a room",
    });
  }, [navigation]);

  return (
    <View marginTop={"$8"} paddingHorizontal={"$2"}>
      <Text>Date:</Text>
      <Button onPress={() => setShowDatePicker(true)}>Select date</Button>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode={"date"}
          display={"default"}
          onChange={onChange}
        />
      )}
      <Button
        onPress={() => router.push(href)}
        size={"$10"}
        paddingHorizontal={"$2"}
        margin={3}
        borderRadius={"$4"}
      >
        <Text textAlign="center">Continue</Text>
      </Button>
    </View>
  );
}
