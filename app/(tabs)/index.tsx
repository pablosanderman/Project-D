import { Converter } from "@/utils/converter";
import { trpc } from "@/utils/trpc";
import { Compass } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { Button, Separator, Text, View, styled } from "tamagui";

export default function HomeScreen() {
  const utils = trpc.useUtils();
  const query = trpc.booking.getMostRecentBooking.useQuery({ userId: 1 });

  if (query.data) {
  }

  const mutation = trpc.booking.create.useMutation({
    onSuccess(input) {
      utils.booking.invalidate();
    },
  });
  const createBooking = () => {
    mutation.mutate({
      userId: 1,
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      roomId: 1,
      status: "UPCOMING",
    });
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
