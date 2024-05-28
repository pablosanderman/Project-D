import { Button, View, styled } from "tamagui";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect } from "react";

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
      title: "Booking successfull",
    });
  }, [navigation]);

  return (
    <MainContainer>
      <CheckCircle2 />

      <FinishButton onPress={router.dismissAll}>Finish</FinishButton>
    </MainContainer>
  );
}

const MainContainer = styled(View, {
  display: "flex",
  flexDirection: "column",
  marginTop: "$8",
  marginHorizontal: "$3",
});

const FinishButton = styled(Button, {
  width: "$13",
  backgroundColor: "$blue10",
  color: "$white",
  padding: "$1",
  borderRadius: "$3",
});
