import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, Text, } from 'react-native';

export default function TabTwoScreen() {
  return (
    <Text style={styles.text}>Heloo tab 2</Text>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'white'
  }
});
