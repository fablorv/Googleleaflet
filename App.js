import { StyleSheet, Text, View,Button, Alert , TextInput, ScrollView, SafeAreaView, Dimensions, TouchableOpacity} from 'react-native';
import MapView, {Geojson, Marker, Polyline} from 'react-native-maps';
import * as Location from 'expo-location';
import React , {useState, useEffect} from 'react';
import axios from 'axios'
import { LatLng, LeafletView, mapShapes } from 'react-native-leaflet-view';
import { Accelerometer } from 'expo-sensors';

export default function App() {
	  
	const [backendapi, setBackendapi] = useState('wawiting on data')
	const [fetcho , setFetcho] = useState('waiting on fetch')
	const [respondo, setRespondo] = useState("")
	const [errorMsg, setErrorMsg] = useState(null)
	const [location, setLocation] = useState(null)
	const [tanlocation , setTanlocation] = useState({longitude:1.1, latitude: 2.2})
	const [presslocation , setPresslocation] = useState({longitude:36.165329, latitude:5.844287})
	const [presslocationone , setPresslocationone] = useState({longitude:0, latitude:1})
	const [presslocationtwo, setPresslocationtwo] = useState({longitude:10.22345, latitude:90.22214})
	const [presslocationthree, setPresslocationthree] = useState({longitude:20.22345, latitude:80.22214})
	const [longitudeuser, setLongitudeuser] = useState(10)
	const [latitudeuser, setLatitudeuser] = useState(24)
	const [map , setMap] = useState(true)
	const [screen , setScreen] = useState()	
	const [ifscreenchange, setIfscreenchange] = useState(false)
		const [{ x, y, z }, setData] = useState({
	    x: 0,
	    y: 0,
	    z: 0,
	  });
	  const [subscription, setSubscription] = useState(null);

	  const _slow = () => Accelerometer.setUpdateInterval(1000);
	  const _fast = () => Accelerometer.setUpdateInterval(16);

	  const _subscribe = () => {
	    setSubscription(
	      Accelerometer.addListener(setData)
	    );
	  };

	  const _unsubscribe = () => {
	    subscription && subscription.remove();
	    setSubscription(null);
	  };

	  useEffect(() => {
	    _subscribe();
	    return () => _unsubscribe();
	  }, []);
	const myPlace = {
	  type: 'FeatureCollection',
	  features: [
	    {
	      type: 'Feature',
	      properties: {},
	      geometry: {
		type: 'Point',
		coordinates: [presslocation.longitude, presslocation.latitude],
	      }
	    }
	  ]
	};
	const getbackend = async () =>{  

	  	setTanlocation({longitude: longitudeuser, latitude: latitudeuser})
	      let currentlocation = await location
	      let cords = await  currentlocation.coords.latitude
	      
	       await axios.get('http://192.168.42.111:3000/heyapp', {params: {currentlat: location, longo: longitudeuser, lato: latitudeuser  }}).then(res => setBackendapi(res.data)).catch(err=> setBackendapi(err))

	}
  	const getquote = () =>{
	    axios.get('https://api.api-ninjas.com/v1/quotes?catergory=happiness', { headers:{'X-api-key': 'Znxd91hEUU2zcdHh720/4Q==krP7HfL5hRB9mNdK'}}).then(res => setRespondo(res)).catch(err => setRespondo(err))
	  }
	  useEffect(() => {
	    (async () => {
	      let {status} = await Location.requestForegroundPermissionsAsync();
	      if ( status !== 'granted'){
		setErrorMsg('permission to location denied')
		return;
	      }
	      let location = await Location.getCurrentPositionAsync({})
	      setLocation(location);
	    })()

	  }, [])
	    Dimensions.addEventListener('change', ()=>{
		setIfscreenchange(!ifscreenchange)
	        let dm = Dimensions.get('screen')
		setScreen(dm)
	    })

	  useEffect(() => {
		setPresslocationtwo(presslocationone)
	  },[presslocationone])
	  	  
      let text = ' awaiting...'
      let obj1 = 'crazy obj'
      let obj2 = 'its working'
      let obj3 = 'finally'
      if (errorMsg){
	text = errorMsg
      }else if (location){
	text = JSON.stringify(location);
	
	obj1 = location.timestamp
	obj2 = location.coords.latitude
	obj3 = location.coords.longitude
	};
	
  return (
      <SafeAreaView style={styles.container}>

  	<ScrollView style={styles.scrollView}>
	    <View>
	      <Text> choose which map (googlemap or leaflet) </Text>
	     <Button title="choose map" onPress={()=> setMap(!map)} color="blue" /> 
	    </View>
	    <View style={styles.container}  >
		{ map ? ( location ? 
		   <MapView style={{height: '70%', width: '100%', marginTop:250}}  onPress={ (event) => setPresslocationone(event.nativeEvent.coordinate)}>
			   <Geojson 
				geojson={myPlace} 
				strokeColor="red"
				fillColor="blue"
				strokeWidth={2}
				zIndex={0.1}
			      />
			  <Marker coordinate ={{latitude: presslocationtwo.latitude, longitude: presslocationtwo.longitude}} pinColor = {"purple"} title={"more test"} description={"this is press locatio ntwo"}/>
			  <Marker  coordinate ={{latitude: location.coords.latitude, longitude: location.coords.longitude}} pinColor = {"blue"} title={"help"} description={"press location "}/>
			  <Marker  coordinate ={{latitude: tanlocation.latitude, longitude: tanlocation.longitude}} pinColor = {"wheat"} title={"help"} description={"press location "}/>
			<Polyline coordinates={[location.coords, presslocationone]} strokeColor={"#000"} strokeWidth={3} lineDashPattern={[1]} /> 
			     
			
			  <Marker  coordinate ={{latitude: tanlocation.latitude +1 , longitude: tanlocation.longitude +1 }} pinColor = {"tan"} title={"more test"} description={"set point"}/>
		    </MapView> : <Text>text</Text> ) :  ( location ? <View>
									     <LeafletView
										mapLayers={[
											{ url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' }
										]}
										mapMarkers={[
											{
											  position: {
											    lat: tanlocation.latitude,
											    lng: tanlocation.longitude,
											  },
											  title: "your home",
											  icon: "https://unpkg.com/leaflet@1.9.2/dist/images/marker-icon-2x.png",
											  size: [23, 23],
											},
										]}
											mapCenterPosition={{
												lat: tanlocation.latitude,
												lng: tanlocation.longitude,
											  }}
									    />
									    <View style={styles.item}> 
										    <TextInput
										      style={{height: 20, backgroundColor: '#61dafb', marginTop:10}}
										      placeholder="latitude"
										      onChangeText={newTextb => setLatitudeuser(newTextb)}

										    />
										    <TextInput
										      style={{height: 20,  backgroundColor: '#61dafb',marginTop:10}}
										      placeholder="longitude"
										      onChangeText={newTexta => setLongitudeuser(newTexta)}/>
										    <Button title="get backend" onPress={getbackend} color="blue" />
									    </View>
									</View> : <Text> no location yet </Text>
							) }

		<View style={styles.item}>
		      <Text style={styles.texto}>{respondo ?  respondo.data[0].quote : 'look for quote'} </Text>
		
		      <Button title="get a quote" onPress={getquote} color="green" /> 
		</View>
		
	

	    </View>
	    <View style={styles.item}>
		<Text> {screen ? <Text>{JSON.stringify(screen)} </Text> : <Text> nothing yet </Text>} </Text>
	    </View>
		      
	      
	     
	    
	    	<View style={styles.container}>
		      <Text style={styles.text}>Accelerometer: (in gs where 1g = 9.81 m/s^2)</Text>
		      <Text style={styles.text}>x: {x}</Text>
		      <Text style={styles.text}>y: {y}</Text>
		      <Text style={styles.text}>z: {z}</Text>
		      <View style={styles.buttonContainer}>
			<TouchableOpacity onPress={subscription ? _unsubscribe : _subscribe} style={styles.button}>
			  <Text>{subscription ? 'On' : 'Off'}</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={_slow} style={[styles.button, styles.middleButton]}>
			  <Text>Slow</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={_fast} style={styles.button}>
			  <Text>Fast</Text>
			</TouchableOpacity>
		      </View>
		    </View>
          </ScrollView>
          
        </SafeAreaView>


  );
}

const styles = StyleSheet.create({
	texto:{
		marginTop:50,

	},
		
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:10,

  },
  item: {
    borderWidth: 4,
    borderColor: 'rgba(0,0,0,0.2)',
    height:400,
    borderRadius: 8,
  },
});
