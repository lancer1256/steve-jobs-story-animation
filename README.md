# Programmatic After Effects-Style 3D Animations

A collection of handcrafted, code-driven 3D motion studies built with Remotion, React Three Fiber, Drei, and Three.js. The included Steve Jobs study moves a virtual camera across archival photographs arranged on a textured tabletop, reproducing the kind of spatial composition and camera choreography normally assembled in After Effects.

## Demos

- [`demo/becky-tv-animation.mp4`](demo/becky-tv-animation.mp4) opens on archival footage of Olympic swimmer Becky Dyroen-Lancer playing inside a modeled Panasonic CRT, then moves through a tabletop family-photo story.
- [`demo/steve-jobs-story.mp4`](demo/steve-jobs-story.mp4) glides across a spatial Steve Jobs photo timeline. Its opening uses an intentional dark fade so WebGL asset initialization never appears as a flash in the exported video.

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
