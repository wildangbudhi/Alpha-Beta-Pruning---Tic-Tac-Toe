from BitMask import Hash, UnHash

class State:
    def __init__(self, state, id, depth, alpha=0, beta=None, isPruning=False):
        self.state = Hash(state)
        self.size = len(state)
        self.id = id
        self.depth = depth
        self.alpha = alpha
        self.beta = beta
        self.isPruning = False
    
    def getTable(self):
        return UnHash(self.state, self.size)