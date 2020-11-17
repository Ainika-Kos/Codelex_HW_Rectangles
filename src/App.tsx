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

  const convert = (input: string) => {
    return input.split('').map((item) => item.toLocaleLowerCase()).join('');
  };

  const realColor = (input: string) => {
    const s = new Option().style;
    s.color = input;
    return s.color !== '';
  };

  const deleteRectangleHandler = (id: number) => {
    const index = rectangles.findIndex((item) => item.id === id);
    const newRectangles = [...rectangles];
    newRectangles.splice(index, 1);
    setRectangles(newRectangles);
  };

  return (
    <div className="colorApp">
      <div className="input-wrapper">
        <input
          type="text"
          className="input"
          value={inputColor}
          placeholder="Enter your color..."
          onChange={(e) => setInputColor(convert(e.target.value))}
        />
        <Button
          text="Add"
          onClick={() => {
            if (inputColor && realColor(inputColor)) {
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
            role="button"
            tabIndex={0}
            onClick={() => deleteRectangleHandler(id)}
            onKeyDown={() => deleteRectangleHandler(id)}
          >
            {amount > 1 &&
              <div>{amount}</div>}
          </div>
        );
      })}
    </div>
  );
};

export default ColorApp;
