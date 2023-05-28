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
    name: "Slinky",
    description: `The slinky toy is an iconic metal spring that has captivated generations with its simple yet mesmerizing motion. Invented by Richard James in the early 1940s, the slinky quickly became a sensation, epitomizing the spirit of playfulness and innovation. Its ability to "walk" down stairs or appear to defy gravity evokes a sense of nostalgia for adults, while still captivating the imaginations of children today. Over the years, the slinky has remained a timeless classic, maintaining its prevalence in the toy industry as a beloved symbol of childhood joy and endless entertainment.`,
    imgSrc:
      "https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
  },
  {
    name: "dog",
    description:
      "DOG ipsum dolor sit amet, consectetur adip non pro id el lorem ipsum dolor sit amet, consectetur adip non pro id el lorem ipsum dolor sit amet, consectetur adip non pro id el lorem ipsum dolor sit amet, consectetur adip non pro id el lorem ipsum dolor sit amet, consectetur adip non pro id el",
    imgSrc:
      "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*",
  },
  {
    name: "pot",
    description:
      "POT ipsum dolor sit amet, consectetur adip non pro id el lorem ipsum dolor sit amet, consectetur adip non pro id el lorem ipsum dolor sit amet, consectetur adip non pro id el lorem ipsum dolor sit amet, consectetur adip non pro id el lorem ipsum dolor sit amet, consectetur adip non pro id el",
    imgSrc:
      "  https://thumbs.dreamstime.com/b/enamel-cooking-pot-red-isolated-white-background-38722856.jpg",
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

  const [objectIndex, setObjectIndex] = useState(0);

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
      <TV object={objects[objectIndex]} onClick={handleClick} />
      <img src={dosPromptImg} style={{ position: "relative", zIndex: 999 }} />

      {/* <div style={{ position: "absolute", bottom: "50px", left: "600px" }}>
        <Button
          clicked={() => handleClick()}
          id="tv-button"
          pad={50}
          height={50}
        >
          {`Click Me    ( ͡° ͜ʖ ͡°)`}
        </Button>
      </div> */}

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

// import React, { Suspense, useRef } from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, Stage } from "@react-three/drei";
// import { Model } from "./models/Model.js";
// export default function Viewer() {
//   const ref = useRef();
//   return (
//     <Canvas shadows dpr={[1, 2]} camera={{ fov: 50 }}>
//       <Suspense fallback={null}>
//         <Stage
//           controls={ref}
//           preset="rembrandt"
//           intensity={1}
//           environment="city"
//         >
//           false
//           <Model />
//           false
//         </Stage>
//       </Suspense>
//       <OrbitControls ref={ref} autoRotate />
//     </Canvas>
//   );
// }
