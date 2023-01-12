const postgresClient = require("../models/postgres-client");
const dbController = require("./dbController");

const pgController = {

  deleteEndpointsByWorkspaceId: async (req, res, next) => {
    // const {workspaceId} = req.params;
    const {workspaceId} = res.locals;
    const queryText = `
      DELETE
      FROM endpoints
      WHERE workspace_id=${workspaceId}
    ;`;
    try {
      await postgresClient.query(queryText);
    } catch (err) {
      return next(err);
    }
    return next();
  },

  updateEndpointById: async (req, res, next) => {
    const _id = Number(req.params?._id);
    const { method, path, tracking } = req.body;
    const queryText = `
      UPDATE 
        endpoints 
      SET
        method='${method}',
        path='${path}',
        tracking=${tracking}
      WHERE 
        _id=${_id} ;
    `;
    try {
      postgresClient.query(queryText);
      return next();
    } catch (err) {
      return next(err);
    }
  },
  updateEndpointByRoute: async (req, res, next) => {
    const { workspaceId, method, path, tracking} = req.body
    const queryText = `
      UPDATE 
        endpoints 
      SET
        method='${method}',
        path='${path}',
        tracking=${tracking}
      WHERE 
        workspace_id=${workspaceId} AND
        method='${method}' AND
        path='${path}'
    ;`;
    try {
      postgresClient.query(queryText);
    } catch (err) {
      return next(err);
    }
    return next();
  }
};

module.exports = pgController;
