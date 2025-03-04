import { useContext, useEffect } from 'react';
import GeneralContext from 'context/GeneralContext';

import {
  Container,
  Title,
  Life,
  LifeValue,
  LifeBar,
  Button,
  Character
} from './styles';

export const Card = ({ bgColor, posCol, title, hero, children, margins }) => {
  useEffect(() => {
    document.querySelector('#attack-btn-h2').disabled = true;
  }, []);

  // Get the state
  const generalContext = useContext(GeneralContext);
  const {
    lifeHero1,
    lifeHero2,
    attackHero1,
    attackHero2,
    setWinner
  } = generalContext;

  // Calculate random value of attack
  function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  // Handler  for calculate the damage
  const handleClick = (element) => {
    //  get the button for hero 1
    const attackBtnH1 = document.getElementById('attack-btn-h1');

    const isDisabled1 = attackBtnH1.disabled;

    //  get the button for hero 2
    const attackBtnH2 = document.getElementById('attack-btn-h2');

    const isDisabled2 = attackBtnH2.disabled;

    // get the modal & bg
    const bg = document.querySelector('#background');
    const md = document.querySelector('#modal');

    const attack = getRandom(5, 30);

    if (element === 'Hero 1' && !isDisabled1) {
      //  Animation
      attackBtnH1.classList.add('clicked');
      setTimeout(() => {
        attackBtnH1.classList.remove('clicked');
      }, 100);

      //  Calculate the new life for hero 2
      const newLife2 = lifeHero2 - attack;

      // verify if Hero 2 is dead
      if (newLife2 <= 0) {
        setWinner('Player 1');
        bg.style.display = 'block';
        md.classList.add('animated');
        attackBtnH1.disabled = true;
        attackBtnH2.disabled = true;
      }
      // Change the turn
      if (newLife2 > 0) {
        attackBtnH1.disabled = true;
        attackBtnH2.disabled = false;
      }

      // Update the life of Hero 2
      attackHero1(newLife2);
    }
    if (element === 'Hero 2' && !isDisabled2) {
      // Animation
      attackBtnH2.classList.add('clicked');
      setTimeout(() => {
        attackBtnH2.classList.remove('clicked');
      }, 100);
      //  Calculate the new life for hero 1
      const newLife1 = lifeHero1 - attack;
      // verify if Hero 1 is dead
      if (newLife1 <= 0) {
        setWinner('Player 2');
        bg.style.display = 'block';
        md.classList.add('animated');
        attackBtnH1.disabled = true;
        attackBtnH2.disabled = true;
      }
      // Change the turn
      if (newLife1 > 0) {
        attackBtnH1.disabled = false;
        attackBtnH2.disabled = true;
      }
      // Update the life of Hero 1
      attackHero2(newLife1);
    }
  };

  return (
    <Container bgColor={bgColor} posCol={posCol}>
      <Title>{title}</Title>
      <Life>
        <LifeValue>
          {hero === 'Hero 1'
            ? lifeHero1 > 0
              ? lifeHero1
              : 0
            : lifeHero2 > 0
            ? lifeHero2
            : 0}{' '}
          %
        </LifeValue>
        <LifeBar
          remaining={
            (hero === 'Hero 1'
              ? lifeHero1 > 0
                ? lifeHero1
                : 0
              : lifeHero2 > 0
              ? lifeHero2
              : 0) + '%'
          }
          eliminated={
            (hero === 'Hero 1'
              ? lifeHero1 > 0
                ? 100 - lifeHero1
                : 100
              : lifeHero2 > 0
              ? 100 - lifeHero2
              : 100) + '%'
          }>
          <div className='life-remaining'></div>
          <div className='life-eliminated'></div>
        </LifeBar>
      </Life>
      <Button
        onClick={() => handleClick(hero)}
        id={hero === 'Hero 1' ? 'attack-btn-h1' : 'attack-btn-h2'}>
        <span>Play</span>
      </Button>
      <Character>{children}</Character>
    </Container>
  );
};
