CREATE TABLE case_profile_inputs (
  case_id TEXT PRIMARY KEY,
  jurisdiction_profile_key TEXT NOT NULL,
  profile_input_summary JSON NOT NULL,
  profile_input_lane_snapshot JSON NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
