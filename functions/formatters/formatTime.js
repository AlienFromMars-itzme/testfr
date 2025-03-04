/** @format
 *
 * Fuego By Painfuego
 * Version: 6.0.0-beta
 * © 2024 The Extremez
 */

module.exports = (duration) => {
  var moment = require("moment");
  require("moment-duration-format");
  return moment
    .duration(duration, "milliseconds")
    .format("d[d] h[h] m[m] s[s]", {
      trim: true,
    });
};
