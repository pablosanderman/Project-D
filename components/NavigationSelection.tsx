import { Href, router } from "expo-router";
import { Button, View, XStack, Text } from "tamagui";
interface SelectionItem {
  text: string;
  href: string;
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
            onPress={() => router.push(option.href as Href<string>)}
            size={"$10"}
            paddingHorizontal={"$2"}
            margin={3}
            borderRadius={"$4"}
          >
            <Text textAlign="center">{option.text}</Text>
          </Button>
        </View>
      ))}
    </XStack>
  );
}
