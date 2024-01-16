import React, { useState, useEffect, useId } from "react";

export default function Meme() {
  const randomId = useId();
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });

  const [allMemes, setAllMemes] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMeme((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomIndex].url;
    setMeme((prev) => ({
      ...prev,
      randomImage: url,
    }));
  };

  useEffect(() => {
    async function getMemes() {
      const data = await fetch("https://api.imgflip.com/get_memes");
      const dataJSON = await data.json();
      setAllMemes(dataJSON.data.memes);
    }

    getMemes();
  }, []);

  return (
    <main>
      <div className="meme--form">
        <div>
          <label className="meme-label" htmlFor={`${randomId}-topText`}>
            Top text
          </label>
          <input
            id={`${randomId}-topText`}
            type="text"
            placeholder="Shut up"
            className="meme--input"
            name="topText"
            value={meme.topText}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="meme-label" htmlFor={`${randomId}-bottomText`}>
            Bottom text
          </label>
          <input
            id={`${randomId}-bottomText`}
            type="text"
            placeholder="And take my money"
            className="meme--input"
            name="bottomText"
            value={meme.bottomText}
            onChange={handleChange}
          />
        </div>
        <button className="meme--btn" onClick={getRandomImage}>
          Get a new meme image 🖼️
        </button>
      </div>

      <div className="meme">
        <img src={meme.randomImage} className="meme--image" />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
}
