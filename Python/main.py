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

    HashTable = dict()

    for i, j in ABP.AdjList.items():
        HashTable[i] = UnHash(i, ABP.size)
        for child in j:
            if(child[0] not in HashTable):
                HashTable[child[0]] = UnHash(child[0], ABP.size)
    
    print({'tree' : ABP.AdjList, 'HashTable' : HashTable})

if __name__ == "__main__":
    main()