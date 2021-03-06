from State import State, Hash, UnHash
from sys import maxsize

class AlphaBetaPruning:
    def __init__(self, InitialState):
        self.InitialState = Hash(InitialState)
        self.size = len(InitialState)
        self.checkerList = []
        self.AdjList = dict()
        self.__setCheckerList()

    def __setCheckerList(self):
        
        for i in range(1,3): # 1 = x; 2 = o;

            # mendatar
            temp = 0
            for _ in range(0, self.size): 
                temp = (temp << 2) | i
            for j in range(0, self.size):
                self.checkerList.append((i, temp << (j * self.size * 2)))
        
            # kebawah
            temp = 0
            for j in range(0, self.size):
                temp = temp | (i << (j * self.size * 2))

            for j in range(0, self.size):
                self.checkerList.append((i, temp << (j * 2)))
            
            # Diagonal
            temp = 0
            temp2 = 0
            for j in range(0, self.size):
                temp = temp | (i << (j * (self.size + 1) * 2))
                temp2 = temp2 | i
                temp2 = (temp2 << ((self.size-1) * 2))
            self.checkerList.append((i, temp))
            self.checkerList.append((i, temp2))
            
    def getNextMove(self, state):
        
        temp = state
        xPlayer , oPlayer , checker = 0, 0, 3

        for _ in range(0,  self.size * self.size):
            if((temp & checker) == 2): oPlayer = oPlayer + 1
            if((temp & checker) == 1): xPlayer = xPlayer + 1
            temp = temp >> 2

        if(xPlayer == oPlayer): return 0
        if(oPlayer < xPlayer): return 1

    def expand(self, state):
        res = []
        checker = 3

        for i in range(0, self.size * self.size):
            if((state & checker) == 0):
                player = self.getNextMove(state)
                if(player == 0): # player x
                    res.append(state | (1 << (i * 2)))
                elif(player == 1): # player o
                    res.append(state | (2 << (i * 2)))
            
            checker = checker << 2

        return res

    def isThereWinner(self, state):
        
        for data in self.checkerList:
            if((data[1] & state) == data[1]):
                return data[0]

        return 0

    def isFull(self, state):
        checker = 3
        for i in range(0, self.size * self.size):
            if((state & checker) == 0): return False
            checker = checker << 2
        return True

    def solve(self, state, depth, alpha, beta):

        value = alpha if (depth % 2) == 0 else beta
        utility = self.isThereWinner(state)
        isFull = self.isFull(state)

        self.AdjList[state] = []

        if(utility): return 100 if utility == 1 else -100
        elif(isFull): return 0
        # else: 
        
        childs = self.expand(state)

        if((depth % 2) == 0) : # max
            
            best = -maxsize
            pruned = False

            while childs:

                child = childs.pop(0)
                # self.AdjList[state].append((child, pruned, alpha, beta))

                if(not pruned):
                    value = self.solve(child, depth + 1, alpha, beta)

                    best = max(best, value)
                    alpha = max(alpha, best)
                    
                    self.AdjList[state].append((child, pruned, alpha, beta))

                    # Pruning
                    if(beta <= alpha):
                        pruned = True
                else:
                    self.AdjList[child] = []
                    self.AdjList[state].append((child, pruned, alpha, beta))
                    break

            return best
        
        else: # min
            best = maxsize
            pruned = False

            while childs:
                child = childs.pop(0)
                # self.AdjList[state].append((child, pruned, alpha, beta))

                if(not pruned):
                    value = self.solve(child, depth + 1, alpha, beta)

                    best = min(best, value)
                    beta = min(beta, best)

                    self.AdjList[state].append((child, pruned, alpha, beta))

                    # Pruning
                    if(beta <= alpha):
                        pruned = True
                else:
                    self.AdjList[child] = []
                    self.AdjList[state].append((child, pruned, alpha, beta))
                    break

            return best