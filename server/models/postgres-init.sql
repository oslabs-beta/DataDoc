CREATE TABLE workspaces (
  _id SERIAL, 
  name TEXT NOT NULL,
  domain TEXT NOT NULL,
  port INTEGER,
  metrics_port INTEGER
);

CREATE TABLE temp (
  _id SERIAL,
  email TEXT NOT NULL,
  firstname TEXT
);

CREATE TABLE usersettings (
  _id SERIAL,
  emailone TEXT NOT NULL,
  emailtwo TEXT,
  emailthree TEXT,
  trackingthree BOOLEAN,
  trackingfour BOOLEAN,
  trackingfive BOOLEAN,
  workspace_id INT references workspaces(_id)
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