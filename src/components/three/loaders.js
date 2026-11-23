// Stable lazy loaders (module-level so React.lazy is created once per scene).
export const loadWorkspace = () => import('./WorkspaceScene');
export const loadFedShield = () => import('./FedShieldScene');
export const loadReGuard = () => import('./ReGuardScene');
