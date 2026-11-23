// ─────────────────────────────────────────────────────────────
// Projects page content. Extracted verbatim from the original Projects.jsx.
// CONTENT FREEZE: do not edit strings here without the owner's consent.
// ─────────────────────────────────────────────────────────────

export const PROJECTS_PAGE = {
  title: 'My Projects',
  subtitle: 'AI-powered applications and full-stack solutions built with modern technologies.',
};

export const completedProjects = [
  {
    id: 1,
    title: "ClarifaiSQL",
    slug: "clarifaisql",
    type: "Personal Project • Self-Developed",
    tagline: "Convert natural language questions into SQL queries with explanations using schema-aware reasoning and safe execution.",
    technologies: ["Python", "FastAPI", "Gemini API", "SQL", "React", "JavaScript"],
    github: "https://github.com/tejas-bhise/ClarifaiSQL",
    live: "https://clarifaisql.vercel.app",
    status: "Deployed & Maintained",
    problem: "Non-technical users and beginners struggle with SQL because extracting insights from structured databases requires understanding schemas and query logic, while most resources lack sufficient hands-on practice to build real proficiency.",
    solution: "Developed an AI-powered platform that converts natural language into SQL queries with explanations and results, using an in-memory SQLite database that automatically deletes session data to ensure strong user privacy.",
    keyChallenges: [
      "Handling unseen schemas without predefined table structures",
      "Preventing invalid or unsafe SQL generation from LLM responses",
      "Ensuring consistent query accuracy across different dataset formats"
    ],
    pipeline: "CSV upload → schema extraction → prompt structuring → Gemini reasoning → SQL validation → query execution → tabular output → explanation generation",
    implementationHighlights: [
      { title: "Schema-aware prompt engineering", description: "Extracted table schema dynamically from uploaded CSV files and injected structured metadata into LLM prompts to improve SQL accuracy without hardcoding relationships." },
      { title: "Safe SQL execution layer", description: "Implemented validation logic restricting unsafe operations (DROP, DELETE, ALTER), ensuring only read-safe queries are executed." },
      { title: "Dynamic database creation", description: "Converted CSV files into in-memory SQL tables, enabling instant querying without manual database configuration." },
      { title: "LLM-generated explanations", description: "Generated natural language explanations of SQL logic to improve transparency and usability for non-technical users." }
    ],
    results: [
      "Achieved reliable query accuracy across varied datasets using schema-aware prompting.",
      "Reduced manual effort required to write SQL queries through natural language interaction.",
      "Enabled users to dynamically learn, experiment, and practice SQL directly on datasets through real-time query generation."
    ],
  },
  {
    id: 2,
    title: "Saarthi",
    slug: "saarthi",
    type: "Personal Project • Self-Developed",
    tagline: "Real-time AI tutor with voice interaction, persistent memory, and 3D avatar delivering step-by-step doubt solving 24/7.",
    technologies: ["React", "Three.js", "FastAPI", "WebSocket", "WebRTC", "Redis", "PostgreSQL", "Gemini API", "STT/TTS"],
    github: "https://github.com/tejas-bhise/Saarthi",
    live: "https://saarthi-ai-iota.vercel.app",
    status: "Deployed • Production-ready backend",
    problem: "Students studying independently often lack immediate guidance when doubts arise, leading to learning gaps, slower progress, and reduced confidence due to limited access to affordable, on-demand tutoring.",
    solution: "Developed a real-time AI tutoring platform where students interact with a 3D virtual tutor via voice or text, receiving step-by-step explanations with persistent memory for continuous, personalized learning support available 24/7.",
    keyChallenges: [
      "Synchronizing voice input, LLM response, and avatar animation in real-time",
      "Maintaining context consistency across WebSocket sessions and memory stores",
      "Reducing response delay while preserving structured explanations"
    ],
    pipeline: "User speech/text → STT → structured prompt → Gemini reasoning → TTS generation → avatar lip-sync → WebSocket streaming → Redis memory → PostgreSQL persistence",
    implementationHighlights: [
      { title: "Real-time communication architecture", description: "Implemented WebSocket-based bidirectional communication enabling continuous low-latency conversation without traditional request-response delays." },
      { title: "Structured LLM prompt workflow", description: "Designed prompt templates optimized for educational explanations to improve clarity and step-by-step reasoning." },
      { title: "Voice interaction pipeline", description: "Integrated speech-to-text and text-to-speech services enabling natural conversational learning." },
      { title: "3D tutor interface", description: "Built a Three.js avatar synchronized with generated speech to improve engagement and realism." }
    ],
    results: [
      "Enables students to receive instant doubt resolution anytime, improving learning continuity during self-study.",
      "Supports better concept understanding through structured step-by-step explanations tailored to conversation context.",
      "Increases engagement and confidence by providing interactive, personalized tutoring accessible 24/7."
    ],
  },
  {
    id: 3,
    title: "Operis",
    slug: "operis",
    type: "Personal Project • Self-Developed",
    tagline: "AI decision intelligence system that converts scattered operational signals into clear, prioritized insights on what needs attention.",
    technologies: ["Python", "FastAPI", "SQLAlchemy", "PostgreSQL", "Scheduler", "LLM APIs", "REST APIs"],
    github: null,
    live: "https://operis-ai.vercel.app",
    status: "Completed",
    problem: "Operational signals are fragmented across tools like Jira, GitHub, Slack, email, and calendars, making it difficult to quickly understand what requires attention, what changed, and where risks are emerging.",
    solution: "Developed an AI-powered system that continuously consolidates multi-source signals into structured, prioritized insights using scoring logic and LLM summarization, enabling a clear, real-time view of what needs attention.",
    keyChallenges: [
      "Designing generalized scoring logic adaptable to different signal types",
      "Structuring unstructured operational activity into measurable decision indicators",
      "Ensuring interpretable AI-generated summaries for quick situational understanding"
    ],
    pipeline: "Signal ingestion → normalization → scoring engine → priority ranking → LLM summarization → structured decision insights → monitoring loop",
    implementationHighlights: [
      { title: "Signal ingestion architecture", description: "Designed modular pipelines to aggregate operational signals from multiple tools, enabling extensibility across integrations." },
      { title: "Decision scoring engine", description: "Built rule-based scoring logic to identify meaningful changes and prioritize risks requiring attention." },
      { title: "LLM insight generation", description: "Converted structured signals into concise summaries highlighting key updates and emerging risks." },
      { title: "Scheduled monitoring cycle", description: "Implemented periodic evaluation to continuously track system state and detect meaningful changes." }
    ],
    results: [
      "Helps founders and managers make faster decisions by highlighting only important signals and reducing noise.",
      "Reduces time spent manually checking multiple tools through a single structured insight view.",
      "Improves productivity by clearly showing risks, priorities, and changes that need attention."
    ],
  },
];

