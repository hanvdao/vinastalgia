import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  console.log("heloollll", process.env.PUBLIC_URL + `/${props.modelName}.glb`);
  const { nodes, materials } = useGLTF(
    process.env.PUBLIC_URL + `/${props.modelName}.glb`
  );
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={
          props.modelName == "tamagochi"
            ? nodes.Tamagochi_Kirby_Tamagochi_0.geometry
            : nodes.mesh.geometry
        }
        material={
          props.modelName == "tamagochi"
            ? materials.Kirby_Tamagochi
            : materials.main
        }
      />
    </group>
  );
}

// useGLTF.preload("/tamagochi.glb");
// useGLTF.preload("/lo-xo.glb");
