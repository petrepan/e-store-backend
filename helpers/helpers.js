const removeDashFromLinks = (input) => {
  return input
    .replace(/ /g, "")
    .split(/[-,]+/)
    .filter(function (v) {
      return v !== " ";
    })
    .join(" ")
    .toLowerCase();
};

module.exports = { removeDashFromLinks };
