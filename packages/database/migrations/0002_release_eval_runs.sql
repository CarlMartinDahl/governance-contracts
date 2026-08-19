CREATE TABLE case_release_eval_runs (
  release_eval_run_id TEXT PRIMARY KEY,
  case_id TEXT NOT NULL,
  jurisdiction_profile_key TEXT NOT NULL,
  release_eval_payload JSON NOT NULL,
  persisted_at TEXT NOT NULL
);

CREATE INDEX idx_case_release_eval_runs_case_id_persisted_at
  ON case_release_eval_runs (case_id, persisted_at DESC);
