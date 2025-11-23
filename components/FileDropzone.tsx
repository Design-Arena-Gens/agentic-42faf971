'use client';

import { ChangeEvent, DragEvent, useCallback, useRef, useState } from 'react';
import styles from './FileDropzone.module.css';

type Props = {
  onFile(file: File): void;
  accept?: string;
};

export function FileDropzone({ onFile, accept }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) {
        return;
      }
      const file = files[0];
      setError(null);
      onFile(file);
    },
    [onFile]
  );

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleFiles(event.target.files);
  };

  const onDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(false);
    handleFiles(event.dataTransfer.files);
  };

  const onDragOver = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const openDialog = () => {
    setError(null);
    inputRef.current?.click();
  };

  return (
    <div>
      <label
        className={[styles.dropzone, isDragging ? styles.dragging : ''].join(' ')}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onClick={openDialog}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className={styles.input}
          onChange={onInputChange}
        />
        <div className={styles.content}>
          <span className={styles.icon}>📄</span>
          <p>
            Déposez un univers (.unx, .xml, .json) ou cliquez pour parcourir vos fichiers.
          </p>
          <small>Les fichiers compressés (.unx, .zip) sont automatiquement analysés.</small>
        </div>
      </label>
      {error ? <p className={styles.error}>{error}</p> : null}
    </div>
  );
}
