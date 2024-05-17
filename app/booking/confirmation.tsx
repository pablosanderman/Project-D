import {
  Button,
  Text,
  View,
  AlertDialog,
  styled,
  XStack,
  YStack,
} from "tamagui";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useLayoutEffect, useState } from "react";
import { trpc } from "@/utils/trpc";
import { Converter } from "@/utils/converter";
import {
  MapPin,
  LampDesk,
  Calendar,
  Clock,
  Users,
  CheckCircle,
} from "@tamagui/lucide-icons";

function RecommendRoom() {
  // placeholder function
  return {
    roomId: 50,
    roomName: "PL 05.18",
    floor: 1,
  };
}

export default function Confirmation() {
  const { roomType, roomSize, startTime, endTime } = useLocalSearchParams<{
    roomType: string;
    roomSize: string;
    startTime: string;
    endTime: string;
  }>() as {
    roomType: string;
    roomSize: string;
    startTime: string;
    endTime: string;
  };
  const [recommendation, setRecommendation] = useState({
    roomId: 0,
    roomName: "",
    floor: 0,
  });
  useEffect(() => {
    const recommendedRoom = RecommendRoom();
    setRecommendation(recommendedRoom);
  }, []);
  const [error, setError] = useState<string | null>(null);

  const Name = recommendation.roomName;
  const Type = Converter.convertRoomType(roomType);
  const Date = Converter.formatDate(startTime);
  const Time = Converter.formatFromTimeToTime(startTime, endTime);
  const Size = Converter.convertRoomSize(roomSize);

  const mutation = trpc.booking.create.useMutation({
    onSuccess() {},
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

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Confirm booking",
    });
  }, [navigation]);

  return (
    <MainContainer>
      <InfoContainer>
        <InfoItem>
          <MapPin />
          <Text>{Name}</Text>
        </InfoItem>
        <InfoItem>
          <LampDesk />
          <Text>{Type}</Text>
        </InfoItem>
        <InfoItem>
          <Calendar />
          <Text>{Date}</Text>
        </InfoItem>
        <InfoItem>
          <Clock />
          <Text>{Time}</Text>
        </InfoItem>
        <InfoItem>
          <Users />
          <Text>{Size}</Text>
        </InfoItem>
      </InfoContainer>
      <AlertDialog>
        <AlertDialog.Trigger asChild>
          <ConfirmBooking onPress={createBooking}>
            Confirm booking
          </ConfirmBooking>
        </AlertDialog.Trigger>
        <AlertDialog.Portal>
          <AlertDialog.Overlay
            key="overlay"
            animation="quick"
            opacity={0.5}
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
          <AlertDialog.Content
            bordered
            elevate
            key="content"
            animation={[
              "quick",
              {
                opacity: {
                  overshootClamping: true,
                },
              },
            ]}
            enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
            exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
            x={0}
            scale={1}
            opacity={1}
            y={0}
          >
            <YStack>
              <AlertDialog.Title>Booking created</AlertDialog.Title>

              <CheckCircle alignSelf="center" marginVertical="$7" size="$12" />

              <XStack justifyContent="center">
                <AlertDialog.Action asChild>
                  <OkayButton onPress={router.dismissAll}>OK</OkayButton>
                </AlertDialog.Action>
              </XStack>
            </YStack>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog>
      {error && <Text>Error: {error}</Text>}
    </MainContainer>
  );
}

const MainContainer = styled(View, {
  display: "flex",
  flexDirection: "column",
  marginTop: "$8",
  marginHorizontal: "$3",
});

const InfoContainer = styled(View, {
  display: "flex",
  flexDirection: "column",
  marginBottom: "$4",
});

const InfoItem = styled(View, {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  marginBottom: "$2",
  gap: "$2",
});

const ConfirmBooking = styled(Button, {
  width: "$13",
  backgroundColor: "$blue10",
  color: "$white",
  padding: "$1",
  borderRadius: "$3",
});

const OkayButton = styled(Button, {
  width: "$10",
  backgroundColor: "$blue10",
  color: "$white",
  padding: "$1",
  borderRadius: "$3",
});
