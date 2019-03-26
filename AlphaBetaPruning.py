from State import State, Hash, UnHash

class AlphaBetaPruning:
    def __init__(self, InitialState):
        self.InitialState = InitialState

    def expand(self, state, size, player):

        res = []
        temp = state
        checker = 3

        for i in range(0, size*size):

            if((temp & checker) == 0):
                if(player == 1):
                    res.append(temp | (1 << (i * 2)))
                elif(player == 2):
                    res.append(temp | (2 << (i * 2)))
            
            checker = checker << 2

        return res

    def solve(self):
        stack, isVisited = list(), dict()

        stack.append(State(self.InitialState, 0, 0))
        
        while stack:

            node = stack.pop()
            isVisited[node.state] = True

