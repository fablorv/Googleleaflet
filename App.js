import { StyleSheet, Text, View,Button, Alert , TextInput, ScrollView, SafeAreaView} from 'react-native';
import MapView, {Geojson, Marker, Polyline} from 'react-native-maps';
import * as Location from 'expo-location';
import React , {useState, useEffect} from 'react';
import axios from 'axios'
import { LatLng, LeafletView, mapShapes } from 'react-native-leaflet-view';












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
	const getbackend = () =>{  
		axios.get('http://192.168.42.47:3000/heyapp').then(res => setBackendapi(res.data)).catch(err=> setBackendapi(err))

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
	  useEffect(() => {
		setPresslocationtwo(presslocationone)
	  },[presslocationone])
	  const userchoice = () =>{
	  	setTanlocation({longitude: longitudeuser, latitude: latitudeuser})
	  }
	  	  
   
     // the app will do two things 
     // first is get ur location and save it in the sqlite 
     // second is u can enter a latitude and longitude and you gonna get a location
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
	    <View style={styles.container}  >
		{ location ? 
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
		    </MapView> : <Text>text</Text>}
		<View style={styles.item}>
		      <Text style={styles.texto}>{respondo ?  respondo.data[0].quote : 'look for quote'} </Text>
		      <Button title="get a quote" onPress={getquote} color="green" /> 
		</View>
		<View style={styles.item}>
		  <Text style={styles.texto} > your timestamp: {obj1} , your time latitude: {obj2} , your longitude: {obj3} , this is what the user pressed: {JSON.stringify(presslocationtwo)} , this is what second time pressed: {JSON.stringify(presslocationthree)} new one is like the thing from marker {JSON.stringify(presslocationthree)}, this is the speed of the thing ig  
		  </Text>
			 
		
		</View>
	

	    </View>
	    	<View style={styles.item}> 
		  <TextInput
		      style={{height: 20, backgroundColor: '#61dafb', marginTop:10}}
		      placeholder="latitude"
		      onChangeText={newTextb => setLatitudeuser(newTextb)}

		    />
		    <TextInput
		      style={{height: 20,  backgroundColor: '#61dafb',marginTop:10}}
		      placeholder="longitude"
		      onChangeText={newTexta => setLongitudeuser(newTexta)}

		    />
		   

		</View>
		<View style={styles.item}>
			{ location ? 
				 <LeafletView
			    	mapLayers={[
					{ url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' }
				]}
				mapMarkers={[
					{
					  position: {
					    lat: location.coords.latitude,
					    lng: location.coords.longitude,
					  },
					  title: "Hôtel-Dieu de Paris",
					  icon: "https://unpkg.com/leaflet@1.9.2/dist/images/marker-icon-2x.png",
					  size: [50, 82],
					  iconAnchor: [25, 82],
					},
					
			     	]}
			     		mapCenterPosition={{
			     			lat: location.coords.latitude,
					    	lng: location.coords.longitude,
					  }}
				    // The rest of your props, see the list below
				/> : <Text> 'no location yet' </Text> }
			
		</View>
	      <Text> what if i add more shit ig </Text>
	      
	      <Text>this is from express {JSON.stringify(backendapi)} </Text>
	      
	      <Button title="get location" onPress={userchoice} color="yellow" /> 
	      
	      <Text> fetch data here : {JSON.stringify(tanlocation)}, </Text>
	      
	     <Button title="get backend" onPress={getbackend} color="blue" /> 
	     
	    
	    	
          </ScrollView>
          
        </SafeAreaView>


  );
}

const styles = StyleSheet.create({
	texto:{
		marginTop:100,

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
  },
  item: {
    borderWidth: 4,
    borderColor: 'rgba(0,0,0,0.2)',
    height:400,
    borderRadius: 8,
  },
});
