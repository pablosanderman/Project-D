import React from "react";
import { Button, Input, styled, View, Text } from "tamagui";
import { router } from "expo-router";

export default function LoginScreen() {
  return (
    <StyledContainer>
      <StyledPopup>
        <StyledText>Sign up</StyledText>
        <StyledRowView>
          <StyledSideInput placeholder="Name" />
          <StyledSideInput placeholder="Surname" />
        </StyledRowView>
        <StyledInputField placeholder="Email" />
        <StyledInputField secureTextEntry={true} placeholder="Password" />
        <StyledInputField
          secureTextEntry={true}
          placeholder="Confirm Password"
        />
      </StyledPopup>
      <StyledAsker> Already have an account?</StyledAsker>
      <StyledButtonView>
        <Button
          onPress={() => {
            router.push("./LoginScreen");
          }}
          backgroundColor={"darkgray"}
        >
          {" "}
          login
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

const StyledAsker = styled(Text, {
  fontSize: 12,
});

const StyledSideInput = styled(Input, {
  width: 100,
  marginLeft: 10,
});

const StyledRowView = styled(View, {
  flexDirection: "row",
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
  width: 250,
  height: 265,
});

const StyledText = styled(Text, {
  fontSize: 20,
  marginLeft: 10,
  marginTop: 10,
  marginBottom: 10,
  fontWeight: "bold",
  color: "black",
});
const StyledInputField = styled(Input, {
  marginLeft: 10,
  marginRight: 10,
  marginTop: 10,
  paddingBottom: 10,
});
