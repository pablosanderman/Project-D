import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { trpc } from '@/utils/trpc';

export default function TabOneScreen() {
  const helloQuery = trpc.helloWorld.useQuery();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Project D</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text>{helloQuery.data?.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
