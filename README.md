# High-End Programmatic 3D Motion Graphics

**Built: June 2025**

Used Three.js and GSAP to create 3D motion graphics. Early explorations into if/how you could build something with LLMs that fully replaced a skilled After Effects editor.

## Demos

- [`demo/becky-tv-animation.mp4`](demo/becky-tv-animation.mp4) opens on archival footage of Olympic swimmer Becky Dyroen-Lancer playing inside a modeled Panasonic CRT, then moves through a tabletop family-photo story.
- [`demo/steve-jobs-story.mp4`](demo/steve-jobs-story.mp4) glides across a spatial Steve Jobs photo timeline. The exported demo is trimmed past the WebGL initialization frames.

The repository includes the complete Remotion source for the Steve Jobs study. The Becky render is preserved as a companion portfolio artifact; its original prototype depended on third-party model and archival-media assets that are not redistributed here.

## Run it locally

Requirements: Node.js 20+ and npm.

```bash
npm install
npm run dev
```

Open Remotion Studio and select `SteveJobsStory`.

To render the full 1080x1920 video:

```bash
npm run render
```

## How it works

- `src/SteveJobsStory.tsx` creates the Three.js tabletop, image planes, lights, and nested camera rig.
- `src/Root.tsx` defines the 330-frame, 30 FPS Remotion composition.
- `public/` contains the texture and reference images used by the original experiment.

## Asset note

The code is MIT licensed. The archival photographs remain the property of their respective copyright holders and are included only to reproduce this non-commercial portfolio experiment. Replace them with material you have permission to use before commercial distribution.

## License

MIT. See [`LICENSE`](LICENSE).
