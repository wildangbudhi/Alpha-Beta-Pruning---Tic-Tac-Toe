from AlphaBetaPruning import AlphaBetaPruning, State , UnHash, maxsize
import json

isVisited = dict()

def DFS(AdjList, node):

    data = dict()
    data['title'] = node
    
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
    
    # print(ABP.AdjList)
    data = list()
    data.append(DFS(ABP.AdjList, next(iter(ABP.AdjList.keys()))))
    # print(json.dumps(data))

    
    print(json.dumps({'tree' : data, 'HashTable' : HashTable}))


if __name__ == "__main__":
    main()