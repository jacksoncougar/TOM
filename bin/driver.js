"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tom_1 = require("./tom");
console.log("Demo:");
let document = new tom_1.Document();
let tome = new tom_1.TOM(document);
document.children.push(new tom_1.Element({
    content: "First",
    properties: new tom_1.Properties({
        textAlign: tom_1.TextAlign.right,
        margin: new tom_1.MarginBox({ top: 0, right: 5, bottom: 0, left: 0 })
    })
}));
document.children.push(new tom_1.Element({
    content: "Second",
    properties: new tom_1.Properties({ textAlign: tom_1.TextAlign.center })
}));
document.children.push(new tom_1.Element({
    content: "Third",
    properties: new tom_1.Properties({ textAlign: tom_1.TextAlign.left })
}));
tome.print();
console.log("done.");
//# sourceMappingURL=driver.js.map