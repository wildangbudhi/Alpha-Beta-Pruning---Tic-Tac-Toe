from State import State
 
def main():
    InitState = [   ['x', 'o', ' '],
                    ['x', 'o', ' '],
                    ['x', 'o', ' ']     ]

    InitState = State(InitState)

    print(InitState.state)
    print(InitState.getTable())

if __name__ == "__main__":
    main()