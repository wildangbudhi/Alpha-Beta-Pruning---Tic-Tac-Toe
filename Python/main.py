from State import State
from AlphaBetaPruning import AlphaBetaPruning, UnHash

def main():
    InitStateA = [   ['x', 'o', ' '],
                    [' ', ' ', ' '],
                    [' ', 'o', 'x']     ]

    InitStateB = State(InitStateA, 0, 0)

    print(InitStateB.state)

    ABP = AlphaBetaPruning(InitStateA)
    a = ABP.expand(InitStateB.state, 3, 2)

    for i in a:
        print(UnHash(i, 3))

if __name__ == "__main__":
    main()