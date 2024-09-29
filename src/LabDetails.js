import React from 'react';
import { StyleSheet, Text, View, Button, Alert, FlatList } from 'react-native';

const LabDetails = ({ route, navigation }) => {
  const { lab } = route.params;

  // Check if lab details exist
  if (!lab) {
    Alert.alert("خطأ", "لم يتم العثور على تفاصيل المختبر!");
    navigation.goBack();
    return null;
  }

  // Function to display services in the list
  const renderServiceItem = ({ item }) => (
    <View style={styles.serviceItem}>
      <Text style={styles.serviceName}>{item.name}</Text>
      <Text style={styles.servicePrice}>السعر: {item.price} دولار</Text>
      <Text style={styles.serviceDescription}>{item.description}</Text>
      {/* Button to navigate to BookService with selected service */}
      <Button 
        title="احجز الآن" 
        onPress={() => navigation.navigate('BookService', { service: item })} 
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.labName}>{lab.name}</Text>
      <Text style={styles.description}>{lab.description}</Text>
      <Text style={styles.tools}>الأدوات: {lab.tools || 'غير متوفرة'}</Text>
      <Text style={styles.hours}>ساعات العمل: {lab.hours || 'غير متوفرة'}</Text>
      <Text style={styles.coordinates}>خط العرض: {lab.coordinates?.latitude || 'غير متوفر'}</Text>
      <Text style={styles.coordinates}>خط الطول: {lab.coordinates?.longitude || 'غير متوفر'}</Text>

      <Text style={styles.sectionTitle}>الخدمات المتاحة:</Text>
      
      {lab.services && lab.services.length > 0 ? (
        <FlatList
          data={lab.services}
          renderItem={renderServiceItem}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text style={styles.noServices}>لا توجد خدمات متاحة حالياً</Text>
      )}

      <Button title="رجوع" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  labName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    color: '#666',
  },
  tools: {
    fontSize: 16,
    marginBottom: 10,
    color: '#666',
  },
  hours: {
    fontSize: 16,
    marginBottom: 10,
    color: '#666',
  },
  coordinates: {
    fontSize: 14,
    marginBottom: 5,
    color: '#888',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    color: '#333',
  },
  serviceItem: {
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  servicePrice: {
    fontSize: 16,
    color: '#555',
  },
  serviceDescription: {
    fontSize: 14,
    color: '#777',
  },
  noServices: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default LabDetails;
