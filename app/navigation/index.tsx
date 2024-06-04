import { trpc } from "@/utils/trpc";
import { MapPicture } from "./map";
import MapController from "./MapController";
import { useLocalSearchParams } from "expo-router";
import { navigationIdToCoords } from "./navigationIdToCoords";
import { View, Text } from "tamagui";

export default function Navigation() {
  const { roomId } = useLocalSearchParams<{ roomId: string }>();

  const query = trpc.room.get.useQuery(parseInt(roomId!));

  if (query.isFetched) navigationIdToCoords(query.data!.navigationId);

  return (
    <View position="relative" height={"100%"} backgroundColor={"#D9D9D9"}>
      <MapController>
        <MapPicture />
      </MapController>
      <View
        position="absolute"
        bottom={0}
        width={"100%"}
        backgroundColor={"black"}
        minHeight={"17%"}
        borderTopLeftRadius={"$8"}
        borderTopRightRadius={"$8"}
        padding="$4"
      >
        <Text>{query.data?.name}</Text>
      </View>
    </View>
  );
}
