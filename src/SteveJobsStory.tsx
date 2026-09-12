import React, { Suspense, useMemo, useEffect } from 'react';
import {
  AbsoluteFill,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from 'remotion';
import { useThree, extend, Vector3, useLoader as useThreeLoader } from '@react-three/fiber';
import { Plane, Image as DreiImage } from '@react-three/drei';
import * as THREE from 'three';
import { ThreeCanvas } from '@remotion/three';
import { z } from 'zod';

// Extend THREE namespace for TextureLoader if not already (often handled by drei)
extend({ TextureLoader: THREE.TextureLoader });

const FPS = 30; // Frames per second
const IMAGE_FOCUS_DURATION_SEC = 1.5;
const TRANSITION_DURATION_SEC = 0.7; // Adjusted for a slightly longer, smoother transition
const TOTAL_SEGMENT_DURATION_SEC = IMAGE_FOCUS_DURATION_SEC + TRANSITION_DURATION_SEC; // 2.2 seconds per image
const NUM_IMAGES = 5;
const TOTAL_ANIMATION_DURATION_IN_FRAMES = NUM_IMAGES * TOTAL_SEGMENT_DURATION_SEC * FPS; // Total frames for the animation

const TARGET_DISPLAY_WIDTH = 2.5; // Target width for images on the table, height will adjust
const IMAGE_SPACING = 3.5; // Adjusted spacing a bit, can be tweaked

// Zod schema for component props
export const steveJobsStorySchema = z.object({
  image1: z.string(),
  image2: z.string(),
  image3: z.string(),
  image4: z.string(),
  image5: z.string(),
  woodTexture: z.string(),
});

export type SteveJobsStoryProps = z.infer<typeof steveJobsStorySchema>;

interface ImagePlaneProps {
  url: string;
  position: [number, number, number];
}

const ImagePlane: React.FC<ImagePlaneProps> = ({ url, position }) => {
  const fullUrl = staticFile(url);
  
  const texture = useThreeLoader(THREE.TextureLoader, fullUrl);

  const scale = useMemo(() => {
    if (!texture || !texture.image) {
      return [TARGET_DISPLAY_WIDTH, TARGET_DISPLAY_WIDTH]; // Default square scale
    }
    const { naturalWidth, naturalHeight } = texture.image;
    const aspectRatio = naturalWidth / naturalHeight;
    return [TARGET_DISPLAY_WIDTH, TARGET_DISPLAY_WIDTH / aspectRatio];
  }, [texture]);

  return (
    <DreiImage 
      url={fullUrl}
      position={position} 
      scale={scale as [number, number]}
      rotation={[-Math.PI / 2, 0, 0]} 
      transparent 
    />
  );
};

interface SceneProps {
  imagePositions: THREE.Vector3[];
  imageUrls: string[];
  woodTextureUrl: string;
}

const Scene: React.FC<SceneProps> = ({ imagePositions, imageUrls, woodTextureUrl }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { camera } = useThree();

  useEffect(() => {
    const seconds = frame / fps;
    const currentIndex = Math.min(
      NUM_IMAGES - 1,
      Math.floor(seconds / TOTAL_SEGMENT_DURATION_SEC),
    );
    const nextIndex = Math.min(NUM_IMAGES - 1, currentIndex + 1);
    const segmentTime = seconds - currentIndex * TOTAL_SEGMENT_DURATION_SEC;
    const progress = interpolate(
      segmentTime,
      [IMAGE_FOCUS_DURATION_SEC, TOTAL_SEGMENT_DURATION_SEC],
      [0, 1],
      {
        easing: Easing.bezier(0.42, 0, 0.58, 1),
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      },
    );

    const current = imagePositions[currentIndex];
    const next = imagePositions[nextIndex];
    const x = THREE.MathUtils.lerp(current.x, next.x, progress);
    const z = THREE.MathUtils.lerp(current.z, next.z, progress);

    camera.position.set(x, 5.2, z + 0.15);
    camera.lookAt(x, 0, z);
    camera.updateProjectionMatrix();
  }, [camera, fps, frame, imagePositions]);

  const tableTexture = React.useMemo(() => {
    const tex = new THREE.TextureLoader().load(staticFile(woodTextureUrl));
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(5,5);
    return tex;
  }, [woodTextureUrl]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5,10,5]} intensity={0.8} />

      <Plane args={[50,50]} rotation={[-Math.PI/2,0,0]} position={[0,-0.05,0]}>
        <meshStandardMaterial map={tableTexture} side={THREE.DoubleSide} />
      </Plane>

      {imagePositions.map((pos, idx) => (
        <ImagePlane key={idx} url={imageUrls[idx]} position={[pos.x,pos.y,pos.z]} />
      ))}

    </>
  );
};

export const SteveJobsStoryComposition: React.FC<SteveJobsStoryProps> = ({
  image1,
  image2,
  image3,
  image4,
  image5,
  woodTexture,
}) => {
  const imagePositions = React.useMemo(() => {
    const TABLE_LEVEL_Y = 0.01;
    return [
      new THREE.Vector3(-IMAGE_SPACING * 1.5, TABLE_LEVEL_Y, -IMAGE_SPACING * 0.5),
      new THREE.Vector3(IMAGE_SPACING * 0.5,  TABLE_LEVEL_Y, -IMAGE_SPACING * 1.2),
      new THREE.Vector3(0,                    TABLE_LEVEL_Y, 0),
      new THREE.Vector3(-IMAGE_SPACING * 1.2, TABLE_LEVEL_Y, IMAGE_SPACING * 1),
      new THREE.Vector3(IMAGE_SPACING * 1.5,  TABLE_LEVEL_Y, IMAGE_SPACING * 0.7),
    ];
  }, []);

  const imageUrls = useMemo(() => [image1, image2, image3, image4, image5], [image1, image2, image3, image4, image5]);

  const { width: videoWidth, height: videoHeight } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: 'skyblue' }}> 
      <ThreeCanvas
        width={videoWidth}
        height={videoHeight}
        camera={{
          fov: 75,
          near: 0.1,
          far: 1000,
        }}
      >
        <Suspense fallback={null}>
          <Scene 
            imagePositions={imagePositions} 
            imageUrls={imageUrls}
            woodTextureUrl={woodTexture}
          />
        </Suspense>
      </ThreeCanvas>
    </AbsoluteFill>
  );
}; 
