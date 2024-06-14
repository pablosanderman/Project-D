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
import { useLayoutEffect } from "react";
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
import { RoomType } from "@prisma/client";

export default function Confirmation() {
  const utils = trpc.useUtils();

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

  const navigation = useNavigation();

  const query = trpc.room.nextAvailable.useQuery({
    type: roomType as RoomType,
    capacity: parseInt(roomSize),
    startTime: startTime,
    endTime: endTime,
  });

  const mutation = trpc.booking.create.useMutation({
    onSuccess() {
      utils.booking.invalidate();
    },
  });

  const createBooking = async () => {
    await mutation.mutateAsync({
      userId: 1,
      startTime: startTime,
      endTime: endTime,
      roomId: query.data!.id,
      status: "UPCOMING",
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Confirm booking",
    });
  }, [navigation]);

  return (
    <MainContainer>
      <InfoContainer>
        <Header>Booking details</Header>
        <InfoItem>
          <MapPin />
          <Text>{query.data?.name}</Text>
        </InfoItem>
        <InfoItem>
          <LampDesk />
          <Text>{Converter.convertRoomType(roomType)}</Text>
        </InfoItem>
        <InfoItem>
          <Calendar />
          <Text>{Converter.formatDate(startTime)}</Text>
        </InfoItem>
        <InfoItem>
          <Clock />
          <Text>{Converter.formatFromTimeToTime(startTime, endTime)}</Text>
        </InfoItem>
        <InfoItem>
          <Users />
          <Text>{roomSize}</Text>
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
    </MainContainer>
  );
}

const MainContainer = styled(View, {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "$15",
  marginHorizontal: "$3",
});

const InfoContainer = styled(View, {
  display: "flex",
  flexDirection: "column",
  gap: "$2",
  padding: "$10",
  marginBottom: "$4",
});

const Header = styled(Text, {
  fontSize: "$8",
  fontWeight: "bold",
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
  marginTop: "$15",
});

const OkayButton = styled(Button, {
  width: "$10",
  backgroundColor: "$blue10",
  color: "$white",
  padding: "$1",
  borderRadius: "$3",
});
