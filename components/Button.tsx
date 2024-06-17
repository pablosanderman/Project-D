import { ReactNode } from "react";
import { useColorScheme } from "react-native";
import { ButtonProps, Button } from "tamagui";

interface CardProps extends ButtonProps {
  children: ReactNode;
}

export default function Card({ children, ...rest }: CardProps) {
  const colorScheme = useColorScheme();

  const cardBackgroundColor =
    colorScheme === "dark" ? "$gray3Dark" : "$gray6Light";

  return (
    <Button backgroundColor={cardBackgroundColor} {...rest}>
      {children}
    </Button>
  );
}
