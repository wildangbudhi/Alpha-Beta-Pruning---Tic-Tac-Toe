from BitMask import BitMask

class State():

    bitmask = BitMask()

    def __init__(self, state):
        self.state = self.bitmask.Hash(state)
        self.size = len(state)
    
    def getTable(self):
        return self.bitmask.UnHash(self.state, self.size)