/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "discord.js":
/*!*****************************!*\
  !*** external "discord.js" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = require("discord.js");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("dotenv");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
(__webpack_require__(/*! dotenv */ "dotenv").config)(); //initializes dotenv
const { Client, GatewayIntentBits } = __webpack_require__(/*! discord.js */ "discord.js");
const minnesota = "./minnesota.png";
const regex = /minnesota/i;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
    // Add other intents as needed
  ],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", (msg) => {
  if (regex.test(msg.content)) {
    msg.reply({ files: [minnesota] });
  }
});

//this line must be at the very end
client.login(process.env.CLIENT_TOKEN); //signs the bot in with token

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7Ozs7Ozs7QUN0QkEsb0RBQXdCLElBQUk7QUFDNUIsUUFBUSw0QkFBNEIsRUFBRSxtQkFBTyxDQUFDLDhCQUFZO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSw4QkFBOEIsZ0JBQWdCO0FBQzlDLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0Isb0JBQW9CO0FBQ3BDO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSx3Q0FBd0MiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9taW5uZXNvdGFib3QvZXh0ZXJuYWwgY29tbW9uanMgXCJkaXNjb3JkLmpzXCIiLCJ3ZWJwYWNrOi8vbWlubmVzb3RhYm90L2V4dGVybmFsIGNvbW1vbmpzIFwiZG90ZW52XCIiLCJ3ZWJwYWNrOi8vbWlubmVzb3RhYm90L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL21pbm5lc290YWJvdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJkaXNjb3JkLmpzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImRvdGVudlwiKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwicmVxdWlyZShcImRvdGVudlwiKS5jb25maWcoKTsgLy9pbml0aWFsaXplcyBkb3RlbnZcclxuY29uc3QgeyBDbGllbnQsIEdhdGV3YXlJbnRlbnRCaXRzIH0gPSByZXF1aXJlKFwiZGlzY29yZC5qc1wiKTtcclxuY29uc3QgbWlubmVzb3RhID0gXCIuL21pbm5lc290YS5wbmdcIjtcclxuY29uc3QgcmVnZXggPSAvbWlubmVzb3RhL2k7XHJcblxyXG5jb25zdCBjbGllbnQgPSBuZXcgQ2xpZW50KHtcclxuICBpbnRlbnRzOiBbXHJcbiAgICBHYXRld2F5SW50ZW50Qml0cy5HdWlsZHMsXHJcbiAgICBHYXRld2F5SW50ZW50Qml0cy5NZXNzYWdlQ29udGVudCxcclxuICAgIEdhdGV3YXlJbnRlbnRCaXRzLkd1aWxkTWVzc2FnZXMsXHJcbiAgICAvLyBBZGQgb3RoZXIgaW50ZW50cyBhcyBuZWVkZWRcclxuICBdLFxyXG59KTtcclxuXHJcbmNsaWVudC5vbihcInJlYWR5XCIsICgpID0+IHtcclxuICBjb25zb2xlLmxvZyhgTG9nZ2VkIGluIGFzICR7Y2xpZW50LnVzZXIudGFnfSFgKTtcclxufSk7XHJcblxyXG5jbGllbnQub24oXCJtZXNzYWdlQ3JlYXRlXCIsIChtc2cpID0+IHtcclxuICBpZiAocmVnZXgudGVzdChtc2cuY29udGVudCkpIHtcclxuICAgIG1zZy5yZXBseSh7IGZpbGVzOiBbbWlubmVzb3RhXSB9KTtcclxuICB9XHJcbn0pO1xyXG5cclxuLy90aGlzIGxpbmUgbXVzdCBiZSBhdCB0aGUgdmVyeSBlbmRcclxuY2xpZW50LmxvZ2luKHByb2Nlc3MuZW52LkNMSUVOVF9UT0tFTik7IC8vc2lnbnMgdGhlIGJvdCBpbiB3aXRoIHRva2VuXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==