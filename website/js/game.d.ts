type GameState = "start" | "loading" | "guessing" | "error" | "win" | "skipped"

type GameInfo = {
    state: GameState,
    error?: TransitionError
}

type GameObserver = (newState: GameState, info: GameInfo) => void

type TransitionError = {
    from: GameState
    to: GameState
}