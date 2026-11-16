import { candidates } from './data/candidates';
import { Header } from './components/Header';
import { CandidateCard } from './components/CandidateCard';

const App = () => {
  return (
    <div>
      <Header />
      <main className="container">
        <CandidateCard
          candidate={candidates[0]}
          isFavorite={false}
          onToggleFavorite={() => undefined}
        />
      </main>
    </div>
  );
};

export default App;
