from State import State, Hash, UnHash

class AlphaBetaPruning:
    def __init__(self, InitialState):
        self.InitialState = Hash(InitialState)
        self.size = len(InitialState)
        self.checkerList = []
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
            

    def expand(self, state, player):
        res = []
        checker = 3

        for i in range(0, self.size * self.size):
            if((state & checker) == 0):
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

    def solve(self):
        stack, isVisited = list(State(self.InitialState, 0)), dict()

        while stack:
            node = stack.pop()
            isVisited[node.state] = True

            #expand
            if(not self.isThereWinner(node.state)):
                neighbors = self.expand(node.state, node.depth % 2)
                for neighbor in neighbors:
                    if(neighbor not in isVisited): stack.append(State(neighbor, node.depth + 1))


