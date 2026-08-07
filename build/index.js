"use strict";

var _app = _interopRequireDefault(require("./app"));
require("./database");
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
_dotenv["default"].config();
var PORT = process.env.PORT || 4000;
_app["default"].listen(PORT, function () {
  console.log('🚀 Server listening on port', PORT);
});