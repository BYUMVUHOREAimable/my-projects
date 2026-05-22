import matplotlib.pyplot as plt

# Actual and predicted values
actual = [3, 5, 7]
predicted = [2.5, 5.5, 6]
indices = range(1, len(actual) + 1)

# Calculate absolute differences
absolute_diff = [abs(a - p) for a, p in zip(actual, predicted)]

# Plot actual vs predicted values
plt.figure(figsize=(8, 6))
plt.plot(indices, actual, marker='o', linestyle='-', label='Actual Values')
plt.plot(indices, predicted, marker='x', linestyle='--', label='Predicted Values')

# Highlight the absolute differences
for i, (a, p, diff) in enumerate(zip(actual, predicted, absolute_diff)):
    plt.vlines(i + 1, min(a, p), max(a, p), colors='red', linestyles='dotted', label='Absolute Difference' if i == 0 else "")

plt.xlabel('Observation Index')
plt.ylabel('Value')
plt.title('Actual vs Predicted Values with Absolute Differences')
plt.legend()
plt.grid(True)
plt.show()
