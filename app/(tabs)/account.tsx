import { trpc } from "@/utils/trpc";
import { router } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "../_layout";
import { Text, Button, View, Separator, styled } from "tamagui";
import { Settings, Info, KeyRound } from "@tamagui/lucide-icons";

export default function AccountScreen() {
  const { userId } = useContext(AuthContext);
  const user = trpc.user.get.useQuery(userId!);

  const debug = false;

  return (
    <StyledContainer>
      {user.data && (
        <View>
          <StyledTitle>{user.data.name}</StyledTitle>
          {debug && <Text color={"red"}>{user.data.id}</Text>}
        </View>
      )}
      <StyledSeparator />
      <View gap={"$3"}>
        <Button
          onPress={() => {
            router.push("/login");
          }}
        >
          <KeyRound />
          Log In
        </Button>
      </View>
    </StyledContainer>
  );
}

const StyledContainer = styled(View, {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
});
const StyledTitle = styled(Text, {
  fontSize: 20,
  fontWeight: "bold",
});

const StyledSeparator = styled(Separator, {
  marginVertical: 30,
  height: 1,
  width: "80%",
});
