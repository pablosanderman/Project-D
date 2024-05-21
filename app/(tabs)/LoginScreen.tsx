import React from "react";
import { Button, Input, styled, View, Text } from "tamagui";
import { router } from "expo-router";

export default function LoginScreen() {
  return (
    <StyledContainer>
      <StyledPopup>
        <StyledText>Login</StyledText>
        <StyledInputField placeholder="Email" />
        <StyledInputField secureTextEntry={true} placeholder="Password" />
      </StyledPopup>

      <StyledButtonView>
        <Button
          onPress={() => {
            router.push("./Sign-up");
          }}
          backgroundColor={"darkgray"}
        >
          {" "}
          Sign up
        </Button>
        <Button onPress={() => {}} backgroundColor={"darkgray"}>
          {" "}
          Log in
        </Button>
      </StyledButtonView>
    </StyledContainer>
  );
}

const StyledContainer = styled(View, {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#ecf0f1",
});
const StyledButtonView = styled(View, {
  flexDirection: "row",
  justifyContent: "space-around",
  width: 200,
  marginTop: 10,
});
const StyledPopup = styled(View, {
  backgroundColor: "white",
  borderRadius: 10,
  width: 200,
  height: 155,
});

const StyledText = styled(Text, {
  fontSize: 20,
  marginLeft: 10,
  marginTop: 10,
  fontWeight: "bold",
});
const StyledInputField = styled(Input, {
  marginLeft: 10,
  marginRight: 10,
  marginTop: 10,
  paddingBottom: 10,
});
