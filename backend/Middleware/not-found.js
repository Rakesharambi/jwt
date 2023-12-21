const notFound = (req,res) => res.status(404).send("Oops Page Not Found");

module.exports = notFound;