import React, { Suspense, useRef } from "react";
import tvImageSrc from "../../assets/tv-images/retro-tv-w.png";
import styled from "styled-components";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import { Model } from "../../models/Model.js";

const tvContainer = styled.div`
  height: 100vh;
`;

function Viewer({ modelName }) {
  const ref = useRef();
  return (
    <div
      // style={{ border: "1px solid red" }}
      style={{
        height: "65%",
        width: "40%",
        position: "absolute",
        left: 160,
        top: 80,
        // border: "1px solid red",
      }}
    >
      <Canvas shadows dpr={[1, 2]} camera={{ fov: 50 }}>
        <Suspense fallback={null}>
          <Stage
            controls={ref}
            preset="rembrandt"
            intensity={1}
            environment="city"
          >
            false
            <Model modelName={modelName} />
            false
          </Stage>
        </Suspense>
        <OrbitControls ref={ref} autoRotate />
      </Canvas>
    </div>
  );
}

export default function TV({ object }) {
  return (
    // <div
    //   style={{
    //     height: "90vh",
    //     // position: "absolute",
    //     // left: 140,
    //     backgroundImage: `url(${tvImageSrc})`,
    //     backgroundRepeat: "no-repeat",
    //     backgroundSize: "contain",
    //     border: "1px solid red",
    //   }}
    // >
    //   <img
    //     src="https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8fA%3D%3D&w=1000&q=80"
    //     alt=""
    //     style={{ height: "80%" }}
    //   />
    //   <h1>Hello</h1>
    // </div>
    <tvContainer>
      {/* {object && (
        <img
          src={object.imgSrc}
          alt=""
          style={{ height: "70%", position: "absolute", left: 300, top: 70 }}
        />
      )} */}

      {object && <Viewer modelName={object.name} />}

      <img
        src={tvImageSrc}
        style={{
          height: "85%",
          position: "absolute",
          left: 120,
          top: 50,
          zIndex: -1,
        }}
      />
    </tvContainer>
  );
}
