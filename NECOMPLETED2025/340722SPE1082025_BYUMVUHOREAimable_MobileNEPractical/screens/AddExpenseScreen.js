// screens/AddExpenseScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createExpense } from '../services/api';
import { useAuth } from '../state/AuthContext';
// For DatePicker: expo install @react-native-community/datetimepicker
// import DateTimePicker from '@react-native-community/datetimepicker'; // Uncomment if using

const AddExpenseScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date()); // Default to today
  const [loading, setLoading] = useState(false);

  // Basic Date Input - for a better UX, use DateTimePicker
  const [dateString, setDateString] = useState(new Date().toISOString().split('T')[0]);


  const handleSaveExpense = async () => {
    if (!name || !amount) {
      Alert.alert('Validation Error', 'Name and Amount are required.');
      return;
    }
    if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
        Alert.alert('Validation Error', 'Amount must be a positive number.');
        return;
    }

    setLoading(true);
    const expenseData = {
      name,
      amount: parseFloat(amount),
      description,
      category: category || 'General', // Default category if not set
      date: dateString, // Use the ISO string from manual input or DateTimePicker
      userId: user.id, // CRITICAL: Link expense to user
      // createdAt: new Date().toISOString(), // API service can also handle this
    };

    try {
      await createExpense(expenseData);
      Alert.alert('Success', 'Expense added successfully!');
      navigation.goBack(); // Go back to the list screen
    } catch (err) {
      console.error(err.response?.data || err.message);
      Alert.alert('Error', 'Failed to add expense. ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Expense Name / Title:</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., Groceries, Lunch"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Amount:</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., 50.75"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Description (Optional):</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="e.g., Weekly grocery shopping"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>Category (Optional):</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., Food, Transport (default: General)"
        value={category}
        onChangeText={setCategory}
      />
      
      <Text style={styles.label}>Date:</Text>
      <TextInput
        style={styles.input}
        placeholder="YYYY-MM-DD"
        value={dateString}
        onChangeText={setDateString}
        // Ideally, use a DateTimePicker here
      />
      {/* Example for DateTimePicker - needs more setup for show/hide logic
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(Platform.OS === 'ios');
            if (selectedDate) {
              setDate(selectedDate);
              setDateString(selectedDate.toISOString().split('T')[0]);
            }
          }}
        />
      )}
      <Button title="Select Date" onPress={() => setShowDatePicker(true)} />
      */}


      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={{marginTop: 20}}/>
      ) : (
        <Button title="Save Expense" onPress={handleSaveExpense} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top', // For Android
  },
});

export default AddExpenseScreen;