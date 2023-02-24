import { StyleSheet, Text, View,Button, Alert , TextInput, ScrollView, SafeAreaView, Dimensions, TouchableOpacity, Pressable} from 'react-native';
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
	const [longitudeuser, setLongitudeuser] = useState(10)
	const [latitudeuser, setLatitudeuser] = useState(24)
	const [map , setMap] = useState(true)
	const [mapviewp,setMapviewp] = useState({height: '100%', width: '100%'})
	const [dissapear, setDissapear] = useState({flex: 1, backgroundColor: 'white', marginTop:'2%'})
	const [quotestyle, setQuotestyle] = useState({flex: 2, backgroundColor: 'white', marginTop:'10%'})
	const [ifscreenchange, setIfscreenchange] = useState('0deg')
		const [{ x, y, z }, setData] = useState({
	    x: 0,
	    y: 0,
	    z: 0,
	  });
	  const [subscription, setSubscription] = useState(null);

	  const _slow = () => Accelerometer.setUpdateInterval(1000);

	  const _subscribe = () => {

	    setSubscription(
	      Accelerometer.addListener(setData)
	    );

	    const _slow = () => Accelerometer.setUpdateInterval(1000);
	  };

	  const _unsubscribe = () => {
	    subscription && subscription.remove();
	    setSubscription(null);
	  };

	  useEffect(() => {
	    _subscribe();
	    return () => _unsubscribe();
	  }, []);
	useEffect(()=>{

	  const howscreen = ()=>{
	    if(x >= 0.6 && x <= 1.1){
		setMapviewp({height: '100%',
		  	 width: '220%',
		  	 marginLeft: -200,
		  	 marginTop:60,
		  	 maringBottom:-50})
		  	 setDissapear({display:'none'})
		  	 setQuotestyle({display:'none'})
	      setIfscreenchange('90deg')
	    }else if(x <= -0.6 && x >= -1.1){
	      setIfscreenchange('-90deg')
	      setMapviewp({height: '100%',
  	 width: '220%',
  	 marginLeft: -200,
  	 marginTop:60,
  	 maringBottom:-50})
  	 	setDissapear({display:'none'})
  	 	setQuotestyle({display:'none'})
	    }else {setIfscreenchange('0deg'); setMapviewp({height: '100%', width: '100%'}); setDissapear({flex: 1, backgroundColor: 'white', marginTop:'2%'});setQuotestyle({flex: 2, backgroundColor: 'white', marginTop:'10%'})}
	  }
	  howscreen()
	},[z])
	
	const getbackend = async () =>{  

	      setTanlocation({longitude: longitudeuser, latitude: latitudeuser}) 
	       await axios.get('http://192.168.42.142:3000/heyapp', {params: {currentlat: location, longo: longitudeuser, lato: latitudeuser  }}).then(res => setBackendapi(res.data)).catch(err=> setBackendapi(err))

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
	      setTanlocation(location) 
	      const _slow = () => Accelerometer.setUpdateInterval(1000);
	      _slow()

	      setTanlocation({longitude: location.coords.longitude, latitude: location.coords.latitude}) 
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

	      <View style={[styles.container, {transform:[{rotateZ:ifscreenchange}],}]}>
	      	    <Pressable style={styles.button} onPress={()=> setMap(!map)}>
			<Text style={styles.text} > {!map ? <Text> google maps</Text> : <Text> leaflet </Text>} </Text>
		    </Pressable>

		<View style={[{flex: 1}, styles.elementsContainer]}>
		  <View style={{flex: 3, backgroundColor: '#EE2C38'}}>
		  
		  	{ map ? ( location ? 
		   <MapView style={mapviewp}  onPress={ (event) => setPresslocationone(event.nativeEvent.coordinate)}>

			  <Marker  coordinate ={{latitude: location.coords.latitude, longitude: location.coords.longitude}} pinColor = {"blue"} title={"help"} description={"press location "}/>

			     
			
		    </MapView> : <Text>text</Text> ) :  ( location ? <View style={mapviewp}>
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
										    
									    </View>
									</View> : <Text> no location yet </Text>
							) }
		  </View>
		  { !map ? 
		  <View style={dissapear}> 
		  	<TextInput
				style={{height: 30,width:'45%',borderRadius:5, borderWidth:1, marginBottom:3, paddingLeft:10}}
				placeholder="latitude"
				onChangeText={newTextb => setLatitudeuser(newTextb)}

			      />
			      <TextInput
				style={{height: 30,width:'45%',borderRadius:5, borderWidth:1,paddingLeft:10}}
				placeholder="longitude"
				onChangeText={newTexta => setLongitudeuser(newTexta)}/>
				<Pressable style={styles.buttono} onPress={getbackend}>
					<Text style={styles.text} > GO TO LOCATION</Text>
				 </Pressable>


			      
		  </View> : null}

			  <View style={quotestyle} > 
			  	<Text style={styles.text,{color:'black'}}>{respondo.status == 200 ?  respondo.data[0].quote : 'click the button to '} </Text>
			  	<Pressable style={styles.buttono} onPress={getquote}>
					<Text style={styles.text}> get quote </Text>
				 </Pressable>


			  </View>

		</View>
	      </View>
	


          



  );
}

const styles = StyleSheet.create({
	container: {
    marginTop: 48,
    flex: 1
  },
  headerStyle: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: '100',
    marginBottom: 12
  },
  elementsContainer: {
    backgroundColor: 'white',
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 24
  },
  mapviewstyle:{
  	height: '100%',
  	 width: '100%',
  	 
  	 
  },
  mapviewstylep:{
  	height: '200%',
  	 width: '220%',
  	 marginLeft: -200,
  	 marginTop:50,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    width:'50%',
    marginLeft: '25%',
  },
  text: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    paddingTop:5,
  },
  buttono: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
	

  },
});
