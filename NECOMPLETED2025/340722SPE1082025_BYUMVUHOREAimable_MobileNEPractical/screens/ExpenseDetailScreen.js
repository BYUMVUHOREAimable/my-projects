// screens/ExpenseDetailScreen.js
import React, { useState, useEffect, useCallback } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    ActivityIndicator, 
    Alert, 
    TouchableOpacity,
    ScrollView // <<<< MAKE SURE THIS IS IMPORTED FROM 'react-native'
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getExpenseById, deleteExpenseById } from '../services/api';
import { Ionicons } from '@expo/vector-icons';


const DetailRow = ({ label, value }) => (
  <View style={styles.detailRow}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const ExpenseDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { expenseId } = route.params;

  const [expense, setExpense] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(''); // Renamed from 'error' in EditExpense to avoid conflict if copy-pasted

  const fetchDetails = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getExpenseById(expenseId);
      setExpense(data);
    } catch (err) {
      console.error("Fetch Detail Error:", err); // Log the specific error
      setError('Failed to load expense details.');
      // Alert.alert('Error', 'Could not load expense details.'); // Can be annoying for users
    } finally {
      setLoading(false);
    }
  }, [expenseId]);

  useEffect(() => {
    if (expenseId) { // Only fetch if expenseId is present
        fetchDetails();
    } else {
        setError("Expense ID is missing.");
        setLoading(false);
    }
  }, [fetchDetails, expenseId]); // Added expenseId as dependency

  const handleEdit = () => {
    if (expense) {
      navigation.navigate('EditExpense', { expenseId: expense.id });
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this expense?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              setLoading(true);
              await deleteExpenseById(expenseId);
              Alert.alert("Success", "Expense deleted successfully.");
              navigation.navigate('ExpenseList', { refresh: true }); 
            } catch (err) {
              setLoading(false);
              console.error("Delete error:", err);
              Alert.alert("Error", "Failed to delete expense.");
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return <ActivityIndicator style={styles.centered} size="large" color="#007bff" />;
  }

  if (error || !expense) { // If there's an error OR expense is null after loading
    return (
        <View style={styles.centered}>
            <Ionicons name="alert-circle-outline" size={50} color="#dc3545" />
            <Text style={styles.errorText}>{error || 'Expense not found or failed to load.'}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={fetchDetails}>
                <Text style={styles.retryButtonText}>Try Again</Text>
            </TouchableOpacity>
        </View>
    );
  }

  // If we reach here, expense object should exist
  return (
    // The ScrollView is the root here, which is correct for this screen type
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContentContainer}>
      <Text style={styles.title}>{expense.name || 'Expense Item'}</Text>
      
      <View style={styles.card}>
        <DetailRow label="Amount:" value={`$${parseFloat(expense.amount).toFixed(2)}`} />
        <DetailRow label="Category:" value={expense.category || 'N/A'} />
        <DetailRow 
            label="Date:" 
            value={expense.date ? new Date(expense.date).toLocaleDateString() : (expense.createdAt ? new Date(expense.createdAt).toLocaleDateString() : 'N/A')} 
        />
        <View style={styles.detailRowDescription}>
          <Text style={styles.label}>Description:</Text>
          <Text style={styles.descriptionValue}>{expense.description || 'No description provided.'}</Text>
        </View>
      </View>
      
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={[styles.button, styles.editButton]} onPress={handleEdit}>
            <Ionicons name="pencil-outline" size={20} color="#fff" style={{marginRight: 8}}/>
            <Text style={styles.buttonText}>Edit Expense</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDelete}>
            <Ionicons name="trash-bin-outline" size={20} color="#fff" style={{marginRight: 8}}/>
            <Text style={styles.buttonText}>Delete Expense</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { // Style for the ScrollView itself
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContentContainer: { // Style for the content within ScrollView
    paddingVertical: 20,
    paddingBottom: 40, // Ensure space at bottom
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#343a40',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 15,
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 25,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  detailRowDescription: {
    paddingVertical: 12,
  },
  label: {
    fontSize: 17,
    color: '#6c757d',
    fontWeight: '500',
    marginRight: 10,
  },
  value: {
    fontSize: 17,
    color: '#343a40',
    textAlign: 'right',
    flexShrink: 1, 
  },
  descriptionValue: {
    fontSize: 16,
    color: '#495057',
    marginTop: 8,
    lineHeight: 24,
  },
  errorText: {
    color: '#dc3545',
    fontSize: 17,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 5,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  buttonGroup: {
    marginHorizontal: 15,
    marginTop: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
  },
  editButton: {
    backgroundColor: '#007bff',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
});

export default ExpenseDetailScreen;