from State import State
from BitMask import BitMask
 
def main():
    a = [   ['x', ' ', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' '], ]

    bm = BitMask()
    state = bm.Hash(a)
    print(state)

if __name__ == "__main__":
    main()