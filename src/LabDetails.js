import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';

const LabDetails = ({ route, navigation }) => {
  const { lab } = route.params;

  // تحقق مما إذا كانت تفاصيل المختبر موجودة
  if (!lab) {
    Alert.alert("خطأ", "لم يتم العثور على تفاصيل المختبر!");
    navigation.goBack();
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.labName}>{lab.name}</Text>
      <Text style={styles.description}>{lab.description}</Text>
      <Text style={styles.tools}>الأدوات: {lab.tools || 'غير متوفرة'}</Text>
      <Text style={styles.hours}>ساعات العمل: {lab.hours || 'غير متوفرة'}</Text>
      <Text style={styles.coordinates}>خط العرض: {lab.coordinates?.latitude || 'غير متوفر'}</Text>
      <Text style={styles.coordinates}>خط الطول: {lab.coordinates?.longitude || 'غير متوفر'}</Text>
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
});

export default LabDetails;

