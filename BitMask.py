class BitMask:
    def Hash(self, state):
        count = 0
        res = 0

        for i in range(0, len(state)):
            for j in range(0, len(state[i])):
                temp = 1
                if(state[i][j] == 'x'): res = res | ( temp << (2 * count) )
                elif(state[i][j] == 'o'): res = res | ( temp << ((2 * count) + 1) )
                count = count + 1

        return res
    
    def UnHash(self, state, size):
        count = 0
        res = [[None] * size] * size

        for i in range(0, size):
            for j in range(0, size):
                temp = 3
                count = count + 2