import matplotlib.pyplot as plt

height = [189, 185, 195, 149, 147, 154, 174,
          169, 159, 159, 192, 155, 191, 153, 
          153, 157, 140, 144, 172, 157, 181, 
          182, 166, 167]

plt.figure(figsize=(23, 7))
plt.hist(height, bins=5, edgecolor='yellow')
plt.savefig('HistogramNew.png', format='png', dpi=300)
plt.show()