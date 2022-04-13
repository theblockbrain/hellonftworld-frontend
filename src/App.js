import './App.css';
import CollectionCard from './components/CollectionCard';

function App() {
  return (
    <div className="App">
      <h1 className="welocme">Welcome to the better pricing estimator!</h1>
      <CollectionCard name="Azuki" collection_address="0xed5af388653567af2f388e6224dc7c4b3241c544" />
    </div>
  );
}

export default App;
