import { useCallback, useMemo, useState } from 'react';

import { defaultColors } from '../constants/colors';
import { trpc } from '../utils/trpc';
import { ColorStripe } from './ColorStripe';
import styles from './Rainbow.module.css';

export function Rainbow() {
  const [lock, setLock] = useState(false);

  const colors = trpc.useQuery(['getColors']);
  const vote = trpc.useMutation(['vote']);

  const { isFetching, isError } = colors;

  const handleColorClick = useCallback(
    (id: string) => {
      setLock(true);

      vote
        .mutateAsync(id)
        .then(() => colors.refetch())
        .finally(() => setLock(false));
    },
    [colors, vote],
  );

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
