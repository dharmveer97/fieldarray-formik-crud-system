import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface DeleteButtonProps {
  onClick: () => void;
}

export function DeleteButton({ onClick }: DeleteButtonProps) {
  return (
    <Button
      type="button"
      variant="destructive"
      size="sm"
      onClick={onClick}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}
