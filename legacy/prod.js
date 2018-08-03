const secrets = {
  ppHeader:{"X-API-Key":process.env.PP_KEY},
  crpKey: process.env.CRP_KEY,
  mongodb: process.env.MONGO_DB
};

module.exports = secrets;
