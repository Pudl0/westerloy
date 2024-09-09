import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getBase64 } from '@/lib/utils/utils';

interface ImagePickerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
  control: Control<TFieldValues>;
  label?: string;
}

export function ImagePicker<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ name, control, label = 'Bild auswählen' }: ImagePickerProps<TFieldValues, TName>) {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ name, control });
  const [image, setImage] = useState<string | null>(null);

  const onImageChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        try {
          const base64 = await getBase64(file);
          setImage(base64 as string);
          onChange(event.target.files);
        } catch (error) {
          console.error('Error converting image to base64:', error);
        }
      }
    },
    [onChange]
  );

  return (
    <div className="space-y-4">
      <Label htmlFor={name}>{label}</Label>
      <div className="flex items-center space-x-4">
        <Input id={name} type="file" onChange={onImageChange} accept="image/*" className="hidden" />
        <Button type="button" variant="outline" onClick={() => document.getElementById(name)?.click()}>
          {value ? 'Bild ändern' : 'Bild auswählen'}
        </Button>
        {value && <span className="text-sm text-muted-foreground">{(value as FileList)[0]?.name}</span>}
      </div>
      {image && (
        <div className="mt-4">
          <Image
            src={image}
            width={250}
            height={150}
            alt="Vorschau des ausgewählten Bildes"
            className="rounded-md object-cover"
          />
        </div>
      )}
      {error && <p className="mt-2 text-sm text-destructive">{error.message}</p>}
    </div>
  );
}
