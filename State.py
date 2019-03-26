from BitMask import BitMask

class State():

    bitmask = BitMask()

    def __init__(self, state, depth, alpha=0, beta=None, isPruning=False):
        self.state = self.bitmask.Hash(state)
        self.size = len(state)
        self.depth = depth
        self.alpha = alpha
        self.beta = beta
        self.isPruning = False
    
    def getTable(self):
        return self.bitmask.UnHash(self.state, self.size)