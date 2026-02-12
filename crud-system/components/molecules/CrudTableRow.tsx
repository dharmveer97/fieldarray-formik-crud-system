'use client';

import { memo } from 'react';
import { useFormikContext } from 'formik';
import { TableRow, TableCell } from '@/components/ui/table';
import { FormField } from '@/components/atoms/FormField';
import { DeleteButton } from '@/components/atoms/DeleteButton';
import { Spinner } from '@/components/ui/spinner';
import { CrudConfig } from '@/lib/types';
import { Check } from 'lucide-react';

interface CrudTableRowProps<T extends { id: number }> {
  item: T;
  index: number;
  config: CrudConfig<T>;
  onDelete: () => void;
  isSaving?: boolean;
}

function CrudTableRowComponent<T extends { id: number }>({
  item,
  index,
  config,
  onDelete,
  isSaving = false,
}: CrudTableRowProps<T>) {
  const { values, errors, touched, handleChange, handleBlur } = useFormikContext<{ items: T[] }>();

  return (
    <TableRow className={isSaving ? 'bg-blue-50 animate-pulse' : ''}>
      {config.fields.map((field) => {
        const fieldName = `items[${index}].${field.name}`;
        const fieldValue = (values.items[index] as Record<string, unknown>)[field.name];
        
        const itemErrors = Array.isArray(errors.items) ? errors.items[index] as Record<string, string> | undefined : undefined;
        const itemTouched = Array.isArray(touched.items) ? touched.items[index] as Record<string, boolean> | undefined : undefined;
        const fieldError = itemTouched?.[field.name] && itemErrors?.[field.name] ? itemErrors[field.name] : undefined;

        return (
          <TableCell key={field.name}>
            <FormField
              name={fieldName}
              value={fieldValue}
              config={field}
              error={fieldError}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </TableCell>
        );
      })}
      <TableCell>
        <div className="flex items-center gap-2">
          {isSaving ? (
            <div className="flex items-center gap-1 text-blue-600">
              <Spinner size="sm" />
              <span className="text-xs">Saving...</span>
            </div>
          ) : (
            <DeleteButton onClick={onDelete} />
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}

export const CrudTableRow = memo(CrudTableRowComponent) as typeof CrudTableRowComponent;
