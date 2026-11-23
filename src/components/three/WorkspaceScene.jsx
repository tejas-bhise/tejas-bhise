import SceneCanvas from './SceneCanvas';
import { buildWorkspace } from './buildWorkspace';

export default function WorkspaceScene({ onReady }) {
  return (
    <SceneCanvas
      build={buildWorkspace}
      onReady={onReady}
      ariaLabel="Interactive 3D workspace: a desk with a monitor typing FastAPI code, a laptop streaming API logs, a server, an IEEE paper on the wall, books, a coffee mug, a lamp and a plant"
    />
  );
}
