CREATE TABLE case_export_package_bundle_manifest_snapshots (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  case_id TEXT NOT NULL,
  jurisdiction_profile_key TEXT NOT NULL,
  package_version TEXT NOT NULL,
  export_version TEXT NOT NULL,
  dossier_fingerprint TEXT NOT NULL,
  export_package_bundle_manifest_payload JSON NOT NULL,
  persisted_at TEXT NOT NULL
);

CREATE INDEX idx_case_export_package_bundle_manifest_snapshots_case_id_persisted_at
  ON case_export_package_bundle_manifest_snapshots (case_id, persisted_at DESC);
