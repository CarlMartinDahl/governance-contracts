CREATE TABLE case_export_package_markdown_artifact_snapshots (
  case_id TEXT NOT NULL,
  artifact_type TEXT NOT NULL,
  filename TEXT NOT NULL,
  content_type TEXT NOT NULL,
  encoding TEXT NOT NULL,
  export_package_markdown_artifact_payload JSON NOT NULL,
  persisted_at TEXT NOT NULL
);

CREATE INDEX idx_case_export_package_markdown_artifact_snapshots_case_id_persisted_at
  ON case_export_package_markdown_artifact_snapshots (case_id, persisted_at DESC);
