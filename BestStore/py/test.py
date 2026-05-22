def maximum_saving(input_network: str) -> int:
    # Parsing the input string into a list of rows
    lines = input_network.strip().split('\n')
    matrix = []
    for line in lines:
        row = []
        for cell in line.strip().split(','):
            if cell == '-':
                row.append(0)
            else:
                row.append(int(cell) if cell else 0) 
        matrix.append(row)
    
    n = len(matrix)
    edges = []
    total_cost = 0
    
    # Extracting edges from the matrix
    for i in range(n):
        for j in range(i + 1, n):
            cost = matrix[i][j]
            if cost > 0:
                total_cost += cost
                edges.append((cost, i, j))
    
    # Sort edges by cost (ascending) for Kruskal's algorithm
    edges.sort()
    
    # Union-Find (Disjoint Set) implementation
    parent = list(range(n))
    rank = [0] * n
    
    def find(x):
        if parent[x] != x:
            parent[x] = find(parent[x])
        return parent[x]
    
    def union(x, y):
        root_x = find(x)
        root_y = find(y)
        if root_x != root_y:
            if rank[root_x] < rank[root_y]:
                parent[root_x] = root_y
            elif rank[root_x] > rank[root_y]:
                parent[root_y] = root_x
            else:
                parent[root_y] = root_x
                rank[root_x] += 1
            return True
        return False
    
    # Let me use Kruskal's algorithm to find MST cost
    mst_cost = 0
    edges_used = 0
    
    for cost, u, v in edges:
        if union(u, v):
            mst_cost += cost
            edges_used += 1
            if edges_used == n - 1:
                break
    
    # Maximum saving = total original cost - MST cost
    return total_cost - mst_cost


# Example usage (as given in the problem):
if __name__ == "__main__":
    input_network = '''-,14,10,19,-,-,-
14,-,-,15,18,-,-
10,-,-,26,-,29,-
19,15,26,-,16,17,21
-,18,-,16,-,-,9
-,-,29,17,-,-,25
-,-,-,21,9,25,-'''
    
    max_saving = maximum_saving(input_network)
    print(max_saving)  # Should print 138