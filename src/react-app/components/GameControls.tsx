import { cn } from '@/react-app/lib/utils';
import type { Difficulty, GameMode } from '@/react-app/hooks/useTicTacToe';
import { RotateCcw, Bot, User, Cpu } from 'lucide-react';

interface GameControlsProps {
  difficulty: Difficulty;
  gameMode: GameMode;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onGameModeChange: (mode: GameMode) => void;
  onReset: () => void;
}

const difficulties: { value: Difficulty; label: string; description: string }[] = [
  { value: 'easy', label: 'Fácil', description: 'IA joga de forma aleatória' },
  { value: 'medium', label: 'Médio', description: 'IA moderadamente inteligente' },
  { value: 'hard', label: 'Difícil', description: 'Impossível vencer' },
];

const gameModes: { value: GameMode; label: string; icon: React.ReactNode }[] = [
  { value: 'player-vs-ai', label: 'Jogador x IA', icon: <><User className="w-4 h-4" /><span>vs</span><Bot className="w-4 h-4" /></> },
  { value: 'ai-vs-ai', label: 'IA x IA', icon: <><Cpu className="w-4 h-4" /><span>vs</span><Cpu className="w-4 h-4" /></> },
];

export function GameControls({
  difficulty,
  gameMode,
  onDifficultyChange,
  onGameModeChange,
  onReset,
}: GameControlsProps) {
  return (
    <div className="space-y-6 w-full max-w-[400px]">
      {/* Game Mode */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Modo de Jogo
        </label>
        <div className="grid grid-cols-2 gap-2">
          {gameModes.map(mode => (
            <button
              key={mode.value}
              onClick={() => onGameModeChange(mode.value)}
              className={cn(
                "flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium",
                "transition-all duration-200",
                "border-2",
                gameMode === mode.value
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-foreground border-border hover:border-primary/50 hover:bg-muted/50"
              )}
            >
              {mode.icon}
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Dificuldade
        </label>
        <div className="grid grid-cols-3 gap-2">
          {difficulties.map(diff => (
            <button
              key={diff.value}
              onClick={() => onDifficultyChange(diff.value)}
              className={cn(
                "py-3 px-4 rounded-lg text-sm font-medium",
                "transition-all duration-200",
                "border-2",
                difficulty === diff.value
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-foreground border-border hover:border-primary/50 hover:bg-muted/50"
              )}
            >
              {diff.label}
            </button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground text-center mt-1">
          {difficulties.find(d => d.value === difficulty)?.description}
        </p>
      </div>

      {/* Reset Button */}
      <button
        onClick={onReset}
        className={cn(
          "w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg",
          "bg-secondary text-secondary-foreground font-medium",
          "hover:bg-secondary/80 transition-colors duration-200",
          "border-2 border-border hover:border-primary/30"
        )}
      >
        <RotateCcw className="w-4 h-4" />
        Nova Partida
      </button>
    </div>
  );
}
