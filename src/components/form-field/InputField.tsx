import React, { useId } from 'react';
import { Path, useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form';
import { Input } from '@components/ui/input';

type FieldValues = Record<string, string>;

type Props<TFormValues extends FieldValues> = {
  name: Path<TFormValues>;
  description?: string;
  label?: string;
} & React.ComponentProps<typeof Input>;

export default function InputField<TFormValues extends FieldValues>({
  name,
  ...rest
}: Props<TFormValues>) {
  const id = useId();

  const { control } = useFormContext<TFormValues>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, formState: { errors } }) => (
        <FormItem className="flex flex-col w-full gap-y-1">
          {rest.label ? <FormLabel htmlFor={id}>{rest.label}</FormLabel> : null}
          <FormControl>
            <Input
              id={id}
              {...field}
              {...rest}
              intent={errors?.[name]?.message ? 'destructive' : rest.intent}
              onChange={(e) => {
                field.onChange?.(e.target.value);
              }}
              value={field.value as string}
            />
          </FormControl>
          {rest.description ? (
            <FormDescription>{rest.description}</FormDescription>
          ) : null}
          <FormMessage>{errors?.[name]?.message as string}</FormMessage>
        </FormItem>
      )}
    />
  );
}
