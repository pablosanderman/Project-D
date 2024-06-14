import { trpc } from "@/utils/trpc";
import { $Enums } from "@prisma/client";
import { router } from "expo-router";
import { useContext } from "react";
import { Button, Separator, Text, View, styled } from "tamagui";
import { AuthContext } from "../_layout";
import { Compass } from "@tamagui/lucide-icons";
import { Converter } from "@/utils/converter";

export default function HomeScreen() {
  const { userId } = useContext(AuthContext);
  const utils = trpc.useUtils();
  const query = trpc.booking.getMostRecentBooking.useQuery({ userId: userId! });
  let data: {
    userId: number;
    startTime: string;
    endTime: string;
    roomId: number;
    status: $Enums.BookingStatus;
    id: number;
    createdAt: string;
    updatedAt: string;
  } = {
    userId: 0,
    startTime: "",
    endTime: "",
    roomId: 0,
    status: "UPCOMING",
    id: 0,
    createdAt: "",
    updatedAt: "",
  };
  if (query.data) {
  }

  const mutation = trpc.booking.create.useMutation({
    onSuccess(input) {
      utils.booking.invalidate();
    },
  });

  const fetchRooms = trpc.room.getRooms.useQuery();
  const fetchBookings = trpc.booking.get.useQuery({ userId: 1, filter: {} });

  const createBooking = async () => {
    console.log("createBooking");
    const rooms = fetchRooms.data;
    const bookings = fetchBookings.data;

    if (rooms === undefined || bookings === undefined) return;

    //filter rooms that are not booked at the desired time
    const availableRooms = rooms.filter((room) => {
      const overlappingBooking = bookings.find(
        (booking) => booking.roomId === room.id,
        // booking.startTime < new Date().toISOString() &&
        // booking.endTime > new Date().toISOString()
      );
      return !overlappingBooking;
    });

    if (availableRooms.length === 0) {
      console.log("No rooms available");
      return;
    } else if (availableRooms.length > 1) {
      console.log("log test");
      mutation.mutate({
        userId: 1,
        startTime: new Date().toISOString(),
        endTime: new Date().toISOString(),
        roomId: availableRooms[0].id,
        status: "UPCOMING",
      });
    }
  };

  return (
    <View>
      <StyledButton>
        <View>
          {query.data && (
            <>
              <View justifyContent="center">
                <StyledTitle>Booking</StyledTitle>
                <Text>Room {query.data.room.name}</Text>
              </View>
              <View>
                <Text>Start: {Converter.formatDate(query.data.startTime)}</Text>
                <Text>End: {Converter.formatDate(query.data.endTime)}</Text>
              </View>
            </>
          )}
        </View>
        <Button
          onPress={() =>
            router.push({
              pathname: "/navigation",
              params: { roomId: query.data!.roomId },
            })
          }
        >
          <Compass />
        </Button>
      </StyledButton>
      <StyledBookingButton onPress={() => router.push("/booking/")}>
        Book a room
      </StyledBookingButton>
      <StyledSeparator />
    </View>
  );
}

const StyledTitle = styled(Text, {
  fontSize: 20,
  fontWeight: "bold",
});
const StyledSeparator = styled(Separator, {
  width: "100%",
  height: 1,
  backgroundColor: "black",
  marginBottom: 10,
});

const StyledButton = styled(Button, {
  size: "$10",
  elevation: "$6",
  shadowColor: "black",
  padding: "none",
  marginBottom: 10,
  marginTop: 0,
  marginLeft: 10,
  height: 200,
  width: 350,
  backgroundColor: "darkgrey",
  flexDirection: "column",
});

const StyledBookingButton = styled(Button, {
  size: "$7",
  backgroundColor: "grey",
  width: 350,
  shadowColor: "$orange2Dark",
  shadowOpacity: 80,
  elevation: "$6",
  marginLeft: 10,
});
