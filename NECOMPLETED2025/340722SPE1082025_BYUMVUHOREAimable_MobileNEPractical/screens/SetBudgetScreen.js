// screens/SetBudgetScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, FlatList, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native'; // Removed ScrollView
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../state/AuthContext';
import { updateUser } from '../services/api';
import { Ionicons } from '@expo/vector-icons';

const SetBudgetScreen = () => {
  const navigation = useNavigation();
  const { user, updateUserContext } = useAuth();
  const [budgets, setBudgets] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [currentCategory, setCurrentCategory] = useState('');
  const [currentAmount, setCurrentAmount] = useState('');
  const [currentPeriod, setCurrentPeriod] = useState('Monthly');
  const [formVisible, setFormVisible] = useState(false);
  const [savingAll, setSavingAll] = useState(false);

  useEffect(() => {
    if (user && user.budgets) {
      setBudgets([...user.budgets]);
    } else {
      setBudgets([]);
    }
  }, [user]);

  const handleSaveAllBudgets = async () => { /* ... (same as before) ... */ 
    if (!user) return;
    setSavingAll(true);
    const updatedUser = {
      ...user,
      budgets: budgets,
    };

    try {
      const response = await updateUser(user.id, updatedUser);
      updateUserContext(response);
      Alert.alert('Success', 'Budgets updated successfully!');
      navigation.goBack();
    } catch (err) {
      console.error('Failed to save budgets:', err.response?.data || err.message);
      Alert.alert('Error', 'Failed to save budgets. ' + (err.response?.data?.message || err.message));
    } finally {
      setSavingAll(false);
    }
  };
  const handleAddOrUpdateItemToList = () => { /* ... (same as before) ... */ 
    if (!currentCategory.trim() || !currentAmount.trim()) {
      Alert.alert('Invalid Input', 'Category and Amount are required.');
      return;
    }
    const numericAmount = parseFloat(currentAmount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
        Alert.alert('Invalid Input', 'Amount must be a positive number.');
        return;
    }

    const newItem = {
      category: currentCategory.trim(),
      amount: numericAmount,
      period: currentPeriod.trim() || 'Monthly',
    };

    let newBudgetsList;
    if (isEditing === 'new') {
      if (budgets.find(b => b.category.toLowerCase() === newItem.category.toLowerCase())) {
        Alert.alert('Duplicate Category', 'This budget category already exists. Please edit the existing one or choose a different name.');
        return;
      }
      newBudgetsList = [...budgets, newItem];
    } else if (typeof isEditing === 'number') {
      if (budgets[isEditing].category.toLowerCase() !== newItem.category.toLowerCase() &&
        budgets.find((b, index) => index !== isEditing && b.category.toLowerCase() === newItem.category.toLowerCase())) {
        Alert.alert('Duplicate Category', 'This budget category name is already in use.');
        return;
      }
      newBudgetsList = budgets.map((item, index) => index === isEditing ? newItem : item);
    } else {
      return; 
    }
    setBudgets(newBudgetsList);
    closeAndResetForm();
  };
  const closeAndResetForm = () => { /* ... (same as before) ... */ 
    setFormVisible(false);
    setIsEditing(null);
    setCurrentCategory('');
    setCurrentAmount('');
    setCurrentPeriod('Monthly');
  };
  const startEditItem = (item, index) => { /* ... (same as before) ... */ 
    setIsEditing(index);
    setCurrentCategory(item.category);
    setCurrentAmount(String(item.amount));
    setCurrentPeriod(item.period);
    setFormVisible(true);
  };
  const startAddNewItem = () => { /* ... (same as before) ... */ 
    setIsEditing('new');
    setCurrentCategory('');
    setCurrentAmount('');
    setCurrentPeriod('Monthly');
    setFormVisible(true);
  };
  const handleDeleteItemFromList = (indexToDelete) => { /* ... (same as before) ... */ 
    Alert.alert("Confirm Delete", "Are you sure you want to delete this budget item from the list?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete", style: "destructive", onPress: () => {
          const newBudgetsList = budgets.filter((_, index) => index !== indexToDelete);
          setBudgets(newBudgetsList);
          if (isEditing === indexToDelete) { 
            closeAndResetForm();
          }
        }
      }
    ]);
  };

  const renderBudgetForm = () => (
    <View style={styles.formCard}>
      <Text style={styles.formTitle}>{isEditing === 'new' ? 'Add New Budget Item' : 'Edit Budget Item'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Category (e.g., Food, Utilities)"
        value={currentCategory}
        onChangeText={setCurrentCategory}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount (e.g., 300)"
        value={currentAmount}
        onChangeText={setCurrentAmount}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Period (e.g., Monthly, Yearly)"
        value={currentPeriod}
        onChangeText={setCurrentPeriod}
      />
      <View style={styles.formButtons}>
        <TouchableOpacity style={[styles.actionButton, styles.saveItemButton]} onPress={handleAddOrUpdateItemToList}>
            <Text style={styles.actionButtonText}>{isEditing === 'new' ? "Add to List" : "Update Item"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.cancelItemButton]} onPress={closeAndResetForm}>
            <Text style={styles.actionButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const ListHeader = () => (
    <>
      <View style={styles.headerContainer}>
        <Text style={styles.mainTitle}>Manage Your Budgets</Text>
        {!formVisible && (
             <TouchableOpacity style={styles.addNewButton} onPress={startAddNewItem}>
                <Ionicons name="add-circle-outline" size={22} color="#fff" style={{marginRight: 8}}/>
                <Text style={styles.addNewButtonText}>Add New Budget</Text>
            </TouchableOpacity>
        )}
      </View>
      {formVisible && renderBudgetForm()}
      {budgets.length > 0 && !formVisible && <Text style={styles.listHeader}>Current Budget Items:</Text>}
      {budgets.length === 0 && !formVisible && <Text style={styles.noBudgetsText}>No budgets defined. Click "Add New Budget" to start.</Text>}
    </>
  );

  const ListFooter = () => (
    <>
      {budgets.length > 0 && !formVisible && (
        <View style={styles.saveAllContainer}>
            {savingAll ? <ActivityIndicator size="large" color="#28a745"/> : (
                <TouchableOpacity style={styles.saveAllButton} onPress={handleSaveAllBudgets}>
                    <Ionicons name="save-outline" size={22} color="#fff" style={{marginRight: 8}}/>
                    <Text style={styles.saveAllButtonText}>Save All Budget Changes</Text>
                </TouchableOpacity>
            )}
        </View>
      )}
    </>
  );


  return (
    <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.kavContainer} // Use a new style for KAV
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0} // Adjust as needed
    >
        <FlatList
            style={styles.flatListContainer} // Use a new style for FlatList container
            contentContainerStyle={styles.scrollContent}
            data={budgets}
            keyExtractor={(item, index) => `${item.category}-${index}-${item.amount}`}
            renderItem={({ item, index }) => (
                <View style={styles.budgetItemCard}>
                    <View style={styles.budgetTextContainer}>
                        <Text style={styles.categoryText}>{item.category}</Text>
                        <Text style={styles.periodText}>({item.period})</Text>
                    </View>
                    <Text style={styles.amountText}>${Number(item.amount).toLocaleString()}</Text>
                    <View style={styles.budgetActions}>
                        <TouchableOpacity onPress={() => startEditItem(item, index)} style={styles.iconButton}>
                        <Ionicons name="pencil-outline" size={24} color="#007bff" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDeleteItemFromList(index)} style={styles.iconButton}>
                        <Ionicons name="trash-bin-outline" size={24} color="#dc3545" />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
            ListHeaderComponent={ListHeader}
            ListFooterComponent={ListFooter}
            // ListEmptyComponent is tricky when header also shows "no budgets" text.
            // We handle the "no budgets" message within ListHeader now.
        />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  kavContainer: { // New style for KeyboardAvoidingView
    flex: 1,
    backgroundColor: '#f8f9fa', // Match screen background
  },
  flatListContainer: { // New style for FlatList wrapper
    flex: 1, // Allow FlatList to take available space
  },
  scrollContent: { // This is for the *content* inside FlatList
    padding: 20,
    paddingBottom: 40, 
  },
  // ... (all other styles from your previous SetBudgetScreen.js remain the same)
  headerContainer: {
    marginBottom: 20,
  },
  mainTitle: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 10, 
    textAlign: 'center',
    color: '#343a40'
  },
  addNewButton: {
    flexDirection: 'row',
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center', 
    elevation: 2,
    marginBottom: 10, 
  },
  addNewButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  noBudgetsText: { 
    textAlign: 'center', 
    marginVertical: 30, 
    fontStyle: 'italic', 
    fontSize: 16,
    color: '#6c757d' 
  },
  listHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 10,
    marginTop: 10,
  },
  budgetItemCard: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingVertical: 15, 
    paddingHorizontal:15, 
    backgroundColor: 'white', 
    borderRadius: 8, 
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  budgetTextContainer: { 
    flex: 1,
    marginRight: 10,
  },
  categoryText: { 
    fontSize: 17, 
    fontWeight: '600',
    color: '#343a40'
  },
  periodText: {
    fontSize: 13,
    color: '#6c757d',
  },
  amountText: { 
    fontSize: 17, 
    fontWeight: 'bold',
    color: '#28a745', 
    minWidth: 70, 
    textAlign: 'right',
  },
  budgetActions: { 
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  iconButton: {
    padding: 5, 
    marginLeft: 10,
  },
  formCard: { 
    marginTop: 5, 
    padding: 20, 
    backgroundColor: '#ffffff', 
    borderRadius: 12, 
    borderWidth: 1, 
    borderColor: '#dee2e6',
    marginBottom: 25,
    elevation: 3,
  },
  formTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    textAlign: 'center',
    color: '#007bff'
  },
  input: { 
    backgroundColor: '#f8f9fa',
    borderWidth: 1, 
    borderColor: '#ced4da', 
    paddingHorizontal: 15,
    paddingVertical: 12, 
    marginBottom: 15, 
    borderRadius: 8,
    fontSize: 16,
  },
  formButtons: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 10
  },
  actionButton: {
    flex: 1, 
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  saveItemButton: {
    backgroundColor: '#28a745', 
  },
  cancelItemButton: {
    backgroundColor: '#6c757d', 
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  saveAllContainer: {
      marginTop: 30,
      marginBottom: 20,
      alignItems: 'center', 
  },
  saveAllButton: {
    flexDirection: 'row',
    backgroundColor: '#28a745', 
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  saveAllButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  }
});

export default SetBudgetScreen;