"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tom_1 = require("./tom");
console.log("Demo:");
let document = new tom_1.Document();
let tome = new tom_1.TOM(document);
document.children.push(new tom_1.Element({ content: "First" }));
document.children.push(new tom_1.Element({ content: "Second" }));
document.children.push(new tom_1.Element({ content: "Third" }));
tome.print();
console.log("done.");
//# sourceMappingURL=driver.js.map