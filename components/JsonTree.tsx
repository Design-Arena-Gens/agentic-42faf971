'use client';

import { useState } from 'react';
import styles from './JsonTree.module.css';

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

type Props = {
  label: string;
  value: JsonValue;
  defaultCollapsed?: boolean;
  depth?: number;
};

export function JsonTree({ label, value, defaultCollapsed = false, depth = 0 }: Props) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const isObject = typeof value === 'object' && value !== null;

  if (!isObject) {
    return (
      <div className={styles.row} style={{ paddingLeft: depth * 16 }}>
        <span className={styles.leafLabel}>{label}:</span>{' '}
        <span className={styles.leafValue}>{stringify(value)}</span>
      </div>
    );
  }

  if (Array.isArray(value)) {
    return (
      <div className={styles.group}>
        <div
          className={styles.row}
          style={{ paddingLeft: depth * 16 }}
          onClick={() => setCollapsed((prev) => !prev)}
        >
          <Toggle collapsed={collapsed} />
          <span className={styles.key}>{label}</span>
          <span className={styles.meta}>[{value.length}]</span>
        </div>
        {!collapsed ? (
          <div className={styles.children}>
            {value.map((item, index) => (
              <JsonTree
                key={index}
                label={`${index}`}
                value={item}
                defaultCollapsed={depth > 4}
                depth={depth + 1}
              />
            ))}
          </div>
        ) : null}
      </div>
    );
  }

  const entries = Object.entries(value);

  return (
    <div className={styles.group}>
      <div
        className={styles.row}
        style={{ paddingLeft: depth * 16 }}
        onClick={() => setCollapsed((prev) => !prev)}
      >
        <Toggle collapsed={collapsed} />
        <span className={styles.key}>{label}</span>
        <span className={styles.meta}>{'{' + entries.length + '}'}</span>
      </div>
      {!collapsed ? (
        <div className={styles.children}>
          {entries.map(([key, child]) => (
            <JsonTree
              key={key}
              label={key}
              value={child}
              defaultCollapsed={depth > 4}
              depth={depth + 1}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function Toggle({ collapsed }: { collapsed: boolean }) {
  return (
    <span className={styles.toggle} data-collapsed={collapsed}>
      {collapsed ? '▸' : '▾'}
    </span>
  );
}

function stringify(value: JsonValue) {
  if (typeof value === 'string') {
    return `"${value}"`;
  }
  if (value === null) {
    return 'null';
  }
  return String(value);
}
