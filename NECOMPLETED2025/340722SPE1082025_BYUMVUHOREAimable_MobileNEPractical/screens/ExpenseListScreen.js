// screens/ExpenseListScreen.js
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  // Button as RNButton, // We'll use TouchableOpacity for better styling
} from 'react-native';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'; // Added useRoute
import { getAllExpenses, deleteExpenseById } from '../services/api';
import { useAuth } from '../state/AuthContext';
import { Ionicons } from '@expo/vector-icons';

const ExpenseItem = ({ item, onPress, onDelete }) => (
  <TouchableOpacity style={styles.itemContainer} onPress={() => onPress(item.id)}>
    <View style={styles.itemTextContainer}>
      <Text style={styles.itemName} numberOfLines={1}>{item.name || 'N/A'}</Text>
      <Text style={styles.itemAmount}>${parseFloat(item.amount).toFixed(2)}</Text>
      <View style={styles.itemMetaContainer}>
        {item.category && (
            <View style={styles.metaChip}>
                <Ionicons name="pricetag-outline" size={14} color="#007bff" />
                <Text style={styles.metaText}>{item.category}</Text>
            </View>
        )}
        <View style={styles.metaChip}>
            <Ionicons name="calendar-outline" size={14} color="#28a745" />
            <Text style={styles.metaText}>
            {item.date ? new Date(item.date).toLocaleDateString() : (item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A')}
            </Text>
        </View>
      </View>
    </View>
    <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.deleteButton}>
      <Ionicons name="trash-bin-outline" size={24} color="#dc3545" />
    </TouchableOpacity>
  </TouchableOpacity>
);

const ExpenseListScreen = () => {
  const navigation = useNavigation();
  const route = useRoute(); // For checking refresh params
  const { user, logout } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchExpensesAndBudgets = useCallback(async () => {
    if (!user) {
      setLoading(false); // Stop loading if no user
      return;
    }
    setLoading(true);
    setError('');
    try {
      const allExpenses = await getAllExpenses();
      const userExpenses = allExpenses
        .filter(exp => exp.userId === user.id || !exp.userId) // Keep this logic or adjust if userId becomes mandatory
        .sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt));
      setExpenses(userExpenses);
    } catch (err) {
      console.error("Fetch Expenses Error:", err);
      setError('Failed to fetch expenses. Pull down to refresh.');
      // Alert.alert('Error', 'Could not fetch expenses.'); // Alert can be annoying on every error
    } finally {
      setLoading(false);
    }
  }, [user]); // Removed setLoading from dependency array as it's managed within

  useFocusEffect(
    useCallback(() => {
      fetchExpensesAndBudgets();
      // Check for refresh parameter from other screens
      if (route.params?.refresh) {
        navigation.setParams({ refresh: false }); // Reset the param
      }
    }, [fetchExpensesAndBudgets, route.params?.refresh, navigation])
  );

  const handleAddExpense = () => {
    navigation.navigate('AddExpense');
  };

  const handleViewDetails = (expenseId) => {
    navigation.navigate('ExpenseDetail', { expenseId });
  };

  const handleDeleteExpense = (expenseId) => {
    Alert.alert(
      "Delete Expense",
      "Are you sure you want to delete this expense?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              setLoading(true); // Indicate activity
              await deleteExpenseById(expenseId);
              Alert.alert("Success", "Expense deleted successfully.");
              fetchExpensesAndBudgets(); // Refresh list
            } catch (err) {
              setLoading(false);
              console.error("Delete error:", err);
              Alert.alert("Error", "Failed to delete expense.");
            }
          }
        }
      ]
    );
  };

  const renderUserBudgets = () => {
    if (!user || !user.budgets || user.budgets.length === 0) {
      return (
        <View style={styles.budgetsContainer}>
          <Text style={styles.noBudgetsText}>No budgets set. Tap 'Manage Budgets'.</Text>
        </View>
      );
    }
    return (
      <View style={styles.budgetsContainer}>
        <Text style={styles.budgetsHeader}>Your Budgets Overview:</Text>
        <FlatList
            data={user.budgets}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(budget, index) => `${budget.category}-${index}`}
            renderItem={({item: budget}) => (
                <View style={styles.budgetItemChip}>
                    <Text style={styles.budgetCategoryText}>{budget.category}</Text>
                    <Text style={styles.budgetAmountText}>${Number(budget.amount).toLocaleString()}</Text>
                    <Text style={styles.budgetPeriodText}>({budget.period})</Text>
                </View>
            )}
            ListEmptyComponent={<Text style={styles.noBudgetsText}>No budgets defined.</Text>}
        />
      </View>
    );
  };

  const handleManageBudgets = () => {
    navigation.navigate('SetBudget');
  };

  const ListHeader = () => (
    <>
      {renderUserBudgets()}
      <View style={styles.listTitleContainer}>
        <Text style={styles.listTitle}>Recent Expenses</Text>
      </View>
    </>
  );

  if (loading && expenses.length === 0) {
    return <ActivityIndicator style={styles.centered} size="large" color="#007bff" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerActions}>
        <TouchableOpacity style={styles.headerButton} onPress={handleManageBudgets}>
          <Ionicons name="settings-outline" size={22} color="#fff" />
          <Text style={styles.headerButtonText}>Budgets</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.headerButton, styles.logoutButton]} onPress={logout}>
          <Ionicons name="log-out-outline" size={22} color="#fff" />
          <Text style={styles.headerButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {error && !loading ? (
         <View style={styles.centeredError}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={fetchExpensesAndBudgets}>
                <Text style={styles.retryButtonText}>Try Again</Text>
            </TouchableOpacity>
        </View>
      ) : expenses.length === 0 && !loading ? (
        <>
        {ListHeader()}
        <View style={styles.centeredMessageContainer}>
             <Ionicons name="document-text-outline" size={60} color="#adb5bd" />
             <Text style={styles.centeredMessage}>No expenses recorded yet.</Text>
             <Text style={styles.centeredSubMessage}>Tap the '+' button to add your first expense.</Text>
        </View>
        </>
      ) : (
        <FlatList
          ListHeaderComponent={ListHeader}
          data={expenses}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ExpenseItem
              item={item}
              onPress={handleViewDetails}
              onDelete={handleDeleteExpense}
            />
          )}
          onRefresh={fetchExpensesAndBudgets}
          refreshing={loading}
          contentContainerStyle={styles.listContentContainer}
        />
      )}
      <TouchableOpacity style={styles.fab} onPress={handleAddExpense}>
        <Ionicons name="add-outline" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa', // Lighter background
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#007bff',
    borderBottomWidth: 1,
    borderBottomColor: '#0056b3',
  },
  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20, // More rounded
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  headerButtonText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 15,
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: 'rgba(220, 53, 69, 0.2)', // Red hint
    borderColor: 'rgba(220,53,69,0.5)',
    borderWidth: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredError: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#dc3545', // Bootstrap danger color
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
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
  centeredMessageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  centeredMessage: {
    fontSize: 18,
    color: '#6c757d', // Bootstrap secondary color
    marginTop: 10,
    textAlign: 'center',
  },
  centeredSubMessage: {
    fontSize: 14,
    color: '#adb5bd',
    marginTop: 5,
    textAlign: 'center',
  },
  listContentContainer: {
    paddingBottom: 80, // Space for FAB
  },
  itemContainer: {
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 6,
    marginHorizontal: 12,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  itemName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#343a40', // Darker gray
    marginBottom: 4,
  },
  itemAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#28a745', // Green for amount
    marginBottom: 6,
  },
  itemMetaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Allow chips to wrap
    alignItems: 'center',
  },
  metaChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e9ecef',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginRight: 8,
    marginTop: 4, // For wrapping
  },
  metaText: {
    fontSize: 12,
    color: '#495057', // Medium gray
    marginLeft: 5,
  },
  deleteButton: {
    padding: 8,
    marginLeft: 5, // Space from text content
  },
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 0,
    backgroundColor: '#007bff',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  budgetsContainer: {
    paddingVertical: 15,
    paddingHorizontal: 5, // Allow chips to touch edges if needed
    backgroundColor: '#ffffff', // White background for budget section
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6',
    marginBottom: 10,
  },
  budgetsHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#495057',
    paddingLeft: 10,
  },
  budgetItemChip: {
    backgroundColor: '#e9ecef', // Light gray for budget chips
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 5,
    alignItems: 'center',
    minWidth: 100, // Give some width to chips
  },
  budgetCategoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#212529',
  },
  budgetAmountText: {
    fontSize: 13,
    color: '#007bff', // Blue for budget amount
    fontWeight: '600',
  },
  budgetPeriodText: {
    fontSize: 11,
    color: '#6c757d',
  },
  noBudgetsText: {
    textAlign: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontStyle: 'italic',
    color: '#6c757d',
    fontSize: 14,
  },
  listTitleContainer: {
    paddingHorizontal: 15,
    paddingTop: 10, // Add some space above the title if budgets are shown
    paddingBottom: 5,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#343a40',
  },
});

export default ExpenseListScreen;