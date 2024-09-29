import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';

const BookService = ({ route, navigation }) => {
  const { service } = route.params; // Receive service details

  const handleBooking = () => {
    // Here you can implement the logic to save the booking
    Alert.alert("حجز ناجح", `تم حجز الخدمة: ${service.name} بنجاح!`);
    // Optionally navigate back or to a confirmation screen
    navigation.goBack(); // Or navigate to another screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>حجز الخدمة</Text>
      <Text style={styles.text}>اسم الخدمة: {service.name}</Text>
      <Text style={styles.text}>السعر: {service.price} دولار</Text>
      <Text style={styles.text}>الوصف: {service.description}</Text>
      {/* Booking confirmation button */}
      <Button title="تأكيد الحجز" onPress={handleBooking} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginVertical: 5,
  },
});

export default BookService;
