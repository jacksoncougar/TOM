"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tom_1 = require("./tom");
console.log("Demo:");
const tape = "''''╵''''╵''''╵''''╵''''╵''''╵''''╵''''│" +
    "''''╵''''╵''''╵''''╵''''╵''''╵''''╵''''│";
console.log(tape);
let document = new tom_1.Document();
let tome = new tom_1.TOM(document);
document.children.push(new tom_1.Element({
    content: "First",
    properties: new tom_1.Properties({
        textAlign: tom_1.TextAlign.right,
        margin: new tom_1.MarginBox({ top: 0, right: 10, bottom: 0, left: 0 })
    })
}));
document.children.push(new tom_1.Element({
    content: "Second",
    properties: new tom_1.Properties({
        textAlign: tom_1.TextAlign.center,
        margin: new tom_1.MarginBox({ top: 0, right: 10, bottom: 0, left: 10 })
    })
}));
document.children.push(new tom_1.Element({
    content: "Third",
    properties: new tom_1.Properties({
        textAlign: tom_1.TextAlign.left,
        margin: new tom_1.MarginBox({ top: 0, right: 10, bottom: 0, left: 10 })
    })
}));
document.children.push(new tom_1.Element({
    content: "Ipsum enim ipsum culpa culpa Lorem ullamco do laborum ullamco quis labore ex. Non minim incididunt ipsum elit dolor fugiat est pariatur officia. Irure nostrud cillum irure et ut. Amet pariatur magna ipsum reprehenderit culpa ea duis do. Enim occaecat elit esse laborum quis ad.",
    properties: new tom_1.Properties({
        textAlign: tom_1.TextAlign.left,
        margin: new tom_1.MarginBox({ top: 0, right: 10, bottom: 0, left: 10 })
    })
}));
tome.print();
console.log(tape);
console.log("done.");
//# sourceMappingURL=driver.js.map