import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useAuth } from "../state/AuthContext";

import LoginScreen from "../screens/LoginScreen";
import ExpenseListScreen from "../screens/ExpenseListScreen";
import AddExpenseScreen from "../screens/AddExpenseScreen";
import ExpenseDetailScreen from "../screens/ExpenseDetailScreen";
import EditExpenseScreen from "../screens/EditExpenseScreen";
import SetBudgetScreen from '../screens/SetBudgetScreen'; 
import { ActivityIndicator, View, StyleSheet } from "react-native";

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007bff', // Example global header style
          },
          headerTintColor: '#fff', // Example global header text color
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        {isAuthenticated ? (
          <>
            <Stack.Screen
              name="ExpenseList"
              component={ExpenseListScreen}
              options={{ title: "My Expenses" }}
            />
            <Stack.Screen
              name="AddExpense"
              component={AddExpenseScreen}
              options={{ title: "Add New Expense" }}
            />
            <Stack.Screen
              name="ExpenseDetail"
              component={ExpenseDetailScreen}
              options={{ title: "Expense Details" }}
            />
            <Stack.Screen
              name="EditExpense"
              component={EditExpenseScreen}
              options={{ title: "Edit Expense" }}
            />
            <Stack.Screen 
              name="SetBudget" 
              component={SetBudgetScreen} 
              options={{ title: 'Set/Manage Budgets' }} 
            />
          </>
        ) : (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#f8f9fa',
  },
});

export default AppNavigator;