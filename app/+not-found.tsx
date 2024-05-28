import { Link, Stack } from "expo-router";

import { Text, View, styled } from "tamagui";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <StyledContainer>
        <StyledTitle>This screen doesn't exist.</StyledTitle>

        <StyledLink href="/">
          <StyledLinkText>Go to home screen!</StyledLinkText>
        </StyledLink>
      </StyledContainer>
    </>
  );
}
const StyledContainer = styled(View, {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  padding: 20,
});

const StyledTitle = styled(Text, {
  fontSize: 20,
  fontWeight: "bold",
});
const StyledLink = styled(Link, {
  marginTop: 15,
  paddingVertical: 15,
});

const StyledLinkText = styled(Text, {
  fontSize: 14,
  color: "#2e78b7",
});
