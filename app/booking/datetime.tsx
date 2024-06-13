import { Button, View, Text, styled } from "tamagui";
import { Calendar, Clock } from "@tamagui/lucide-icons";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect, useState } from "react";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import { Converter } from "@/utils/converter";

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

  const onChangeTime = (
    event: DateTimePickerEvent,
    selectedTime: Date | undefined,
    isStartTime: boolean
  ) => {
    const currentTime = selectedTime || (isStartTime ? startTime : endTime);

    if (isStartTime) {
      setShowStartTimePicker(false);
      const newStartTime = calculateTime(date, currentTime);
      setStartTime(newStartTime);
    } else {
      setShowEndTimePicker(false);
      const newEndTime = calculateTime(date, currentTime);
      setEndTime(newEndTime);
    }
  };

  const calculateTime = (date: Date, currentTime: Date): Date => {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      currentTime.getHours(),
      currentTime.getMinutes()
    );
  };

  const validateAndContinue = () => {
    const currentTime = new Date();

    if (endTime <= startTime) {
      alert("End time must be after start time.");
    } else if (startTime < currentTime) {
      alert("Start time cannot be in the past.");
    } else {
      router.push(href);
    }
  };

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Choose date and time",
    });
  }, [navigation]);

  return (
    <MainContainer>
      <DateTimePickerContainer>
        <DatePickerContainer>
          <Text>Date</Text>
          <DatePickerButton
            icon={Calendar}
            onPress={() => setShowDatePicker(true)}
          >
            {Converter.formatDate(date.toISOString())}
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
            <Text>Start time</Text>
            <TimePickerButton
              icon={Clock}
              onPress={() => setShowStartTimePicker(true)}
            >
              {Converter.formatTime(startTime.toISOString())}
            </TimePickerButton>
            {showStartTimePicker && (
              <DateTimePicker
                value={startTime}
                mode={"time"}
                display={"spinner"}
                minuteInterval={5}
                onChange={(event, selectedTime) =>
                  onChangeTime(event, selectedTime, true)
                }
              />
            )}
          </View>
          <View>
            <Text>End time</Text>
            <TimePickerButton
              icon={Clock}
              onPress={() => setShowEndTimePicker(true)}
            >
              {Converter.formatTime(endTime.toISOString())}
            </TimePickerButton>
            {showEndTimePicker && (
              <DateTimePicker
                value={endTime}
                mode={"time"}
                display={"spinner"}
                minuteInterval={5}
                onChange={(event, selectedTime) =>
                  onChangeTime(event, selectedTime, false)
                }
              />
            )}
          </View>
        </TimePickerContainer>
      </DateTimePickerContainer>
      <ContinueContainer>
        <ContinueButton onPress={validateAndContinue}>Continue</ContinueButton>
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
