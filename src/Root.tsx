import React from "react";
import { Composition } from "remotion";
import {
  SteveJobsStoryComposition,
  steveJobsStorySchema,
} from "./SteveJobsStory";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="SteveJobsStory"
        component={SteveJobsStoryComposition}
        durationInFrames={330}
        fps={30}
        width={1080}
        height={1920}
        schema={steveJobsStorySchema}
        defaultProps={{
          image1: "steve_1.jpg",
          image2: "steve_2.jpg",
          image3: "steve_3.jpeg",
          image4: "steve_4.jpg",
          image5: "steve_5.webp",
          woodTexture: "wood_table_texture.jpeg",
        }}
      />
    </>
  );
};
