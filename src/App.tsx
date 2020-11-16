import React, { useState } from 'react';
import './App.css';
import { Button } from './components/Button/button';


type Rectangle = {
  id: number,
  amount: number,
  color: string,
};


const ColorApp = () => {
  const [rectangles, setRectangles] = useState<Rectangle[]>([]);
  const [inputColor, setInputColor] = useState('');
  const [showAmount, setShowAmount] = useState(true);


  return (
    <div className="colorApp">
      <div className="input-wrapper">
        <input
          type="text"
          className="input"
          value={inputColor}
          placeholder="Enter your color..."
          onChange={(e) => setInputColor(e.target.value)}
        />
        <Button
          text="Add"
          onClick={() => {
            if (inputColor) {
              if (rectangles.some(({ color }) => color === inputColor)) {
                const index = rectangles
                  .findIndex(({ color }) => color === inputColor);
                rectangles[index].amount += 1;
              } else {
                setRectangles([
                  ...rectangles,
                  {
                    id: rectangles.length + 1,
                    amount: 1,
                    color: inputColor,
                  }
                ]);
              }
            }
            setInputColor('');
          }}
        />
      </div>

      {rectangles.map(({ id, amount, color }) => {
        return (
          <div
            key={id}
            className="rectangle"
            style={{ backgroundColor: color }}
          >
            {amount > 1 &&
              <div
                role="button"
                tabIndex={0}
                onClick={() => setShowAmount(false)}
                onKeyDown={() => setShowAmount(false)}
              >
                <div style={{ display: showAmount ? 'block' : 'none' }}>{amount}</div>
              </div>}
          </div>
        );
      })}
    </div>
  );
};

export default ColorApp;
