import React, { FC } from 'react';
import styles from './button.module.scss';


type Props = {
  text: string,
  onClick?: () => void
};

export const Button: FC<Props> = ({ text, onClick }) => {
  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        className={styles.button}
      >{text}
      </button>
    </div>
  );
};