export const fedShieldProject = {
  id: 4,
  title: "FedShield",
  slug: "fedshield",
  github: "https://github.com/tejas-bhise/Fedshield",
  subtitle: "Secure Federated Learning with Anomaly-Based Defense",
  type: "Final Year Project • IEEE Published Research",
  publication: {
    venue: "IEEE ICCUBEA 2026",
    indexed: "Indexed on IEEE Xplore",
    doi: "10.1109/ICCUBEA69821.2026.11702140",
    doiUrl: "https://doi.org/10.1109/ICCUBEA69821.2026.11702140",
    xploreUrl: "https://ieeexplore.ieee.org/document/11702140",
  },
  tagline: "Secure federated learning framework using dual-signal anomaly detection to identify and filter malicious client updates before aggregation.",
  technologies: ["Python", "PyTorch", "ResNet-18", "Flower", "CIFAR-10", "SVHN (OOD dataset)", "Federated Learning", "NumPy", "Streamlit"],
  status: "Completed • Published",
  problem: "Federated learning systems are vulnerable to stealthy backdoor attacks where malicious clients manipulate model updates while appearing statistically normal, making detection difficult using standard aggregation methods.",
  solution: "Developed a federated learning defense framework that inspects client model updates before aggregation. A dual-signal Guardian Layer combines behavioral shift analysis on an OOD SVHN proxy dataset with last-layer gradient analysis to compute client trust scores and reject suspicious updates.",
  keyChallenges: [
    "Detecting malicious updates that closely resemble normal gradient distributions",
    "Preserving global model accuracy while filtering adversarial clients",
    "Validating robustness across IID and OOD dataset distributions"
  ],
  pipeline: "Client model updates → gradient signal extraction → behavioral shift analysis → anomaly scoring → malicious client filtering → secure aggregation",
  implementationHighlights: [
    { title: "Dual-signal Guardian Layer", description: "Combined behavioral shift analysis on an OOD SVHN proxy dataset with last-layer gradient analysis to compute client trust scores and reject suspicious updates." },
    { title: "Attack simulation framework", description: "Assessed BadNets, model replacement, and label-flipping attacks across 5 clients to evaluate defense performance under realistic adversarial conditions." },
    { title: "OOD robustness validation", description: "Used SVHN dataset as an out-of-distribution proxy to test defense stability beyond training distribution." },
    { title: "Federated training pipeline", description: "Built Flower-based federated environment with multiple clients for controlled experimentation." }
  ],
  results: [
    "Achieved 69% main task accuracy while maintaining model reliability under adversarial conditions.",
    "Reduced backdoor accuracy to 3.5%, limiting effectiveness of malicious updates.",
    "Achieved 100% malicious-client detection in evaluated scenarios with zero false positives, ensuring secure aggregation.",
      "Published in IEEE ICCUBEA 2026 and indexed on IEEE Xplore."
  ],
};


