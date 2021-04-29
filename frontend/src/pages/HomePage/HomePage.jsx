import React from 'react';
import LoginButton from '../../components/LoginButton/LoginButton';
import styles from './HomePage.module.css';
import background from '../../assets/images/ROADI3-22.jpg';

export default function HomePage() {
  return (
    <div className={styles.background}>
      <div
        style={{
          backgroundImage: `url(${background})`,
        }}
        className={styles.image}
      />
      <div className={styles.rightContainer}>
        <div className={styles.loginContainer}>
          <h1>Road Trip Planner</h1>
          <LoginButton />
        </div>
      </div>
    </div>
  );
}
