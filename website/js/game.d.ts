type GameState = "loading" | "guessing" | "win"
type GameObserver = (newState: GameState) => void
