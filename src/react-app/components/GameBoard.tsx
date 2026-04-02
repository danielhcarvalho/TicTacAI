import { cn } from '@/react-app/lib/utils';
import type { Board, Player } from '@/react-app/hooks/useTicTacToe';

interface GameBoardProps {
  board: Board;
  winningLine: number[] | null;
  onCellClick: (index: number) => void;
  disabled: boolean;
}

interface CellProps {
  value: Player;
  index: number;
  isWinning: boolean;
  onClick: () => void;
  disabled: boolean;
}

function Cell({ value, isWinning, onClick, disabled }: CellProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || value !== null}
      className={cn(
        "aspect-square flex items-center justify-center text-5xl md:text-7xl font-bold",
        "bg-card border-2 border-border rounded-xl",
        "transition-all duration-300 ease-out",
        "hover:bg-muted/50 hover:scale-[0.98]",
        "disabled:cursor-default disabled:hover:scale-100 disabled:hover:bg-card",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
        isWinning && "bg-primary/20 border-primary scale-105",
        value === null && !disabled && "hover:border-primary/50"
      )}
    >
      {value && (
        <span
          className={cn(
            "animate-in zoom-in-50 duration-200",
            value === 'X' ? 'text-primary' : 'text-destructive'
          )}
        >
          {value}
        </span>
      )}
    </button>
  );
}

export function GameBoard({ board, winningLine, onCellClick, disabled }: GameBoardProps) {
  return (
    <div className="grid grid-cols-3 gap-3 w-full max-w-[340px] md:max-w-[400px] mx-auto">
      {board.map((cell, index) => (
        <Cell
          key={index}
          value={cell}
          index={index}
          isWinning={winningLine?.includes(index) ?? false}
          onClick={() => onCellClick(index)}
          disabled={disabled}
        />
      ))}
    </div>
  );
}
