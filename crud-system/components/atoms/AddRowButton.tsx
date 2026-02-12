import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { TableCell } from '@/components/ui/table';

interface AddRowButtonProps {
  onClick: () => void;
  colSpan: number;
}

export function AddRowButton({ onClick, colSpan }: AddRowButtonProps) {
  const handleClick = () => {
    console.log('🔵 AddRowButton clicked');
    onClick();
  };

  return (
    <TableCell colSpan={colSpan}>
      <Button
        type="button"
        variant="outline"
        onClick={handleClick}
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" /> Add Row
      </Button>
    </TableCell>
  );
}
