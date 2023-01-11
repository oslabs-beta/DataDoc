const postgresClient = require("../models/postgres-client");

const pgController = {
  updateEndpoint: async (req, res, next) => {
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
    //   , (err) => {
    //   if (err)
    //     return next(err)
    //   else
    //     return next();
    // });
  }
};

module.exports = pgController;
