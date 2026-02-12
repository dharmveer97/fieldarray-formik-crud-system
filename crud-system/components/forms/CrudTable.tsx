'use client';

import { useState } from 'react';
import { Formik, Form, FieldArray, FormikHelpers } from 'formik';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { CrudTableRow } from '@/components/molecules/CrudTableRow';
import { AddRowButton } from '@/components/atoms/AddRowButton';
import { CrudConfig } from '@/lib/types';
import { confirmDelete } from '@/lib/utils/toast';
import { toast } from 'sonner';

interface CrudTableProps<T extends { id: number }> {
  config: CrudConfig<T>;
  items: T[];
  onSave: (items: T[], dirtyIndexes: number[]) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export function CrudTable<T extends { id: number }>({
  config,
  items,
  onSave,
  onDelete
}: CrudTableProps<T>) {
  const [savingIndexes, setSavingIndexes] = useState<Set<number>>(new Set());

  const handleSubmit = async (
    values: { items: T[] },
    { setSubmitting, resetForm }: FormikHelpers<{ items: T[] }>
  ) => {
    try {
      const dirtyIndexes = values.items
        .map((item, idx) => (item.id === 0 || JSON.stringify(item) !== JSON.stringify(items[idx]) ? idx : -1))
        .filter(idx => idx !== -1);

      if (dirtyIndexes.length === 0) {
        toast.info('No changes to save');
        setSubmitting(false);
        return;
      }

      // Mark rows as saving
      setSavingIndexes(new Set(dirtyIndexes));

      // Save each row with a small delay for visual feedback
      for (const idx of dirtyIndexes) {
        await onSave([values.items[idx]], [0]);
        // Remove from saving set after each save
        setSavingIndexes(prev => {
          const next = new Set(prev);
          next.delete(idx);
          return next;
        });
      }

      resetForm({ values });
      toast.success(`Saved ${dirtyIndexes.length} item(s)`);
    } catch {
      toast.error('Failed to save');
      setSavingIndexes(new Set());
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = (item: T, remove: (index: number) => void, index: number) => {
    confirmDelete(`Delete this ${config.name.toLowerCase().slice(0, -1)}?`, async () => {
      if (item.id !== 0) {
        await onDelete(item.id);
      }
      remove(index);
    });
  };

  return (
    <Formik
      initialValues={{ items }}
      validationSchema={config.validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values, isSubmitting, dirty }) => (
        <Form className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                {config.fields.map(field => (
                  <TableHead key={field.name}>{field.label}</TableHead>
                ))}
                <TableHead className="w-20">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <FieldArray name="items">
                {({ push, remove }) => (
                  <>
                    {values.items.map((item, index) => (
                      <CrudTableRow
                        key={item.id || index}
                        item={item}
                        index={index}
                        config={config}
                        onDelete={() => handleDelete(item, remove, index)}
                        isSaving={savingIndexes.has(index)}
                      />
                    ))}
                    <TableRow>
                      <AddRowButton
                        onClick={() => push(config.emptyItem)}
                        colSpan={config.fields.length + 1}
                      />
                    </TableRow>
                  </>
                )}
              </FieldArray>
            </TableBody>
          </Table>
          <div className="flex gap-2 items-center">
            <Button type="submit" disabled={isSubmitting || !dirty}>
              {isSubmitting ? (
                <>
                  <Spinner size="sm" className="mr-2" />
                  Saving...
                </>
              ) : (
                'Save & Continue'
              )}
            </Button>
            {dirty && !isSubmitting && <span className="text-sm text-muted-foreground">Unsaved changes</span>}
          </div>
        </Form>
      )}
    </Formik>
  );
}
