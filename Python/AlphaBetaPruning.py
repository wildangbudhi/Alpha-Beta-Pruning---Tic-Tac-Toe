from State import State, Hash, UnHash

class AlphaBetaPruning:
    def __init__(self, InitialState):
        self.InitialState = InitialState

    def expand(self, state, size, player):
        res = []
        checker = 3

        for i in range(0, size * size):
            if((state & checker) == 0):
                if(player == 0): # player x
                    res.append(state | (1 << (i * 2)))
                elif(player == 1): # player y
                    res.append(state | (2 << (i * 2)))
            
            checker = checker << 2

        return res
    
    def isFull(self, state, size):
        checker = 3
        for _ in range (0, size * size):
            if((state & checker) == 0): return False
            checker = checker << 2
        
        return True

    def isThereWinner(self, state, size):
        
        return False

    def solve(self):
        stack, isVisited = list(), dict()

        stack.append(State(self.InitialState, 0))
        
        while stack:
            node = stack.pop()
            isVisited[node.state] = True

            #expand
            if(not self.isFull(node.state, node.size) and not self.isThereWinner(node.state, node.size)):
                neighbors = self.expand(node.state, node.size, node.depth % 2)
                for neighbor in neighbors:
                    if(neighbor not in isVisited): stack.append(State(neighbor, node.depth + 1))


