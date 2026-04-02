import { cn } from '@/react-app/lib/utils';
import type { Player, GameStatus as Status, GameMode } from '@/react-app/hooks/useTicTacToe';
import { Trophy, Handshake, Loader2 } from 'lucide-react';

interface GameStatusProps {
  status: Status;
  currentPlayer: Player;
  winner: Player;
  isAIThinking: boolean;
  gameMode: GameMode;
}

export function GameStatus({ status, currentPlayer, winner, isAIThinking, gameMode }: GameStatusProps) {
  const getStatusMessage = () => {
    if (status === 'won') {
      if (gameMode === 'ai-vs-ai') {
        return `IA ${winner} venceu!`;
      }
      return winner === 'X' ? 'Você venceu!' : 'A IA venceu!';
    }
    if (status === 'draw') {
      return 'Empate!';
    }
    if (isAIThinking) {
      return 'IA pensando...';
    }
    if (gameMode === 'ai-vs-ai') {
      return `Vez da IA ${currentPlayer}`;
    }
    return currentPlayer === 'X' ? 'Sua vez' : 'Vez da IA';
  };

  const getStatusIcon = () => {
    if (status === 'won') {
      return <Trophy className="w-6 h-6" />;
    }
    if (status === 'draw') {
      return <Handshake className="w-6 h-6" />;
    }
    if (isAIThinking) {
      return <Loader2 className="w-6 h-6 animate-spin" />;
    }
    return null;
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-3 py-4 px-6 rounded-xl",
        "text-lg md:text-xl font-semibold",
        "transition-all duration-300",
        status === 'won' && winner === 'X' && "bg-primary/20 text-primary",
        status === 'won' && winner === 'O' && "bg-destructive/20 text-destructive",
        status === 'draw' && "bg-muted text-muted-foreground",
        status === 'playing' && "bg-card border-2 border-border"
      )}
    >
      {getStatusIcon()}
      <span>{getStatusMessage()}</span>
    </div>
  );
}
