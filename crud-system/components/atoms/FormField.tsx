import { Input } from '@/components/ui/input';
import { FieldConfig } from '@/lib/types';

interface FormFieldProps {
  name: string;
  value: any;
  config: FieldConfig;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export function FormField({ name, value, config, error, onChange, onBlur }: FormFieldProps) {
  return (
    <div>
      <Input
        type={config.type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={error ? 'border-red-500' : ''}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
