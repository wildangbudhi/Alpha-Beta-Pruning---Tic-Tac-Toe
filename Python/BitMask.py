def Hash(state):
    count = 0
    res = 0

    for i in range(0, len(state)):
        for j in range(0, len(state[i])):
            temp = 1
            if(state[i][j] == 'X'): res = res | ( temp << (2 * count) )
            elif(state[i][j] == 'O'): res = res | ( temp << ((2 * count) + 1) )
            count = count + 1

    return res
    
def UnHash(num, size):
    res = []

    for i in range(0, size):
        res.append([])
        for j in range(0, size):
            temp = 3
            cal = num & temp
            if(cal == 1): res[i].append('X')
            elif(cal == 2): res[i].append('O')
            else: res[i].append(' ')
            num = num >> 2
    
    return res