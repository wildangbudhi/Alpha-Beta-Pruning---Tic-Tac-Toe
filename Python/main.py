from State import State
from AlphaBetaPruning import AlphaBetaPruning, UnHash

def main():
    InitStateA = [  ['x', 'o', ' ', ' '],
                    [' ', ' ', ' ', ' '],
                    [' ', 'o', 'x', ' '],
                    [' ', 'o', 'x', ' ']   ]

    # InitStateA = [  ['x', 'o', ' '],
    #                 [' ', ' ', ' '],
    #                 [' ', 'o', 'x']   ]

    ABP = AlphaBetaPruning(InitStateA)
    
    a = ABP.checkerList
    for i in a:
       print(i[0], UnHash(i[1], ABP.size))

   

if __name__ == "__main__":
    main()