import { useCallback, useEffect, useMemo, useState } from 'react';

import { defaultColors } from '../constants/colors';
import { ColorStripe } from './ColorStripe';
import styles from './Rainbow.module.css';

export function Rainbow() {
  const [lock, setLock] = useState(false);

  // Fake data
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const colors = {
    data: defaultColors.map((color) => ({ ...color, count: Math.random() })),
  };
  useEffect(() => {
    if (Math.random() > 0.8) {
      setIsError(true);
    }
  }, []);

  const handleColorClick = useCallback((id: string) => {
    setLock(true);

    // Fake mutation
    console.log('vote for', id);
    setIsFetching(true);
    setTimeout(() => {
      setIsFetching(false);
      setLock(false);
    }, 100);
  }, []);

  const rainbowClassName = useMemo(
    () =>
      [
        styles.rainbow,
        isFetching ? styles.rainbowLoading : '',
        isError ? styles.rainbowError : '',
      ].join(' '),
    [isError, isFetching],
  );

  const colorList = useMemo(
    () => colors.data ?? defaultColors.map((color) => ({ ...color, count: 1 })),
    [colors.data],
  );

  return (
    <div className={rainbowClassName}>
      {colorList.map((color) => (
        <ColorStripe
          key={color.id}
          color={color}
          disabled={isFetching || isError || lock}
          onClick={handleColorClick}
        />
      ))}
    </div>
  );
}
