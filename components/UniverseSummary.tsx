'use client';

import { UniverseSummary } from '@/lib/universeParser';
import styles from './UniverseSummary.module.css';

type Props = {
  summary: UniverseSummary;
};

export function UniverseSummaryCard({ summary }: Props) {
  const metrics = [
    { label: 'Classes', value: summary.classes.length },
    { label: 'Dimensions', value: summary.dimensions.length },
    { label: 'Mesures', value: summary.measures.length },
    { label: 'Filtres', value: summary.filters.length },
    { label: 'Contextes', value: summary.contexts.length },
    { label: 'Connexions', value: summary.connections.length }
  ];

  return (
    <section className={styles.wrapper}>
      <header>
        <h2>Résumé fonctionnel</h2>
        <p>
          Aperçu automatique basé sur les métadonnées détectées dans l’univers chargé.
        </p>
      </header>

      <div className={styles.metrics}>
        {metrics.map((metric) => (
          <div key={metric.label} className={styles.metric}>
            <span className={styles.metricValue}>{metric.value}</span>
            <span className={styles.metricLabel}>{metric.label}</span>
          </div>
        ))}
      </div>

      <div className={styles.columns}>
        <Column title="Classes" values={summary.classes} />
        <Column title="Dimensions" values={summary.dimensions} />
        <Column title="Mesures" values={summary.measures} />
        <Column title="Filtres" values={summary.filters} />
      </div>

      <div className={styles.listSection}>
        <List title="Contextes" values={summary.contexts} />
        <List title="Connexions" values={summary.connections} />
      </div>

      {summary.sqlSnippets.length > 0 ? (
        <div className={styles.sqlSection}>
          <h3>Extraits SQL détectés</h3>
          <ul>
            {summary.sqlSnippets.map((sql, index) => (
              <li key={index}>
                <code>{sql}</code>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {summary.warnings.length > 0 ? (
        <div className={styles.warning}>
          <h3>Attention</h3>
          <ul>
            {summary.warnings.map((warning, index) => (
              <li key={index}>{warning}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}

function Column({ title, values }: { title: string; values: string[] }) {
  if (values.length === 0) {
    return null;
  }
  return (
    <div className={styles.column}>
      <h3>{title}</h3>
      <ul>
        {values.map((value) => (
          <li key={value}>{value}</li>
        ))}
      </ul>
    </div>
  );
}

function List({ title, values }: { title: string; values: string[] }) {
  if (values.length === 0) {
    return null;
  }
  return (
    <div className={styles.listBlock}>
      <h3>{title}</h3>
      <ul>
        {values.map((value) => (
          <li key={value}>{value}</li>
        ))}
      </ul>
    </div>
  );
}
