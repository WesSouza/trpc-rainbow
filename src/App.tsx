import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { Rainbow } from './Rainbow/Rainbow';
import { trpc } from './utils/trpc';

export function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      url: '/api/trpc',
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Rainbow />
      </QueryClientProvider>
    </trpc.Provider>
  );
}
