import { useCallback } from 'react';

import { Color, ColorId } from '../types';
import { plural } from '../utils/strings';
import styles from './Rainbow.module.css';

export function ColorStripe({
  color,
  disabled,
  onClick,
}: {
  color: Color;
  disabled: boolean;
  onClick: (id: ColorId) => void;
}) {
  const handleClick = useCallback(() => {
    onClick(color.id);
  }, [color.id, onClick]);

  return (
    <button
      className={styles.colorStripe}
      disabled={disabled}
      onClick={handleClick}
      style={{ '--hex': color.hex, '--proportion': color.count ?? 1 }}
      aria-label={
        color.count ? plural(color.count, '%d vote', '%d votes') : undefined
      }
      type="button"
    ></button>
  );
}
