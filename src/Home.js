import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const Home = ({ navigation }) => {
  const [labs, setLabs] = useState([]);
  const [region, setRegion] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const getLocationAndFetchLabs = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Denied', 'Permission to access location was denied');
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        if (latitude && longitude) {
          setRegion({
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });

          setUserLocation({ latitude, longitude });
          fetchLabsFromFirestore(latitude, longitude);
        }
      } catch (error) {
        console.error('Error fetching location: ', error);
      }
    };

    getLocationAndFetchLabs();
  }, []);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // نصف قطر الأرض بالكيلومترات
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // المسافة بالكيلومترات
  };

  const fetchLabsFromFirestore = async (userLat, userLon) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'labs'));
      const labsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      const filteredLabs = labsData.filter(lab => {
        const labLatitude = lab.coordinates.latitude;
        const labLongitude = lab.coordinates.longitude;
        const distance = calculateDistance(userLat, userLon, labLatitude, labLongitude);
        return distance <= 20;
      });

      const labsWithDistance = filteredLabs.map(lab => {
        const labDistance = calculateDistance(userLat, userLon, lab.coordinates.latitude, lab.coordinates.longitude);
        return { ...lab, distance: labDistance.toFixed(2) };
      });

      setLabs(labsWithDistance);
    } catch (error) {
      console.error('Error fetching labs from Firestore: ', error);
      Alert.alert('Error', 'فشل في تحميل المخابر من Firestore.');
    }
  };

  const handleApply = (lab) => {
    navigation.navigate('LabDetails', { lab });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {labs.map((lab, index) => {
          if (lab.coordinates && lab.coordinates.latitude && lab.coordinates.longitude) {
            return (
              <View key={index} style={styles.labContainer}>
                <Text style={styles.labName}>{lab.name}</Text>
                <Text style={styles.description}>{lab.description}</Text>
                <Text style={styles.tools}>الأدوات: {lab.tools}</Text>
                <Text style={styles.hours}>ساعات العمل: {lab.hours}</Text>
                <Text style={styles.distance}>المسافة: {lab.distance} كم</Text>
                <TouchableOpacity style={styles.applyButton} onPress={() => handleApply(lab)}>
                  <Text style={styles.applyButtonText}>تقديم</Text>
                </TouchableOpacity>
              </View>
            );
          } else {
            console.warn('Invalid coordinates for lab:', lab.name);
            return null;
          }
        })}

        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddLab')}>
          <Text style={styles.addButtonText}>إضافة مختبر جديد</Text>
        </TouchableOpacity>
      </ScrollView>
      {region && (
        <MapView style={styles.map} region={region}>
          {userLocation && (
            <Marker
              coordinate={userLocation}
              title="موقعك الحالي"
              pinColor="red"
            />
          )}
          {labs.map((lab, index) => {
            if (lab.coordinates && lab.coordinates.latitude && lab.coordinates.longitude) {
              return (
                <Marker
                  key={index}
                  coordinate={{ latitude: lab.coordinates.latitude, longitude: lab.coordinates.longitude }}
                  title={lab.name}
                  description={lab.description}
                />
              );
            } else {
              console.warn('Invalid coordinates for lab:', lab.name);
              return null;
            }
          })}
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  labContainer: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  labName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    marginTop: 5,
    fontSize: 14,
    color: '#666',
  },
  tools: {
    marginTop: 5,
    fontSize: 14,
    color: '#666',
  },
  hours: {
    marginTop: 5,
    fontSize: 14,
    color: '#666',
  },
  distance: {
    marginTop: 5,
    fontSize: 14,
    color: '#666',
  },
  applyButton: {
    marginTop: 10,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  applyButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  addButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  map: {
    width: '100%',
    height: 400,
    marginTop: 20,
  },
});

export default Home;
