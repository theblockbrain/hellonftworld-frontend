import { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import CollectionCard from './components/CollectionCard';

function App() {
  const [addCollectionInput, setAddCollectionInput] = useState("");
  return (
    <div className="App">
      <h1 className="welcome">Welcome to the better pricing estimator!</h1>
      <div className="navigation-area"> 
        <CollectionCard name="Azuki" collection_address="0xed5af388653567af2f388e6224dc7c4b3241c544" image='/azuki_collection_image.jpg' />
        <CollectionCard name="Everai Heroes: Duo" collection_address="0x9a38dec0590abc8c883d72e52391090e948ddf12" image='/everai.gif' />
        <CollectionCard name="Bored Ape Yacht Club" collection_address="0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d" image='/BAYC.png' />
        <CollectionCard name="World of Women" collection_address="0xe785e82358879f061bc3dcac6f0444462d4b5330" image='/worldofwomen.gif' />
        <CollectionCard name="Doodles" collection_address="0x8a90cab2b38dba80c64b7734e58ee1db38b8992e" image='/doodles.jpg' />
        <CollectionCard name="MFers" collection_address="0x79fcdef22feed20eddacbb2587640e45491b757f" image='/mfers.png' />
      </div>
      <div className="diy-area">
        <div className="diy-heading">Feeling Lucky? Try adding your own!</div>
        <div className="diy-disclaimer">! Please be aware that importing a collection of 10k NFTs might take several minutes, as the server needs to download all the meta data, calculate rarity information, and estimate values for every single token in the collection. If a collection is not following the usual conventions, this process might fail and you will have no way of knowing (besides the collection never loading). Due to a bug I haven't been able to fix so far, you will most likely have to wait on the site for a good 10 minutes, then refresh once, and after an other minute, everything should display as expected.</div>
        <div className="diy-form">
          <label htmlFor="collectioninput">Collection Address:</label>
        <input id="collectioninput" value={addCollectionInput} onChange={(e) => setAddCollectionInput(e.target.value.toLowerCase())}></input>
        <Link to={`/collections/${addCollectionInput}`} ><button className='diy-button'>GO!</button></Link> 
        </div>
      </div>
    </div>
  );
}

export default App;
