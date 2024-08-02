//var fs = require("fs");
//var trips = JSON.parse(fs.readFileSync(".data/trips.json", "utf8"));

/* GET Homepage*/
const index = (req, res) => {
  res.render("index", { title: "Travlr Getaways" });
};

module.exports = {
  index,
};
