import { useState, useEffect } from 'react'
import './App.css'
import data from '/images.json' with {type: 'json'}

function App() {
  const [guess, setGuess] = useState("");
  const [regOnly, setRegOnly] = useState(false);
  const [total, setTotal] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [randMin, setRandMin] = useState(0);
  const [randPic, setRandPic] = useState(0);

  const imagePool = regOnly 
    ? data.images.filter(image => image.stateOnly === false) 
    : data.images;
  
  useEffect(() => {
    if (randMin >= imagePool.length) {
      setRandMin(0);
      setRandPic(0);
    }
  }, [regOnly, imagePool.length, randMin]);
  
  function isCorrect(e) {
    e.preventDefault();
    const currentMineral = imagePool[randMin];
    if(!currentMineral) return;
    if (guess.toLowerCase() === currentMineral.name) {
      alert(guess + " is Correct")
      setCorrect(c => c + 1);
    } else {
      alert(guess + " is Incorrect. Correct answer is " + currentMineral.name)
    }

    setGuess("");
    setTotal(t => t + 1);
    generateRandom();
  }

  function generateRandom() {

    if (imagePool.length === 0) return;

    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * imagePool.length);
    } while (nextIndex === randMin && imagePool.length > 1);

    const nextPic = Math.floor(Math.random() * imagePool[nextIndex].url.length);

    setRandMin(nextIndex);
    setRandPic(nextPic);
  }
  
  return (
    <div className="App">
      <h1>Strata Study</h1>
      <p>Interactively practice Rock and Mineral ID</p>
      {imagePool[randMin] ? (
        <img 
          src={imagePool[randMin].url[randPic]} 
          className="minImage" 
          alt="Mineral Study"
        />
        ) : (
          <p>Loading next image...</p>
      )}
      <br/>
      <div>
        <p>Total Correct: {correct} &emsp;|&emsp; Total Guessed: {total}</p>
      </div>

      <form onSubmit={(isCorrect)}>
        <input type="text" value = {guess} id = "qbox" onChange={(e) => setGuess(e.target.value)}/>
      </form>
      <label htmlFor="regional">Regionals Only: </label>
      <input type="checkbox" name = "regional" checked = {regOnly} onChange={() => setRegOnly(!regOnly)}/>
    </div>
  );
}

export default App;