
import React, {useEffect, useState, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import Throbber from './Throbber/Throbber';

const Home = (props) => {
  const navigate = useNavigate();

  const searchByBreed = () => {
    navigate(`/${props.selectedDogsBreed}`, { replace: true, state: { dogsBreed: props.selectedDogsBreed }});
  }

  const [isLoading, setIsLoading] = useState(true);
  const [dogImages, setDogImages] = useState([]);
  const count = useRef(0);

  useEffect(() => {
    fetch(`https://dog.ceo/api/breeds/image/random/12`)
    .then((response) => {
      if (response.status === 200 || response.ok) {
        return response.json();
      } else {
        setIsLoading(false);
        throw new Error(`HTTP error status: ${response.status}`);
      }
    })
    .then((json) => {
      setDogImages(json.message);
    });
  }, []);

  const onLoad = () => {
    count.current = count.current + 1;
    if (count.current === dogImages.length) {
      setIsLoading(false);
      console.log(dogImages)
    }
  };

  return (
    <div className='home'>
      <main className='home__main-container element-padding-hor ' role='main'>
      <h2>Find the dogs you love</h2>
      <div className='home__search-wrapper'>
        <select
          aria-label='Select a breed of dog to display results'
          value={ props.selectedDogsBreed }
          onChange={ (event) => props.changeSelectedDogsBreed(event.target.value) }
          >
          <option disabled={ props.selectedDogsBreed }>
            Select a dog's breed
          </option>
          {
            props.dogsBreed.map((breed) => (
              <option key={breed} value={breed}>{breed}</option>
              ))
            }
        </select>
        <button
          type='button'
          disabled={ !props.selectedDogsBreed }
          onClick={ searchByBreed }
          >
          Search
        </button>
        </div>
      </main>
      <section className='random-imgs element-padding-hor'>
        <h3 className=''>random pictures</h3>
        <div 
          className="dogs__imgs-container"
          data-testid="imgs-container"
        >
            {dogImages.length > 0 &&
              dogImages.map((imgSrc, index) => (
                <div className="dogs__img-wrapper"
                key={`${index}-${props.selectedBreed}`}>
                  {isLoading && (
                    <div className="dogs__loading-bg">
                      <Throbber />
                    </div>
                  )}
                <img 
                  className="dogs__dog-img"
                  onLoad={() => onLoad()}
                  src={imgSrc}
                  alt={`random dog`}
                  />
                </div>
              ))}
          </div>
      </section>
    </div>
  );
}

export default Home;
