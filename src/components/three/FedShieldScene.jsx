import SceneCanvas from './SceneCanvas';
import { buildFedShield } from './buildFedShield';

export default function FedShieldScene({ onReady }) {
  return (
    <SceneCanvas
      build={buildFedShield}
      onReady={onReady}
      ariaLabel="Interactive 3D model of FedShield: five federated clients, two of them malicious, send model updates; the Guardian layer rejects the malicious updates before they reach the global model"
    />
  );
}
