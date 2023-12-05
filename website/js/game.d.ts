type GameState = "start" | "loading" | "guessing" | "win"
type GameObserver = (newState: GameState) => void
