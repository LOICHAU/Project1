/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Title, Text, View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import {TouchableOpacity} from "react-native-gesture-handler";
import { useForm } from "react-hook-form" ;

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        getWeather()
    }, []);
    function getWeather(lat, lon){
        fetch('http://api.openweathermap.org/data/2.5/air_pollution?lat='+lat+'&lon='+lon+'&appid=08e5a19eb67b152c39695604f761586e')
        .then(data=>data.json())
        .then((json) => setData(json.list))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    };
    const { register, handleSubmit, setValue, getValues} = useForm();
    useEffect(() => {
        register('Lat');
        register('Lon');
    }, [register]);
      
    return (
    <View style = {styles.viewContainer}>
            {isLoading ? <ActivityIndicator/> : (
                <FlatList style = {{position: 'absolute', top:550, left: 155}}
                    data={data}
                    keyExtractor={({ id }, index) => index.toString()}
                    renderItem={({ item, }) => (
                        <View>
                            <Text>CO - {item.components.co}</Text>
                            <Text>NO - {item.components.no}</Text>
                            <Text>NO2 - {item.components.no2}</Text>
                            <Text>O3 - {item.components.o3}</Text>
                            <Text>SO2 - {item.components.so2}</Text>
                            <Text>PM2_5 - {item.components.pm2_5}</Text>
                            <Text>PM10 - {item.components.pm10}</Text>
                            <Text>NH3 - {item.components.nh3}</Text>
                        </View>
                    )}
                />
            )}
            <Text style={{position: 'absolute', top: 90, left: 50, fontSize: 40}}>The Weather App</Text>
            <TextInput
                style={{
                paddingHorizontal:10,
                position: 'absolute',
                top: 180,
                left: 27,
                fontSize: 25,
                height: 70,
                width: 360,
                color: 'black',
                borderColor: 'silver',
                backgroundColor: 'white',
                borderWidth: 1
                }}
                placeholder="Latitude"
                onChangeText={text => {setValue('Lat', text)}}
            />
            <TextInput
                style={{
                paddingHorizontal:10,
                position: 'absolute',
                top: 250,
                left: 27,
                fontSize: 25,
                height: 70,
                width: 360,
                color: 'black',
                borderColor: 'silver',
                backgroundColor: 'white',
                borderWidth: 1
                }}
                placeholder="Longitude"
                onChangeText={text => {setValue('Lon', text)}}
            />
            <Text style = {{position: 'absolute', top: 340, left: 35, right: 25}}>*Please fill in your wanted
                latitude and longitude then press the SUBMIT button below to see there current air pollution.</Text>
            <Button
                title="S U B M I T"
                onPress={()=>getWeather(getValues("Lat"), getValues("Lon"))}
            />
    </View>
  );
};


const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    height:200,
    alignItems: 'center',
    justifyContent: 'center'
    
  },
  buttonContainer: {
      
    elevation: 1,
    backgroundColor: "grey",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    position: 'absolute',
    top: 300,
    left: 80
    
  },
  buttonText: {
    marginHorizontal: 45,
    color: "#fff",
    fontWeight: "200",
    paddingHorizontal: 20,
    fontSize: 20,
    alignSelf: "center",
    textTransform: "uppercase"
  },
  text: {
    left: 150
  }
});

export default App;
