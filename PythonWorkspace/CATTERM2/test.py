def sum(num):
    if num == 0:  # base case
        return 0
    return num + sum(num - 1)

print(sum(2))
