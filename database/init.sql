CREATE TABLE workspaces (
  _id SERIAL, 
  name TEXT NOT NULL,
  domain TEXT NOT NULL,
  port INTEGER
);

CREATE TABLE endpoints (
  _id SERIAL,
  method TEXT NOT NULL,
  path TEXT NOT NULL,
  tracking BOOLEAN DEFAULT false,
  workspace_id INTEGER NOT NULL
);

ALTER TABLE endpoints
 ADD CONSTRAINT endpoints_uq
 UNIQUE (method, path, workspace_id);