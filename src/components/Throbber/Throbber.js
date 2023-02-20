import Dot from './Dot';

const Throbber = () => {
  return (
    <div className="throbber">
      <div className="circle-of-dots">
        { Array(10).fill(true).map((item, index) => {
          let rotateValue = 360 - 36 * index;
          let delayValue = 1000 - 100 * index;
          return (
            <Dot 
              rotateValue={ rotateValue }
              delayValue={ delayValue }
              key={ `dot_${index}` }
            />
          );
        }) }
      </div>
    </div>
  );
}

export default Throbber;
