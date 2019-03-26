from BitMask import BitMask

class State():

    bitmask = BitMask()

    def __init__(self, state):
        self.state = self.bitmask.Hash(state)