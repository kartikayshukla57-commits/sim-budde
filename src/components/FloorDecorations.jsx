import React, { useMemo } from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Custom shader to remove white background
const ChromaKeyMaterial = ({ texture, color = "white" }) => {
    const shader = useMemo(() => ({
        uniforms: {
            map: { value: texture },
            keyColor: { value: new THREE.Color(color) },
            similarity: { value: 0.1 },
            smoothness: { value: 0.1 },
        },
        vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
        fragmentShader: `
      uniform sampler2D map;
      uniform vec3 keyColor;
      uniform float similarity;
      uniform float smoothness;
      varying vec2 vUv;
      void main() {
        vec4 texColor = texture2D(map, vUv);
        float d = distance(texColor.rgb, keyColor);
        float alpha = smoothstep(similarity, similarity + smoothness, d);
        gl_FragColor = vec4(texColor.rgb, texColor.a * alpha);
      }
    `
    }), [texture, color]);

    return <shaderMaterial args={[shader]} transparent side={THREE.DoubleSide} />;
};

const FloorDecorations = () => {
    const balloonsTexture = useTexture('/decor/balloons.png');
    const ribbonsTexture = useTexture('/decor/ribbons.png');

    return (
        <group>
            {/* Balloons scattered around - Using ChromaKey to remove white background */}
            <mesh position={[-2, 0.15, 2]} rotation={[-Math.PI / 2, 0, 1]}>
                <planeGeometry args={[1.5, 1.5]} />
                <ChromaKeyMaterial texture={balloonsTexture} />
            </mesh>
            <mesh position={[2, 0.15, 1.5]} rotation={[-Math.PI / 2, 0, -0.5]}>
                <planeGeometry args={[1.5, 1.5]} />
                <ChromaKeyMaterial texture={balloonsTexture} />
            </mesh>
            <mesh position={[-2.5, 0.15, -0.5]} rotation={[-Math.PI / 2, 0, 2]}>
                <planeGeometry args={[1.5, 1.5]} />
                <ChromaKeyMaterial texture={balloonsTexture} />
            </mesh>


            {/* Ribbons scattered */}
            <mesh position={[0, 0.05, 3]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[3, 3]} />
                <ChromaKeyMaterial texture={ribbonsTexture} />
            </mesh>
            <mesh position={[-3, 0.05, 0]} rotation={[-Math.PI / 2, 0, 1.5]}>
                <planeGeometry args={[2, 2]} />
                <ChromaKeyMaterial texture={ribbonsTexture} />
            </mesh>
            <mesh position={[3, 0.05, 0]} rotation={[-Math.PI / 2, 0, -1.5]}>
                <planeGeometry args={[2, 2]} />
                <ChromaKeyMaterial texture={ribbonsTexture} />
            </mesh>
        </group>
    );
};

export default FloorDecorations;
