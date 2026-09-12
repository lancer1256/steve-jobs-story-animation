import { registerRoot } from "remotion";

(async () => {
  const { RemotionRoot } = await import("./Root");
  registerRoot(RemotionRoot);
})();
