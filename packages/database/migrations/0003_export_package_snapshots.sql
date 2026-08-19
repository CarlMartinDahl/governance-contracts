CREATE TABLE case_export_package_snapshots (
  case_id TEXT NOT NULL,
  jurisdiction_profile_key TEXT NOT NULL,
  export_version TEXT NOT NULL,
  dossier_fingerprint TEXT NOT NULL,
  export_package_payload JSON NOT NULL,
  generated_at TEXT NOT NULL
);

CREATE INDEX idx_case_export_package_snapshots_case_id_generated_at
  ON case_export_package_snapshots (case_id, generated_at DESC);
