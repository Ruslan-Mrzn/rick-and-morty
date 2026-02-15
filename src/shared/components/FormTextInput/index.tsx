import { Controller } from 'react-hook-form';
import type { Control, FieldError, FieldValues, Path } from 'react-hook-form';

import { TextInput } from '@/shared/components';
import type { TextInputProps } from '@/shared/types';

type FormTextInputProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  error?: FieldError;
} & TextInputProps;

const FormTextInput = <T extends FieldValues>({
  control,
  name,
  variant = 'underlined',
  placeholder,
  onKeyDown,
  icon
}: FormTextInputProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextInput
          variant={variant}
          placeholder={placeholder}
          name={field.name}
          value={field.value || ''}
          onChange={field.onChange}
          onKeyDown={onKeyDown}
          icon={icon}
        />
      )}
    />
  );
};

export default FormTextInput;
