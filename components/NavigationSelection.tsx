import { router } from "expo-router";
import { Button, View, XStack, Text, styled } from "tamagui";
import { Info, Users } from "@tamagui/lucide-icons";

interface SelectionItem {
  text: string;
  href: { pathname: string; params: Record<string, string> };
  icon?: string;
}

interface NavigationSelectionProps {
  options: SelectionItem[];
}
export default function NavigationSelection({
  options,
}: NavigationSelectionProps) {
  return (
    <XStack flexWrap="wrap">
      {options.map((option, index) => (
        <View key={index} width={"50%"}>
          <Button
            onPress={() => router.push(option.href)}
            size={"$10"}
            paddingHorizontal={"$2"}
            margin={3}
            borderRadius={"$4"}
          >
            <InfoItem>
              {option.icon === "users" && <Users />}
              <Text textAlign="center">{option.text}</Text>
            </InfoItem>
          </Button>
        </View>
      ))}
    </XStack>
  );
}

const InfoItem = styled(View, {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  marginBottom: "$2",
  gap: "$2",
});
