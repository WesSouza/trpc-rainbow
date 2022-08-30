import Redis from 'ioredis';

import { defaultColors } from '../../src/constants/colors';
import { ColorId } from '../../src/types';

if (typeof process.env.REDIS_URL !== 'string') {
  throw new Error('Missing REDIS_URL');
}

const client = new Redis(process.env.REDIS_URL);

function mapVotes(colorVotes: Record<string, string>) {
  return defaultColors.map((color) => ({
    id: color.id,
    hex: color.hex,
    count: (colorVotes[color.id] ? Number(colorVotes[color.id]) : 0) + 5,
  }));
}

export async function getColors() {
  const colorVotes = await client.hgetall('colorVotes');
  return mapVotes(colorVotes);
}

export async function vote(colorId: ColorId) {
  await client.hincrby('colorVotes', colorId, 1);
  return true;
}
