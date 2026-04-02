import { cn } from '@/react-app/lib/utils';
import type { GameMode } from '@/react-app/hooks/useTicTacToe';
import { User, Bot, Minus } from 'lucide-react';

interface ScoreBoardProps {
  scores: { player: number; ai: number; draws: number };
  gameMode: GameMode;
}

export function ScoreBoard({ scores, gameMode }: ScoreBoardProps) {
  return (
    <div className="grid grid-cols-3 gap-3 w-full max-w-[400px]">
      <div className={cn(
        "flex flex-col items-center py-4 px-3 rounded-xl",
        "bg-primary/10 border-2 border-primary/30"
      )}>
        <div className="flex items-center gap-1.5 text-primary mb-1">
          {gameMode === 'ai-vs-ai' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
          <span className="text-xs font-medium uppercase tracking-wider">
            {gameMode === 'ai-vs-ai' ? 'IA X' : 'Você'}
          </span>
        </div>
        <span className="text-3xl font-bold text-primary">{scores.player}</span>
      </div>

      <div className={cn(
        "flex flex-col items-center py-4 px-3 rounded-xl",
        "bg-muted border-2 border-border"
      )}>
        <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
          <Minus className="w-4 h-4" />
          <span className="text-xs font-medium uppercase tracking-wider">Empates</span>
        </div>
        <span className="text-3xl font-bold text-muted-foreground">{scores.draws}</span>
      </div>

      <div className={cn(
        "flex flex-col items-center py-4 px-3 rounded-xl",
        "bg-destructive/10 border-2 border-destructive/30"
      )}>
        <div className="flex items-center gap-1.5 text-destructive mb-1">
          <Bot className="w-4 h-4" />
          <span className="text-xs font-medium uppercase tracking-wider">
            {gameMode === 'ai-vs-ai' ? 'IA O' : 'IA'}
          </span>
        </div>
        <span className="text-3xl font-bold text-destructive">{scores.ai}</span>
      </div>
    </div>
  );
}
