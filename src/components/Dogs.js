import React, { useState, useEffect, useRef } from "react"
import { useParams, Link } from 'react-router-dom'
import NotFound from "./NotFound";
import Throbber from "./Throbber/Throbber";

const Dogs = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [dogImages, setDogImages] = useState([]);
  const count = useRef(0);

  const { id } = useParams();

  useEffect(() => {
    if (id && props.dogsBreed.includes(id)) {
    fetch(`https://dog.ceo/api/breed/${id}/images`)
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
    }
  }, [props.dogsBreed, id]);

  const onLoad = () => {
    count.current = count.current + 1;
    if (count.current === dogImages.length) {
      setIsLoading(false);
    }
  };

  return (
    <>
      {id && props.dogsBreed.includes(id) ?
        <section className="dogs element-padding-hor">
          <h2>results for {id} breed</h2>
          
            <button className="dogs__back-to-home"><Link to='/'>back to search</Link></button>
          
          <div 
            className="dogs__imgs-container"
            data-testid="imgs-container"  
          >
            {dogImages.length > 0 &&
              dogImages.map((imgSrc, index) => (
                <div 
                  className="dogs__img-wrapper" 
                  key={`${index}-${props.selectedBreed}`} 
                >
                  {isLoading && (
                    <div className="dogs__loading-bg">
                      <Throbber />
                    </div>
                  )}
                  <img 
                    className="dogs__dog-img"
                    onLoad={() => onLoad()}
                    src={imgSrc}
                    alt={`${id} dog`}
                  />
                </div>
              ))}
          </div>
          
            <button className="dogs__back-to-home"><Link to='/'>back to search</Link></button>
          
        </section> :
        <NotFound />}
    </>
  );
}

export default Dogs;
