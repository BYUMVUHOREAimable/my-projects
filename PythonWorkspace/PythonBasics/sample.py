def sample_function(x, y=[]):
    y.append(x)
    return y
a=sample_function(1)
b=sample_function(2, [])
c=sample_function(3)
print(a)
print(b)
print(c)