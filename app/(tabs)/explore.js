import Ionicons from "@expo/vector-icons/Ionicons";
import {
  StyleSheet,
  Image,
  Platform,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useEffect, useState } from "react";

// Parent Component
const TabTwoScreen = () => {
  const [name, setName] = useState("Holaaa");
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log(
      "useEffect work after the component will be renderd successfully"
    );
    setMessage("useEffect");

    return () => {
      console.log("useEffect will be cleared");
    };
  }, []);
  // useEffect: Runs once when the component mounts (similar to componentDidMount)
  useEffect(() => {
    console.log("Component mounted");
    setName("Welcome, Mohtashim!"); // This will update the name when the component loads.

    // Cleanup function: Runs when the component unmounts
    return () => {
      console.log("Component unmounted");
    };
  }, []); // Empty array means it runs once after the initial render.

  // useEffect: Runs every time the 'input' state changes
  useEffect(() => {
    console.log("Input changed:", input);
  }, [input]); // It runs only when 'input' changes.

  return (
    <View style={styles.container}>
      {/* Controlled TextInput */}
      <TextInput
        style={styles.input}
        placeholder="Enter username"
        placeholderTextColor={"black"}
        value={input}
        onChangeText={setInput}
      />

      {/* Display the name */}
      <Text style={{ color: "blue", marginTop: 10 }}>{name}</Text>

      {/* Button to update name */}
      <TouchableOpacity
        style={styles.buttonClick}
        onPress={() => setName("New Mohtashim")}
      >
        <Text>Click me</Text>
      </TouchableOpacity>

      {/* Passing props to TestName */}
      <TestName name={name} age={21} city={"Gujranwala"} state={"Punjab"} />
    </View>
  );
};

// Child Component (TestName)
const TestName = ({ name, age, city, state }) => {
  return (
    <View>
      <Text style={{ color: "red", marginTop: 20 }}>
        Name: {name} , Age: {age}, City: {city} , State: {state}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonClick: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    width: "80%",
    marginBottom: 10,
  },
});

export default TabTwoScreen;
