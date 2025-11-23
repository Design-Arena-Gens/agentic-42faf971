'use client';

import { useState } from 'react';
import { UniverseDocument } from '@/lib/universeParser';
import { JsonTree } from './JsonTree';
import styles from './DocumentTabs.module.css';

type Props = {
  documents: UniverseDocument[];
};

export function DocumentTabs({ documents }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeDocument = documents[activeIndex];

  return (
    <section className={styles.wrapper}>
      <header className={styles.header}>
        <h2>Documents analysés</h2>
        <p>
          {documents.length} élément(s) extrait(s) de l’univers. Choisissez un fichier pour explorer sa structure.
        </p>
      </header>

      <div className={styles.tabs}>
        {documents.map((doc, index) => (
          <button
            key={doc.path}
            onClick={() => setActiveIndex(index)}
            className={[styles.tab, index === activeIndex ? styles.active : ''].join(' ')}
          >
            <span className={styles.tabName}>{doc.path}</span>
            <span className={styles.tabBadge}>{doc.kind}</span>
          </button>
        ))}
      </div>

      <div className={styles.panel}>
        {activeDocument ? (
          activeDocument.data ? (
            <div className={styles.tree}>
              <JsonTree label={activeDocument.path} value={activeDocument.data as any} />
            </div>
          ) : (
            <pre className={styles.pre}>{activeDocument.rawSnippet}</pre>
          )
        ) : null}
      </div>
    </section>
  );
}
