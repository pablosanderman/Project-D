import { trpc } from "@/utils/trpc";
import { MapPicture } from "./map";
import MapController from "./MapController";
import { useLocalSearchParams } from "expo-router";
import { navigationIdToCoords } from "./navigationIdToCoords";
import { View, Text, styled } from "tamagui";

export default function Navigation() {
  const { roomId } = useLocalSearchParams<{ roomId: string }>();

  const query = trpc.room.get.useQuery(parseInt(roomId!));

  if (query.isFetched) navigationIdToCoords(query.data!.navigationId);

  return (
    <View position="relative" height={"100%"} backgroundColor={"#D9D9D9"}>
      <MapController>
        <View position="relative">
          <MapPicture />
          <Coordinate className="02.01" top={525} left={200}/>
          <Coordinate className="02.02" top={470} left={210}/>
          <Coordinate className="02.03" top={415} left={230}/>
          <Coordinate className="02.04" top={340} left={270}/>
          <Coordinate className="02.05" top={280} left={310}/>
          <Coordinate className="02.06" top={220} left={360}/>
          <Coordinate className="02.21" top={550} left={840}/>
          <Coordinate className="02.22" top={550} left={800}/>
          <Coordinate className="02.29" top={700} left={700}/>
          <Coordinate className="02.36" top={735} left={345}/>
          <Coordinate className="02.23" top={570} left={800}/>
          <Coordinate className="02.37" top={730} left={380}/>
          <Coordinate className="02.38" top={760} left={375}/>
          <Coordinate className="02.D1" top={220} left={650}/>
          <Coordinate className="02.D4" top={490} left={800}/>
          <Coordinate className="02.D2" top={300} left={590}/>
          <Coordinate className="02.D3" top={500} left={700}/>
          <Coordinate className="02.D5" top={695} left={780}/>
          <Coordinate className="02.D6" top={650} left={610}/>
          <Coordinate className="02.D7" top={740} left={620}/>
          <Coordinate className="02.D8" top={750} left={500}/>
          <Coordinate className="02.D9" top={740} left={405}/>
          <Coordinate className="02.D10" top={650} left={400}/>
          
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

const Coordinate = styled(View, {
  position: "absolute",
  backgroundColor: "red",
  height: 10,
  width: 10,
  top: 0,
  left: 0,
});