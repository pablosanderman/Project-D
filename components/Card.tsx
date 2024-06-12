import { ReactNode } from "react";
import { useColorScheme } from "react-native";
import { View, ViewProps } from "tamagui";

interface CardProps extends ViewProps {
  children: ReactNode;
}

export default function Card({ children, ...rest }: CardProps) {
  const colorScheme = useColorScheme();

  const cardBackgroundColor =
    colorScheme === "dark" ? "$gray3Dark" : "$gray6Light";

  return (
    <View
      backgroundColor={cardBackgroundColor}
      borderRadius={"$6"}
      p="$4"
      {...rest}
    >
      {children}
    </View>
  );
}
