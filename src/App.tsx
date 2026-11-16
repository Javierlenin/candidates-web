import { candidates } from './data/candidates';
import { Header } from './components/Header';
import { CandidateList } from './components/CandidateList';

const App = () => {
  return (
    <div>
      <Header />
      <main className="container">
        <CandidateList
          candidates={candidates}
          favoriteIds={[]}
          onToggleFavorite={() => undefined}
        />
      </main>
    </div>
  );
};

export default App;
