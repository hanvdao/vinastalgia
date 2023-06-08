import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled, { keyframes } from "styled-components";

import Icons from "./components/Icons/Icons";
import TaskBar from "./components/TaskBar/TaskBar";
import About from "./components/Windows/About";
import Notepad from "./components/Windows/Notepad";
import ShutDown from "./components/ShutDown";
import Modal from "./components/Modal";
import startup from "./assets/sounds/startup.mp3";
import TV from "./components/TV/index";
import MediaPlayer from "./components/Windows/MediaPlayer";
import Button from "./components/Button";
import dosPromptImg from "./assets/DOS_prompt.png";

const objects = [
  {
    name: "lo-xo",
    description: `As a child (and even now :">), I was always captivated by colorful and quirky things. This SLINKY was one of those fascinating items. Just holding it and stretching it out for playtime, but seeing the rainbow trail it left on my hands was a sight that delighted my eyes`,
  },
  {
    name: "babol",
    description: `It was the ultimate chewing gum sensation of the late 80s and early 90s. I can still recall the excitement of unwrapping that brightly colored package, popping a piece into my mouth, and blowing enormous bubbles that seemed to defy gravity.`,
  },
  {
    name: "burger",
    description: `I still remember the Burger gummy candy, a delightful novelty treat from my childhood in the 90s. It was like holding a mini burger in my hand, with its gummy bun, patty, and vibrant candy toppings. I would carefully assemble the candy burger before taking a bite, relishing the sweet and tangy flavors.`,
  },
  {
    name: "iphone",
    description: `When I was little, I would often dash to the nearby corner store to get myself a this iphone etch-a-sketch toy. I would happily write and draw on that plastic surface, and then use a gentle swipe of the eraser to wipe it all clean. It was such a simple yet captivating toy that easily became an addictive habit`,
  },
  {
    name: "keo-deo",
    description: `The round box filled with chewy candies that made a delightful sound when shaken was a favorite treat that the 80s and 90s generation still long for. In the past, a box like this would cost only 500 dong.`,
  },
  {
    name: "keo-thai",
    description: `Behold, the M&M's of our childhood! Back in the day, M&M's were a rarity, and the only chocolate treat we had was this exquisite Thai chocolate candy.`,
  },
  {
    name: "ramen",
    description: `I remember in the old days, every child would bring a pack of instant noodles to school and eat it discreetly, while sitting in class, sometimes even sneaking a bite with the teacher unaware under the desk.`,
  },
  {
    name: "ring-pop",
    description: `Ah, the Ring Pop! I can still vividly recall the excitement of wearing that colorful candy on my finger as a child in the 90s. It was a delicious and fashionable treat that made me feel like a trendy superstar. I would proudly show off my Ring Pop to my friends, savoring the fruity flavors and feeling a sense of pure joy. Those moments with my Ring Pop hold a special place in my heart, reminding me of a time filled with fun, imagination, and the simple pleasures of childhood.`,
  },
  {
    name: "trong-tay",
    description: `I remember vividly, during the Mid-Autumn Festivals of my childhood, the bamboo drum held a special place in my heart. Its rhythmic beats would resonate throughout the neighborhood, filling the air with excitement and joy. I would eagerly grasp the drumsticks, feeling the vibrations as I struck the drum's surface, creating a symphony of sounds. Those cherished moments of drumming on the bamboo drum remain etched in my memory, symbolizing the spirit of togetherness and festive delight during those magical moonlit nights.`,
  },
  {
    name: "tamagochi",
    description: `A pink original tamagochi. I was in grade 6, it was the mid 90s. Brought that little dude everywhere. I remember worrying it would die at nighttime because it didn't have a backlight and I wasn't allowed to turn the lights on after bed time.
    I always ended up getting the ugliest adult tamas because I was a terrible parent.`,
  },
];

const scrollAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-100% + 100vw));
  }
`;

const ScrollingContainer = styled.div`
  overflow: hidden;
  width: 100%;
`;

const ScrollingContent = styled.div`
  display: inline-block;
  white-space: nowrap;
  animation: ${scrollAnimation} 20s linear infinite;
`;

function App({ aboutVisible, notepadVisible, shutDown, showModal }) {
  const [audio] = useState(new Audio(startup));

  const [objectIndex, setObjectIndex] = useState(
    Math.floor(Math.random() * objects.length - 1)
  );

  const handleClick = () => {
    if (objectIndex + 1 >= objects.length) {
      setObjectIndex(0);
    } else {
      setObjectIndex(objectIndex + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("contextmenu", contextDisable);
    //audio.play();
    return () => {
      window.removeEventListener("contextmenu", contextDisable);
    };
    // eslint-disable-next-line
  }, []);

  function contextDisable(event) {
    event.preventDefault();
  }

  const aboutDisplay = aboutVisible ? <About /> : null;
  const notepadDisplay = notepadVisible ? (
    <Notepad object={objects[objectIndex]} />
  ) : null;
  const shutDownDisplay = shutDown ? <ShutDown /> : null;
  const modalDisplay = showModal ? <Modal /> : null;

  return (
    <div className="App">
      <Icons />

      {aboutDisplay}
      <MediaPlayer />
      {notepadDisplay}
      {shutDownDisplay}
      {modalDisplay}
      <TV object={objects[objectIndex]} />
      <img
        src={dosPromptImg}
        style={{ position: "relative", zIndex: 999 }}
        onClick={handleClick}
      />

      <ScrollingContainer>
        <ScrollingContent>
          <div className="tv-button-container">
            <Button
              clicked={() => handleClick()}
              id="tv-button"
              pad={50}
              height={50}
              background={"rgb(0, 0, 0)"}
            >
              {`Click Me    ( ͡° ͜ʖ ͡°)`}
            </Button>
          </div>
        </ScrollingContent>
      </ScrollingContainer>

      <TaskBar />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    aboutVisible: state.about.show,
    notepadVisible: state.notepad.show,
    shutDown: state.shutDown,
    showModal: state.showModal,
  };
};

export default connect(mapStateToProps)(App);
