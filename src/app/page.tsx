import { Terminal } from '@/components/Terminal';

export default function Home() {
  return (
    <main style={{ 
      minHeight: '100vh', 
      backgroundColor: '#000000', 
      color: '#00ff00', 
      fontFamily: 'IBM Plex Mono, monospace',
      margin: 0,
      padding: 0
    }}>
      <Terminal />
    </main>
  );
}
