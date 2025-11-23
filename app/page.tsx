'use client';

import { useCallback, useState } from 'react';
import { FileDropzone } from '@/components/FileDropzone';
import { UniverseSummaryCard } from '@/components/UniverseSummary';
import { DocumentTabs } from '@/components/DocumentTabs';
import { UniverseParseResult, parseUniverseFile } from '@/lib/universeParser';
import styles from './page.module.css';

type Status = 'idle' | 'parsing' | 'error' | 'done';

export default function HomePage() {
  const [status, setStatus] = useState<Status>('idle');
  const [result, setResult] = useState<UniverseParseResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onFile = useCallback(async (file: File) => {
    setStatus('parsing');
    setError(null);

    try {
      const parseResult = await parseUniverseFile(file);
      setResult(parseResult);
      setStatus('done');
    } catch (err) {
      setError((err as Error).message);
      setStatus('error');
    }
  }, []);

  const loadSample = useCallback(async () => {
    setStatus('parsing');
    setError(null);
    try {
      const response = await fetch('/sample/sample-universe.xml');
      if (!response.ok) {
        throw new Error('Impossible de charger l’exemple embarqué.');
      }
      const blob = await response.blob();
      const file = new File([blob], 'sample-universe.xml', { type: 'text/xml' });
      const parseResult = await parseUniverseFile(file);
      setResult(parseResult);
      setStatus('done');
    } catch (err) {
      setError((err as Error).message);
      setStatus('error');
    }
  }, []);

  return (
    <main>
      <section className="container">
        <header className={styles.hero}>
          <div>
            <p className={styles.pill}>Univers Business Objects → Explorer</p>
            <h1 className={styles.title}>Analyse et visualisation instantanée d’univers Business Objects</h1>
            <p className={styles.subtitle}>
              Importez un fichier .unx, .unv (export textuel) ou une extraction XML pour décortiquer
              automatiquement classes, objets, contextes et SQL.
            </p>
          </div>
          <div className={styles.actions}>
            <button className={styles.secondaryButton} onClick={loadSample} disabled={status === 'parsing'}>
              Charger un exemple
            </button>
          </div>
        </header>

        <FileDropzone onFile={onFile} accept=".unx,.xml,.json,.zip,.lcmbiar,.unv" />

        {status === 'parsing' ? (
          <div className={styles.loading}>
            <div className={styles.spinner} />
            <p>Analyse du fichier univers en cours…</p>
          </div>
        ) : null}

        {error ? <p className={styles.error}>{error}</p> : null}

        {status === 'done' && result ? (
          <>
            <UniverseSummaryCard summary={result.summary} />
            {result.documents.length > 0 ? <DocumentTabs documents={result.documents} /> : null}
          </>
        ) : null}
      </section>
    </main>
  );
}
