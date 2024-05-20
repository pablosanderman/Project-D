import { FlatList, StyleSheet } from "react-native";

import { trpc } from "@/utils/trpc";
import { useState } from "react";
import type { CardProps } from "tamagui";
import {
  ListItem,
  Card,
  Button,
  Separator,
  XStack,
  YGroup,
  styled,
  Text,
  View,
  H2, 
  Paragraph,
  Image

} from "tamagui";

export default function ActivityScreen() {
  const query = trpc.booking.get.useQuery({ userId: 1, filter: {} });


  return (
    <View style={styles.container}>
      {query.data && (
        <View>
          {/* <View>
            <XStack>
              <Button width={"30%"} paddingHorizontal={0}>PAST</Button>
              <Button width={"30%"} paddingHorizontal={0}>ACTIVE</Button>
              <Button width={"30%"} paddingHorizontal={0}>UPCOMING</Button>
            </XStack>
          </View> */}
          <XStack>
            <YGroup width={"95%"} maxHeight={"95%"}>
              <FlatList
                data={query.data}
                
                //maak nieuwe lijst met data gegroepeerd per dag
                
                
                renderItem={({ item }) => (
                  
                  <YGroup.Item>
                      <Text> {formatDate(item.startTime )} </Text>
                      {/* <Text>{item.room}</Text> */}
                      <Text>{item.roomId}</Text>
                      <Text>{item.status}</Text>
                    <ListItem
                      // title={"Booking no." + item.id}
                      marginBottom={"$2"}
                      backgroundColor={"grey"}
                    >
                      <Separator/>
                        {/* <View>
                          <View><Text>Kamer {item.roomId}</Text></View>
                          <View><Text>Start: {formatDate(item.startTime)}</Text></View>
                          <View><Text>Eindigt: {formatDate(item.endTime)}</Text></View>
                          <View><Text>Status van de boeking: {item.status}</Text></View>
                          <View><Text>Geboekt door: {item.user.name}</Text></View>
                        </View> */}
                      <View>
                        <View>
                          <XStack $sm={{ flexDirection: 'column' }} paddingHorizontal="$4" space>
                            <DemoCard
                              animation="bouncy"
                              size="$4"
                              width={250}
                              height={300}
                              scale={0.9}
                              hoverStyle={{ scale: 0.925 }}
                              pressStyle={{ scale: 0.875 }}
                            />
                            {/* <DemoCard size="$5" width={250} height={300} /> */}
                          </XStack>
                        </View>
                      </View>
                      
                      {/* <Button>ja</Button>
                      <Button>nee</Button> */}
                      
                    </ListItem>
                  </YGroup.Item>
                )}
              />
            </YGroup>
          </XStack>
        </View>
      )}
      {query.error && <Text>Something went wrong! {query.error.message}</Text>}
    </View>
  );
}

// function List({ data, renderItem }: { data: any[], renderItem: any }) {
//   return (
//     <>
//       {data.map((item, index) => renderItem(item, index))}
//     </>
//   )
// }

export function DemoCard(props: CardProps) {
  const query = trpc.booking.get.useQuery({ userId: 1, filter: {} });

  return (
    <View>
      {query.data && (
      <Card elevate size="$4" bordered {...props}>
        <Card.Header padded>
          <H2>Sony A7IV</H2>
          <H2></H2>
          
          <Paragraph theme="alt2">Now available</Paragraph>
        </Card.Header>
        <Card.Footer padded>
          <XStack flex={0} />
          <Button borderRadius="$10">YAY</Button>
          <Button borderRadius="$10">NAY</Button>
        </Card.Footer>
        <Card.Background>
          <Image
            resizeMode="contain"
            alignSelf="center"
            source={{
              width: 300,
              height: 300,
              uri: "https://i.pinimg.com/736x/87/07/97/8707972a759975b07d188308c948cc27.jpg",
            }}
          />
        </Card.Background>
      </Card>
      )}
    {query.error && <Text>Something went wrong! {query.error.message}</Text>}
  </View>
  )
}


const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const formattedDate = date.toLocaleString("nl-NL", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  return formattedDate;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
