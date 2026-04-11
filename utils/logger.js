const log = (level, message) => {
  console.log(
    JSON.stringify({
      level,
      message,
      timestamp: new Date().toISOString(),
    })
  );
};

module.exports = log;