export const TECH_STACK = {
  title: 'Tech Stack Across Projects',
  subtitle: 'Technologies powering my development journey.',
  categories: [
    { category: "Languages", icon: "code", items: ["Python", "SQL", "JavaScript", "TypeScript"] },
    { category: "Backend", icon: "server", items: ["FastAPI", "RESTful APIs", "SQLAlchemy", "WebSocket"] },
    { category: "Frontend", icon: "monitor", items: ["React", "Three.js", "Streamlit"] },
    { category: "AI & LLMs", icon: "brain", items: ["LLMs", "Generative AI", "Google Gemini API", "Prompt Engineering", "STT/TTS APIs"] },
    { category: "Machine Learning", icon: "chart", items: ["PyTorch", "scikit-learn", "ResNet-18", "TensorFlow", "CNN", "NumPy", "Anomaly Detection"] },
    { category: "Federated Learning", icon: "network", items: ["Flower Framework"] },
    { category: "Databases", icon: "database", items: ["PostgreSQL", "MySQL", "Redis", "SQLite"] },
    { category: "Deployment", icon: "cloud", items: ["AWS", "Vercel", "Render"] },
    { category: "Dev Tools", icon: "branch", items: ["Git", "GitHub", "Cursor", "Antigravity"] },
  ],
};

// Currently building — described from the project's own README (ReGuard-FL).
export const reGuardProject = {
  id: 5,
  title: "ReGuard-FL",
  slug: "reguard-fl",
  subtitle: "Trust-aware adaptive recovery and security validation of federated-learning updates",
  type: "Research Project • Follow-up to FedShield",
  tagline: "Decides which interrupted federated-learning uploads are worth resuming, validates recovered — possibly stale, possibly malicious — updates before aggregation, and guarantees each update is aggregated at most once, even across crashes and retries.",
  technologies: ["Python", "PyTorch", "FastAPI", "SQLite", "SciPy", "Streamlit", "Hypothesis", "CIFAR-10"],
  status: "In Progress",
  problem: "Federated-learning servers receive updates over unreliable links: uploads get interrupted, recovered updates may be stale or malicious, and crashes or retries risk aggregating the same update twice.",
  solution: "ReGuard-FL combines LAUR-FL, a utility-based policy that resumes an interrupted upload only when its expected value is positive, with Guardian v2, a multi-signal security validator, and an SQLite update ledger that enforces exactly-once aggregation after validation. FedShield's original Guardian is kept bit-exact as the baseline.",
  keyChallenges: [
    "Estimating whether an interrupted transfer will complete in time, using a model-free Kaplan-Meier predictor conditioned on how long the outage has lasted",
    "Validating recovered, possibly stale updates against collusion, decoy, Sybil and adaptive attacks",
    "Guaranteeing exactly-once aggregation across crashes, retries and resumable uploads"
  ],
  pipeline: "Interrupted upload → LAUR-FL utility estimate → resumable authenticated transfer → integrity check → Guardian v2 validation → ledger eligibility gate → exactly-once aggregation",
  implementationHighlights: [
    { title: "LAUR-FL recovery policy", description: "Resumes an update only if its staleness-discounted value, times the probability the transfer completes in time and the probability the Guardian accepts it, outweighs the bandwidth it still needs." },
    { title: "Guardian v2", description: "Combines behavioural change on a server proxy set, update norm, within-round and cross-round collusion similarity, and a robust reference of recently accepted updates — calibrated on held-out seeds." },
    { title: "Update ledger", description: "An SQLite lifecycle state machine with separate gates for upload completion, integrity, security approval, eligibility and aggregation." },
    { title: "Authenticated, crash-safe protocol", description: "Per-request HMAC authentication and resumable uploads, with crash recovery tested through injected crash points and real process kills." }
  ],
  results: [
    "Crash recovery, exactly-once aggregation and authentication validated in an HTTP demo with injected crashes and negative security checks.",
    "Guardian v2 and LAUR-FL predictor calibration completed on held-out seeds.",
    "Pre-registered evaluation of 286 runs in progress — everything runs locally on an Apple-silicon laptop, with no cloud or external GPU."
  ],
};
