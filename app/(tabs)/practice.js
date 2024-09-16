import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const Practice = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({ description: "", temperature: "" });
  const [background, setBackground] = useState(
    require("./../../assets/images/default.jpg")
  );
  const fadeAnim = useState(new Animated.Value(0))[0];

  const fetchWeather = async (cityName) => {
    const apiKey = "633806019e361ccb7e012a3e6130a2e7";
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();

      if (data.cod === 200) {
        setWeather({
          temperature: data.main.temp,
          description: data.weather[0].description,
        });
        setBackground(getBackgroundImage(data.weather[0].main));
        fadeIn();
      } else {
        setWeather({ temperature: "", description: "" });
        Alert.alert("Error", "City not found");
      }
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  const getBackgroundImage = (weatherMain) => {
    switch (weatherMain.toLowerCase()) {
      case "clear":
        return require("./../../assets/images/clear.jpg");
      case "clouds":
        return require("./../../assets/images/cloudy.jpg");
      case "rain":
        return require("./../../assets/images/rainy.jpg");
      case "snow":
        return require("./../../assets/images/snowy.jpg");
      default:
        return require("./../../assets/images/default.jpg");
    }
  };

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const DisplayWeather = ({ temperature, description }) => {
    return (
      <Animated.View style={[styles.weatherContainer, { opacity: fadeAnim }]}>
        <Text style={styles.tempText}>{temperature}°C</Text>
        <Text style={styles.descText}>{description}</Text>
        <Icon name={getWeatherIcon(description)} size={50} color="#FFF" />
      </Animated.View>
    );
  };

  const getWeatherIcon = (description) => {
    if (description.includes("clear")) return "sunny-outline";
    if (description.includes("cloud")) return "cloud-outline";
    if (description.includes("rain")) return "rainy-outline";
    if (description.includes("snow")) return "snow-outline";
    return "thermometer-outline";
  };

  return (
    <ImageBackground source={background} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>Weather App</Text>
        <View style={styles.inputContainer}>
          <Icon
            name="search-outline"
            size={24}
            color="#FFF"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter city"
            placeholderTextColor={"#FFF"}
            value={city}
            onChangeText={setCity}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => fetchWeather(city)}
        >
          <Text style={styles.buttonText}>Search Weather</Text>
        </TouchableOpacity>
        {weather.temperature ? (
          <DisplayWeather
            temperature={weather.temperature}
            description={weather.description}
          />
        ) : (
          <Text style={styles.noDataText}>Enter a city to see the weather</Text>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 30,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 20,
    width: "80%",
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "#FFF",
    fontSize: 18,
    paddingVertical: 10,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  noDataText: {
    marginTop: 20,
    color: "#FFF",
    fontSize: 18,
  },
  weatherContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  tempText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 10,
  },
  descText: {
    fontSize: 24,
    color: "#FFF",
    marginBottom: 15,
  },
});

export default Practice;
