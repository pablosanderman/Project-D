import { trpc } from "@/utils/trpc";
import { MapPicture } from "./map";
import MapController from "./MapController";
import { useLocalSearchParams } from "expo-router";
import { navigationIdToCoords } from "./navigationIdToCoords";

export default function Navigation() {
  const { roomId } = useLocalSearchParams<{ roomId: string }>();

  const query = trpc.room.get.useQuery(parseInt(roomId!));

  if (query.isFetched) navigationIdToCoords(query.data!.navigationId);

  return (
    <MapController>
      {query.isFetched && navigationIdToCoords(query.data!.navigationId)}
      <MapPicture />
    </MapController>
  );
}
