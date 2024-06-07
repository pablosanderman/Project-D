import { trpc } from "@/utils/trpc";
import { MapPicture } from "./map";
import MapController from "./MapController";
import { useLocalSearchParams } from "expo-router";
import {
  getCorrespondingStair,
  navigationIdToCoords,
} from "./navigationIdToCoords";
import { View, Text, styled } from "tamagui";
import { useState } from "react";
import DrawLine from "./DrawLine";
import { dijkstra } from "./pathfinding";

export default function Navigation() {
  const { roomId } = useLocalSearchParams<{ roomId: string }>();

  const query = trpc.room.get.useQuery(parseInt(roomId!));

  const [on, setOn] = useState(false);
  const [start, setStart] = useState({ top: 0, left: 0 });
  const [end, setEnd] = useState({ top: 0, left: 0 });

  if (query.isFetched) {
    if (!on) {
      const navId = query.data!.navigationId;
      const stair = getCorrespondingStair(navId)!;
      let [startId, endId] = dijkstra(stair, navId)!;
      console.log(startId, endId);
      setStart(navigationIdToCoords(startId)!);
      setEnd(navigationIdToCoords(endId)!);
      setOn(true);
    }
  }

  const debug = false; // toggle labels

  return (
    <View position="relative" height={"100%"} backgroundColor={"#D9D9D9"}>
      <MapController>
        <View position="relative">
          <MapPicture />
          <DrawLine start={start} end={end} />

          {debug && (
            <>
              <Coord text="02.01" top={525} left={200} />
              <Coord text="02.02" top={470} left={210} />
              <Coord text="02.03" top={415} left={230} />
              <Coord text="02.04" top={340} left={270} />
              <Coord text="02.05" top={280} left={310} />
              <Coord text="02.06" top={220} left={360} />
              <Coord text="02.21" top={550} left={840} />
              <Coord text="02.22" top={550} left={800} />
              <Coord text="02.29" top={700} left={700} />
              <Coord text="02.36" top={735} left={345} />
              <Coord text="02.23" top={570} left={800} />
              <Coord text="02.37" top={730} left={380} />
              <Coord text="02.38" top={760} left={375} />
              <Coord text="02.D1" top={220} left={650} />
              <Coord text="02.D4" top={490} left={800} />
              <Coord text="02.D2" top={300} left={590} />
              <Coord text="02.D3" top={500} left={700} />
              <Coord text="02.D5" top={695} left={780} />
              <Coord text="02.D6" top={650} left={610} />
              <Coord text="02.D7" top={740} left={620} />
              <Coord text="02.D8" top={750} left={500} />
              <Coord text="02.D9" top={740} left={405} />
              <Coord text="02.D10" top={650} left={400} />

              <Coord text="stair1" top={400} left={360} />
              <Coord text="stair2" top={395} left={660} />
              <Coord text="stair3" top={650} left={510} />
            </>
          )}
        </View>
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

const Coord = ({
  text,
  top,
  left,
}: {
  text: string;
  top: number;
  left: number;
}) => {
  return (
    <Coordinate className="02.D10" top={top} left={left}>
      <Text>{text}</Text>
    </Coordinate>
  );
};

const Coordinate = styled(View, {
  position: "absolute",
  backgroundColor: "red",
  // height: 10,
  // width: 10,
  top: 0,
  left: 0,
});
