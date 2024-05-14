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
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const href = {
    pathname: "/booking/confirmation",
    params: {
      roomType: roomType as string,
      roomSize: roomSize as string,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
    },
  };

  const onChangeDate = (
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
    <View
      marginTop={"$8"}
      paddingHorizontal={"$2"}
      display="flex"
      flexDirection="column"
    >
      <View marginLeft="$7">
        <Text>Date:</Text>
        <Button width="$20" onPress={() => setShowDatePicker(true)}>
          {date.toDateString()}
        </Button>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode={"date"}
            display={"default"}
            minimumDate={new Date()}
            onChange={onChangeDate}
          />
        )}

        <View flexDirection="row" gap="$10">
          <View>
            <Text>Start time:</Text>
            <Button onPress={() => setShowStartTimePicker(true)}>
              {startTime.toTimeString().split(" ")[0]}
            </Button>
            {showStartTimePicker && (
              <DateTimePicker
                value={startTime}
                mode={"time"}
                display={"default"}
                onChange={(event, selectedTime) => {
                  const currentDate = selectedTime || startTime;
                  setStartTime(currentDate);
                  setShowStartTimePicker(false);
                }}
              />
            )}
          </View>
          <View>
            <Text>End time:</Text>
            <Button onPress={() => setShowEndTimePicker(true)}>
              {endTime.toTimeString().split(" ")[0]}
            </Button>
            {showEndTimePicker && (
              <DateTimePicker
                value={endTime}
                mode={"time"}
                display={"default"}
                onChange={(event, selectedTime) => {
                  const currentDate = selectedTime || endTime;
                  setEndTime(currentDate);
                  setShowEndTimePicker(false);
                }}
              />
            )}
          </View>
        </View>
      </View>
      <Button
        onPress={() => router.push(href)}
        size={"$10"}
        paddingHorizontal={"$2"}
        marginVertical={"$8"}
        marginHorizontal={"$8"}
        borderRadius={"$4"}
      >
        <Text textAlign="center">Continue</Text>
      </Button>
    </View>
  );
}
