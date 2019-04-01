from AlphaBetaPruning import AlphaBetaPruning, State , UnHash, maxsize

def main():
    # InitStateA = [  ['x', 'o', ' ', ' '],
    #                 [' ', ' ', ' ', ' '],
    #                 [' ', 'o', 'x', ' '],
    #                 [' ', 'o', 'x', ' ']   ]

    InitStateA = [  ['o', 'o', 'x'],
                    [' ', 'x', ' '],
                    ['o', 'x', ' ']   ]

    ABP = AlphaBetaPruning(InitStateA)
    ABP.solve(ABP.InitialState, 0, -maxsize, maxsize)

    for i, j in ABP.AdjList.items():
        print(UnHash(i, ABP.size))
        for child in j:
            print('-->', UnHash(child, ABP.size))

if __name__ == "__main__":
    main()