# Steve Jobs Story Animation

A short vertical 3D motion-graphics experiment built with Remotion, React Three Fiber, Drei, and Three.js. The camera glides across a tabletop sequence of archival Steve Jobs images to create a compact visual timeline.

## Demo

The rendered video is in [`demo/steve-jobs-story.mp4`](demo/steve-jobs-story.mp4).

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
