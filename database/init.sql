-- CREATE DATABASE datadoc;

CREATE TABLE endpoints (
  _id SERIAL,
  method TEXT NOT NULL,
  path TEXT NOT NULL,
  tracking BOOLEAN DEFAULT false,
  workspace_id integer NOT NULL
);

ALTER TABLE endpoints
 ADD CONSTRAINT endpoints_uq
 UNIQUE (method, path, workspace_id);