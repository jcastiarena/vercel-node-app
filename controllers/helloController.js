const helloService = require('../services/helloService');

exports.getHello = (req, res) => {
  const message = helloService.sayHello();
  res.status(200).json({ message });
};
