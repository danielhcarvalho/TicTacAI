import { useState, useCallback, useEffect, useRef } from 'react';

export type Player = 'X' | 'O' | null;
export type Board = Player[];
export type Difficulty = 'easy' | 'medium' | 'hard';
export type GameMode = 'player-vs-ai' | 'ai-vs-ai';
export type GameStatus = 'playing' | 'won' | 'draw';

interface GameState {
  board: Board;
  currentPlayer: Player;
  winner: Player;
  status: GameStatus;
  winningLine: number[] | null;
}

const WINNING_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6], // diagonals
];

const checkWinner = (board: Board): { winner: Player; line: number[] | null } => {
  for (const line of WINNING_LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line };
    }
  }
  return { winner: null, line: null };
};

const isBoardFull = (board: Board): boolean => {
  return board.every(cell => cell !== null);
};

const getEmptyCells = (board: Board): number[] => {
  return board.map((cell, index) => cell === null ? index : -1).filter(i => i !== -1);
};

// Minimax algorithm for AI decision making
const minimax = (
  board: Board,
  depth: number,
  isMaximizing: boolean,
  alpha: number,
  beta: number,
  aiPlayer: Player,
  humanPlayer: Player
): number => {
  const { winner } = checkWinner(board);
  
  if (winner === aiPlayer) return 10 - depth;
  if (winner === humanPlayer) return depth - 10;
  if (isBoardFull(board)) return 0;

  const emptyCells = getEmptyCells(board);

  if (isMaximizing) {
    let maxEval = -Infinity;
    for (const cell of emptyCells) {
      board[cell] = aiPlayer;
      const evalScore = minimax(board, depth + 1, false, alpha, beta, aiPlayer, humanPlayer);
      board[cell] = null;
      maxEval = Math.max(maxEval, evalScore);
      alpha = Math.max(alpha, evalScore);
      if (beta <= alpha) break;
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (const cell of emptyCells) {
      board[cell] = humanPlayer;
      const evalScore = minimax(board, depth + 1, true, alpha, beta, aiPlayer, humanPlayer);
      board[cell] = null;
      minEval = Math.min(minEval, evalScore);
      beta = Math.min(beta, evalScore);
      if (beta <= alpha) break;
    }
    return minEval;
  }
};

const getBestMove = (board: Board, aiPlayer: Player): number => {
  const humanPlayer = aiPlayer === 'X' ? 'O' : 'X';
  const emptyCells = getEmptyCells(board);
  let bestMove = emptyCells[0];
  let bestScore = -Infinity;

  for (const cell of emptyCells) {
    board[cell] = aiPlayer;
    const score = minimax(board, 0, false, -Infinity, Infinity, aiPlayer, humanPlayer);
    board[cell] = null;
    if (score > bestScore) {
      bestScore = score;
      bestMove = cell;
    }
  }

  return bestMove;
};

const getAIMove = (board: Board, difficulty: Difficulty, aiPlayer: Player): number => {
  const emptyCells = getEmptyCells(board);
  
  if (emptyCells.length === 0) return -1;

  switch (difficulty) {
    case 'easy': {
      // 80% random, 20% optimal
      if (Math.random() < 0.8) {
        return emptyCells[Math.floor(Math.random() * emptyCells.length)];
      }
      return getBestMove([...board], aiPlayer);
    }
    case 'medium': {
      // 40% random, 60% optimal
      if (Math.random() < 0.4) {
        return emptyCells[Math.floor(Math.random() * emptyCells.length)];
      }
      return getBestMove([...board], aiPlayer);
    }
    case 'hard': {
      // Always optimal - impossible to beat
      return getBestMove([...board], aiPlayer);
    }
  }
};

export function useTicTacToe() {
  const [gameState, setGameState] = useState<GameState>({
    board: Array(9).fill(null),
    currentPlayer: 'X',
    winner: null,
    status: 'playing',
    winningLine: null,
  });
  
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [gameMode, setGameMode] = useState<GameMode>('player-vs-ai');
  const [scores, setScores] = useState({ player: 0, ai: 0, draws: 0 });
  const [isAIThinking, setIsAIThinking] = useState(false);
  
  const aiTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetGame = useCallback(() => {
    if (aiTimeoutRef.current) {
      clearTimeout(aiTimeoutRef.current);
    }
    setGameState({
      board: Array(9).fill(null),
      currentPlayer: 'X',
      winner: null,
      status: 'playing',
      winningLine: null,
    });
    setIsAIThinking(false);
  }, []);

  const resetScores = useCallback(() => {
    setScores({ player: 0, ai: 0, draws: 0 });
  }, []);

  const makeMove = useCallback((index: number) => {
    setGameState(prevState => {
      if (prevState.board[index] !== null || prevState.status !== 'playing') {
        return prevState;
      }

      const newBoard = [...prevState.board];
      newBoard[index] = prevState.currentPlayer;

      const { winner, line } = checkWinner(newBoard);
      const isDraw = !winner && isBoardFull(newBoard);

      if (winner || isDraw) {
        // Update scores
        if (winner) {
          setScores(prev => {
            if (gameMode === 'ai-vs-ai') {
              return winner === 'X' ? { ...prev, player: prev.player + 1 } : { ...prev, ai: prev.ai + 1 };
            }
            return winner === 'X' ? { ...prev, player: prev.player + 1 } : { ...prev, ai: prev.ai + 1 };
          });
        } else {
          setScores(prev => ({ ...prev, draws: prev.draws + 1 }));
        }
      }

      return {
        board: newBoard,
        currentPlayer: prevState.currentPlayer === 'X' ? 'O' : 'X',
        winner,
        status: winner ? 'won' : isDraw ? 'draw' : 'playing',
        winningLine: line,
      };
    });
  }, [gameMode]);

  // AI move effect
  useEffect(() => {
    const { currentPlayer, status, board } = gameState;
    
    if (status !== 'playing') return;

    const shouldAIMove = 
      (gameMode === 'player-vs-ai' && currentPlayer === 'O') ||
      (gameMode === 'ai-vs-ai');

    if (shouldAIMove) {
      setIsAIThinking(true);
      const delay = gameMode === 'ai-vs-ai' ? 600 : 400;
      
      aiTimeoutRef.current = setTimeout(() => {
        const aiMove = getAIMove([...board], difficulty, currentPlayer);
        if (aiMove !== -1) {
          makeMove(aiMove);
        }
        setIsAIThinking(false);
      }, delay);
    }

    return () => {
      if (aiTimeoutRef.current) {
        clearTimeout(aiTimeoutRef.current);
      }
    };
  }, [gameState.currentPlayer, gameState.status, gameState.board, gameMode, difficulty, makeMove]);

  const handleCellClick = useCallback((index: number) => {
    if (gameMode === 'ai-vs-ai') return;
    if (isAIThinking) return;
    if (gameState.currentPlayer !== 'X') return;
    
    makeMove(index);
  }, [gameMode, isAIThinking, gameState.currentPlayer, makeMove]);

  const changeDifficulty = useCallback((newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
    resetGame();
    resetScores();
  }, [resetGame, resetScores]);

  const changeGameMode = useCallback((newMode: GameMode) => {
    setGameMode(newMode);
    resetGame();
    resetScores();
  }, [resetGame, resetScores]);

  return {
    board: gameState.board,
    currentPlayer: gameState.currentPlayer,
    winner: gameState.winner,
    status: gameState.status,
    winningLine: gameState.winningLine,
    difficulty,
    gameMode,
    scores,
    isAIThinking,
    handleCellClick,
    resetGame,
    resetScores,
    changeDifficulty,
    changeGameMode,
  };
}
