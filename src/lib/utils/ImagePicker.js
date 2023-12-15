import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import { useController } from 'react-hook-form';

import { getBase64 } from './utils';

export function ImagePicker({ name, errors, control }) {
  const { field } = useController({ name, control });
  const [image, setImage] = useState();

  const onAvatarChange = useCallback(
    async (event) => {
      if (event.target.files?.[0]) {
        const base64 = await getBase64(event.target.files[0]);

        setImage(base64);
        field.onChange(event.target.files);
      }
    },
    [field]
  );

  return (
    <div>
      <label>Bild auswählen</label>
      {image && <Image src={image} width="250" height="150" alt="Hier sollte ein Bild sein"></Image>}
      <input type="file" onChange={onAvatarChange} />
      <p>{errors[name]?.message}</p>
    </div>
  );
}
