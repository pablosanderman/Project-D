import { View } from "tamagui";
import { useLocalSearchParams, useNavigation } from "expo-router";
import NavigationSelection from "@/components/NavigationSelection";
import { useEffect, useLayoutEffect, useState } from "react";
import { trpc } from "@/utils/trpc";
import { RoomType } from "@prisma/client";

export default function RoomSize() {
  const { roomType } = useLocalSearchParams<{ roomType: string }>();
  const roomsQuery = trpc.room.RoomsBasedOnRoomType.useQuery({
    type: roomType as RoomType,
  });

  type Option = {
    text: string;
    href: {
      pathname: string;
      params: {
        roomType: string;
        roomSize: string;
      };
    };
  };
  const [options, setOptions] = useState<Option[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: "Choose room size",
    });

    if (roomsQuery.data) {
      const uniqueCapacities = Array.from(
        new Set(roomsQuery.data.map((room) => room.capacity))
      ).sort((a, b) => a - b);
      const newOptions = uniqueCapacities.map((capacity) => ({
        text: capacity.toString(),
        href: {
          pathname: "/booking/datetime",
          params: {
            roomType: roomType as string,
            roomSize: capacity.toString(),
          },
        },
        icon: "users",
      }));
      setOptions(newOptions);
    }
  }, [roomType, roomsQuery.data]);

  const fetchRooms = async (roomType: string) => {
    const rooms = trpc.room.RoomsBasedOnRoomType.useQuery({
      type: roomType as RoomType,
    });
    const uniqueCapacities = Array.from(
      new Set(rooms.data?.map((room) => room.capacity))
    );
    console.log(uniqueCapacities);
    return uniqueCapacities;
  };

  return (
    <View marginTop={"$8"} paddingHorizontal={"$2"}>
      <NavigationSelection options={options} />
    </View>
  );
}
