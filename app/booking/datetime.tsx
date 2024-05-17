import { Button, View, Text, styled } from "tamagui";
import { Calendar, Clock } from "@tamagui/lucide-icons";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect, useState } from "react";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import { formatTime, formatDate } from "@/utils/converters";

export default function DateTime() {
  const { roomType, roomSize } = useLocalSearchParams<{
    roomType: string;
    roomSize: string;
  }>();
  const defaultEndDate = new Date();
  defaultEndDate.setHours(defaultEndDate.getHours() + 1);

  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(defaultEndDate);
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
    setShowDatePicker(false);
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Book a room",
    });
  }, [navigation]);

  return (
    <MainContainer>
      <DateTimePickerContainer>
        <DatePickerContainer>
          <Text>Date:</Text>
          <DatePickerButton
            icon={Calendar}
            onPress={() => setShowDatePicker(true)}
          >
            {formatDate(date.toISOString())}
          </DatePickerButton>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode={"date"}
              display={"default"}
              minimumDate={new Date()}
              onChange={onChangeDate}
            />
          )}
        </DatePickerContainer>

        <TimePickerContainer>
          <View>
            <Text>Start time:</Text>
            <TimePickerButton
              icon={Clock}
              onPress={() => setShowStartTimePicker(true)}
            >
              {formatTime(startTime.toISOString())}
            </TimePickerButton>
            {showStartTimePicker && (
              <DateTimePicker
                value={startTime}
                mode={"time"}
                display={"default"}
                minuteInterval={5}
                onChange={(_event, selectedTime) => {
                  setShowStartTimePicker(false);
                  const currentDate = selectedTime || startTime;
                  setStartTime(currentDate);
                }}
              />
            )}
          </View>
          <View>
            <Text>End time:</Text>
            <TimePickerButton
              icon={Clock}
              onPress={() => setShowEndTimePicker(true)}
            >
              {formatTime(endTime.toISOString())}
            </TimePickerButton>
            {showEndTimePicker && (
              <DateTimePicker
                value={endTime}
                mode={"time"}
                display={"default"}
                minuteInterval={5}
                onChange={(_event, selectedTime) => {
                  setShowEndTimePicker(false);
                  const currentDate = selectedTime || endTime;
                  setEndTime(currentDate);
                }}
              />
            )}
          </View>
        </TimePickerContainer>
      </DateTimePickerContainer>
      <ContinueContainer>
        <ContinueButton onPress={() => router.push(href)}>
          Continue
        </ContinueButton>
      </ContinueContainer>
    </MainContainer>
  );
}

const MainContainer = styled(View, {
  display: "flex",
  flexDirection: "column",
  marginTop: "$8",
  marginHorizontal: "$3",
});

const DateTimePickerContainer = styled(View, {
  width: "80%",
});

const DatePickerContainer = styled(View, {
  gap: "$3",
  marginBottom: "$6",
});

const DatePickerButton = styled(Button, {
  justifyContent: "flex-start",
});

const TimePickerContainer = styled(View, {
  flexDirection: "row",
  justifyContent: "space-between",
});

const TimePickerButton = styled(Button, {
  marginTop: "$3",
  width: "$11",
  justifyContent: "flex-start",
});

const ContinueContainer = styled(View, {
  justifyContent: "center",
  alignItems: "center",
  marginTop: 400,
});

const ContinueButton = styled(Button, {
  width: "$13",
  backgroundColor: "$blue10",
  color: "$white",
  padding: "$1",
  borderRadius: "$3",
});
