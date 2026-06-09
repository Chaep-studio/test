import TopNav from '../components/TopNav';
import Cover from '../components/Cover';
import EntrepreneurSection from '../components/EntrepreneurSection';
import ComparisonTable from '../components/ComparisonTable';
import Ending from '../components/Ending';
import { entrepreneurs } from '../data/entrepreneurs';

export default function Home() {
  const handleJump = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <main className="bg-[var(--ink-0)] text-[var(--text-1)] min-h-screen">
      <TopNav />
      <Cover onJump={handleJump} />
      {entrepreneurs.map((e) => (
        <EntrepreneurSection key={e.id} e={e} />
      ))}
      <ComparisonTable />
      <Ending />
    </main>
  );
}
