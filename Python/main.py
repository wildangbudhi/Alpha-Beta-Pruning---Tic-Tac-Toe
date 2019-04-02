from AlphaBetaPruning import AlphaBetaPruning, State , UnHash, maxsize
import sys
import json

isVisited = dict()

def DFS(AdjList, node):

    data = dict()
    data['name'] = node
    
    lis = list()
    for i in AdjList[node]:
        lis.append(DFS(AdjList, i[0]))

    if(lis):
        data['children'] = lis
    
    return data
            
def main():
    # InitStateA = [  ['x', 'o', ' ', ' '],
    #                 [' ', ' ', ' ', ' '],
    #                 [' ', 'o', 'x', ' '],
    #                 [' ', 'o', 'x', ' ']   ]

    # InitStateA = [  ['O', 'O', 'X'],
    #                 [' ', 'X', ' '],
    #                 ['O', 'X', ' ']   ]

    InitStateA = json.loads(sys.argv[1])

    ABP = AlphaBetaPruning(InitStateA)
    ABP.solve(ABP.InitialState, 0, -maxsize, maxsize)

    HashTable = dict()

    for i, j in ABP.AdjList.items():
        HashTable[i] = UnHash(i, ABP.size)
        for child in j:
            if(child[0] not in HashTable):
                HashTable[child[0]] = UnHash(child[0], ABP.size)

    data = list()
    data.append(DFS(ABP.AdjList, next(iter(ABP.AdjList.keys()))))
    print(json.dumps({'adj.list' : ABP.AdjList, 'tree' : data, 'HashTable' : HashTable}))
    sys.stdout.flush()


if __name__ == "__main__":
    main()