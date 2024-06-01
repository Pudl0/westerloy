import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import { useController } from 'react-hook-form';

import { getBase64 } from '@/lib/utils/utils';

export function MultipleImagePicker({ name, errors, control }) {
  const { field } = useController({ name, control });
  const [images, setImages] = useState([]);

  const onAvatarChange = useCallback(
    async (event) => {
      if (event.target.files) {
        const base64Images = await Promise.all(Array.from(event.target.files).map((file) => getBase64(file)));

        setImages(base64Images);
        field.onChange(event.target.files);
      }
    },
    [field]
  );

  return (
    <div>
      <label>Bilder auswählen:</label>
      {images.map((image, index) => (
        <Image key={index} src={image} width="250" height="150" alt="Hier sollte ein Bild sein" />
      ))}
      <input type="file" onChange={onAvatarChange} multiple />
      <p>{errors[name]?.message}</p>
    </div>
  );
}
