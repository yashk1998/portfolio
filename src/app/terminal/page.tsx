import { Terminal } from '@/components/Terminal';
import { Providers } from '@/lib/providers';

export default function TerminalPage() {
  return (
    <Providers>
      <main style={{ 
        minHeight: '100vh', 
        margin: 0,
        padding: 0
      }}>
        <Terminal />
      </main>
    </Providers>
  );
} 