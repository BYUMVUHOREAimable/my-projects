// screens/EditExpenseScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getExpenseById, updateExpenseById } from '../services/api';

const EditExpenseScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { expenseId } = route.params;

  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [dateString, setDateString] = useState(''); // YYYY-MM-DD
  const [originalExpense, setOriginalExpense] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        setLoading(true);
        const expense = await getExpenseById(expenseId);
        setName(expense.name || '');
        setAmount(String(expense.amount) || ''); // Ensure amount is string for input
        setDescription(expense.description || '');
        setCategory(expense.category || '');
        // Ensure dateString is correctly formatted from either 'date' or 'createdAt'
        let fetchedDate = expense.date || expense.createdAt;
        setDateString(fetchedDate ? new Date(fetchedDate).toISOString().split('T')[0] : '');
        setOriginalExpense(expense);
      } catch (err) {
        console.error("Fetch expense error:", err);
        Alert.alert('Error', 'Failed to load expense details for editing.');
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    };
    fetchExpense();
  }, [expenseId, navigation]);

  const handleUpdateExpense = async () => {
    if (!name.trim() || !amount.trim()) {
      Alert.alert('Validation Error', 'Name and Amount are required.');
      return;
    }
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      Alert.alert('Validation Error', 'Amount must be a positive number.');
      return;
    }
    
    setSaving(true);
    const expenseData = {
      ...originalExpense, // Keep other fields like id, userId, createdAt
      name: name.trim(),
      amount: numericAmount,
      description: description.trim(),
      category: category.trim() || 'General', // Default category if empty
      date: dateString,
    };

    try {
      await updateExpenseById(expenseId, expenseData);
      Alert.alert('Success', 'Expense updated successfully!');
      // Navigate back to ExpenseList, signaling a refresh.
      // The list screen should listen for this param.
      navigation.navigate('ExpenseList', { refresh: true });
    } catch (err) {
      console.error("Update expense error:", err.response?.data || err.message);
      Alert.alert('Error', 'Failed to update expense. ' + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <ActivityIndicator style={styles.centered} size="large" color="#007bff" />;
  }

  if (!originalExpense) { // Should not happen if loading is false and no error, but good check
    return <Text style={styles.centered}>Expense data not available.</Text>;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.headerTitle}>Edit Expense</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Expense Name / Title:</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="e.g., Lunch with client" />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Amount:</Text>
        <TextInput style={styles.input} value={amount} onChangeText={setAmount} keyboardType="numeric" placeholder="e.g., 25.50" />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Category (Optional):</Text>
        <TextInput style={styles.input} value={category} onChangeText={setCategory} placeholder="e.g., Food, Travel" />
      </View>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Date:</Text>
        <TextInput style={styles.input} placeholder="YYYY-MM-DD" value={dateString} onChangeText={setDateString} />
        {/* Consider using a DateTimePicker for better UX */}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Description (Optional):</Text>
        <TextInput 
            style={[styles.input, styles.textArea]} 
            value={description} 
            onChangeText={setDescription} 
            multiline 
            placeholder="e.g., Meeting details, items purchased"
        />
      </View>

      {saving ? (
        <ActivityIndicator size="large" color="#007bff" style={styles.spinner} />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleUpdateExpense}>
            <Text style={styles.buttonText}>Update Expense</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    padding: 20,
  },
  centered: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#343a40',
    textAlign: 'center',
    marginBottom: 25,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: { 
    fontSize: 16, 
    marginBottom: 8, 
    color: '#495057', 
    fontWeight: '500' 
  },
  input: { 
    backgroundColor: '#fff', 
    borderWidth: 1, 
    borderColor: '#ced4da', 
    paddingHorizontal: 15, 
    paddingVertical: 12, 
    borderRadius: 8, 
    fontSize: 16,
    color: '#495057',
  },
  textArea: { 
    height: 100, 
    textAlignVertical: 'top' 
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20, 
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  spinner: {
    marginTop: 20,
    marginBottom: 20,
  }
});

export default EditExpenseScreen;