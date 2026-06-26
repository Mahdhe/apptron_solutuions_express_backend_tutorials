const logger = (req, res, next) => {
 console.log(`
   Method: ${req.method}
   URL: ${req.url}
   Time: ${new Date().toLocaleString()}
 `);

 next();
};


module.exports =logger;