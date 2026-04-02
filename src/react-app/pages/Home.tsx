import { useEffect } from 'react';
import { useTicTacToe } from '@/react-app/hooks/useTicTacToe';
import { GameBoard } from '@/react-app/components/GameBoard';
import { GameControls } from '@/react-app/components/GameControls';
import { GameStatus } from '@/react-app/components/GameStatus';
import { ScoreBoard } from '@/react-app/components/ScoreBoard';
import { Sparkles } from 'lucide-react';

export default function HomePage() {
  const {
    board,
    currentPlayer,
    winner,
    status,
    winningLine,
    difficulty,
    gameMode,
    scores,
    isAIThinking,
    handleCellClick,
    resetGame,
    changeDifficulty,
    changeGameMode,
  } = useTicTacToe();

  // Load Google Font
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background dark">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />
      
      {/* Grid Pattern Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <header className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 mb-3">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Desafie a Máquina
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-3 tracking-tight">
            Velha AI
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-md mx-auto">
            Jogo da velha com inteligência artificial usando algoritmo Minimax
          </p>
        </header>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 lg:gap-16">
          {/* Game Section */}
          <div className="flex flex-col items-center gap-6">
            <GameStatus
              status={status}
              currentPlayer={currentPlayer}
              winner={winner}
              isAIThinking={isAIThinking}
              gameMode={gameMode}
            />
            
            <GameBoard
              board={board}
              winningLine={winningLine}
              onCellClick={handleCellClick}
              disabled={status !== 'playing' || isAIThinking || (gameMode === 'player-vs-ai' && currentPlayer === 'O')}
            />

            <ScoreBoard scores={scores} gameMode={gameMode} />
          </div>

          {/* Controls Section */}
          <div className="w-full max-w-[400px] lg:pt-12">
            <GameControls
              difficulty={difficulty}
              gameMode={gameMode}
              onDifficultyChange={changeDifficulty}
              onGameModeChange={changeGameMode}
              onReset={resetGame}
            />

            {/* Tips */}
            <div className="mt-8 p-4 rounded-xl bg-card border-2 border-border">
              <h3 className="font-semibold text-sm text-foreground mb-2">
                {difficulty === 'easy' && '🎮 Modo Fácil'}
                {difficulty === 'medium' && '🧠 Modo Médio'}
                {difficulty === 'hard' && '🤖 Modo Difícil'}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {difficulty === 'easy' && 'A IA joga de forma quase aleatória. Perfeito para iniciantes ou para treinar estratégias básicas.'}
                {difficulty === 'medium' && 'A IA usa estratégias moderadas. Preste atenção nos movimentos e você pode vencer!'}
                {difficulty === 'hard' && 'A IA usa o algoritmo Minimax completo. Matematicamente impossível vencer — o melhor que você pode conseguir é um empate.'}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center">
          <p className="text-xs text-muted-foreground/60">
            Desenvolvido com algoritmo Minimax para decisões de IA
          </p>
        </footer>
      </div>
    </div>
  );
}
