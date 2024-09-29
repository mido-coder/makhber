import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const AddLab = ({ navigation }) => {
  const [newLabName, setNewLabName] = useState('');
  const [newLabDescription, setNewLabDescription] = useState('');
  const [newLabTools, setNewLabTools] = useState('');
  const [newLabHours, setNewLabHours] = useState('');
  const [newLabCoordinates, setNewLabCoordinates] = useState({ latitude: '', longitude: '' });
  const [serviceName, setServiceName] = useState('');
  const [servicePrice, setServicePrice] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [services, setServices] = useState([]);

  const addNewLab = async () => {
    const { latitude, longitude } = newLabCoordinates;
    if (!newLabName || !latitude || !longitude || !newLabDescription || !newLabTools || !newLabHours) {
      Alert.alert('Error', 'يرجى إدخال جميع البيانات.');
      return;
    }

    const newLab = {
      name: newLabName,
      description: newLabDescription,
      tools: newLabTools,
      hours: newLabHours,
      coordinates: {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      },
      services: services, // إضافة الخدمات إلى كائن المختبر
    };

    try {
      await addDoc(collection(db, 'labs'), newLab);
      Alert.alert('Success', 'تم إضافة المختبر الجديد.');
      navigation.goBack(); // الرجوع إلى الصفحة السابقة بعد الإضافة
    } catch (error) {
      console.error('Error adding new lab: ', error);
      Alert.alert('Error', 'فشل في إضافة المختبر.');
    }
  };

  const addService = () => {
    if (!serviceName || !servicePrice || !serviceDescription) {
      Alert.alert('Error', 'يرجى إدخال تفاصيل الخدمة.');
      return;
    }

    const newService = {
      name: serviceName,
      price: servicePrice,
      description: serviceDescription,
    };

    setServices((prevServices) => [...prevServices, newService]); // تأكد من تحديث الخدمات
    setServiceName('');
    setServicePrice('');
    setServiceDescription('');
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="اسم المختبر"
        value={newLabName}
        onChangeText={setNewLabName}
      />
      <TextInput
        style={styles.input}
        placeholder="وصف المختبر"
        value={newLabDescription}
        onChangeText={setNewLabDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="الأدوات المستخدمة"
        value={newLabTools}
        onChangeText={setNewLabTools}
      />
      <TextInput
        style={styles.input}
        placeholder="ساعات العمل"
        value={newLabHours}
        onChangeText={setNewLabHours}
      />
      <TextInput
        style={styles.input}
        placeholder="خط العرض"
        value={newLabCoordinates.latitude}
        onChangeText={(text) => setNewLabCoordinates({ ...newLabCoordinates, latitude: text })}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="خط الطول"
        value={newLabCoordinates.longitude}
        onChangeText={(text) => setNewLabCoordinates({ ...newLabCoordinates, longitude: text })}
        keyboardType="numeric"
      />

      {/* إدخال بيانات الخدمة */}
      <TextInput
        style={styles.input}
        placeholder="اسم الخدمة"
        value={serviceName}
        onChangeText={setServiceName}
      />
      <TextInput
        style={styles.input}
        placeholder="سعر الخدمة"
        value={servicePrice}
        onChangeText={setServicePrice}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="وصف الخدمة"
        value={serviceDescription}
        onChangeText={setServiceDescription}
      />
      <TouchableOpacity style={styles.addButton} onPress={addService}>
        <Text style={styles.addButtonText}>إضافة خدمة</Text>
      </TouchableOpacity>

      {/* عرض قائمة الخدمات المضافة */}
      {services.length > 0 && (
        <View>
          <Text style={styles.sectionHeader}>الخدمات المضافة:</Text>
          {services.map((service, index) => (
            <View key={index} style={styles.serviceContainer}>
              <Text style={styles.serviceText}>اسم الخدمة: {service.name}</Text>
              <Text style={styles.serviceText}>السعر: {service.price}</Text>
              <Text style={styles.serviceText}>الوصف: {service.description}</Text>
            </View>
          ))}
        </View>
      )}

      <TouchableOpacity style={styles.addButton} onPress={addNewLab}>
        <Text style={styles.addButtonText}>إضافة مختبر</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
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
  serviceContainer: {
    marginVertical: 5,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  serviceText: {
    fontSize: 14,
    color: '#333',
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
});

export default AddLab;
