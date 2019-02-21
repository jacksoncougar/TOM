"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tom_1 = require("./tom");
console.log("Demo:");
class Tape {
    constructor(size) {
        this.minor10 = "\x1b[33m''''\x1b[0m\x1b[33m╵\x1b[0m\x1b[33m''''\x1b[0m\x1b[31m╵\x1b[0m";
        this.major10 = "\x1b[33m''''\x1b[0m\x1b[33m╵\x1b[0m\x1b[33m''''\x1b[0m\x1b[31m│\x1b[0m";
        let buffer = [];
        while (size > 0) {
            if (size % 40 == 0)
                buffer.push(this.major10), (size -= 10);
            else if (size % 10 == 0)
                buffer.push(this.minor10), (size -= 10);
            else
                size--;
        }
        this.value = buffer.reverse().join('');
    }
}
const document_width = 50;
let document = new tom_1.Document();
document.properties.width = document_width;
const tape = new Tape(document_width).value;
console.log(tape);
let tome = new tom_1.TOM(document);
document.children.push(new tom_1.Element({
    content: "Ipsum enim ipsum culpa culpa Lorem ullamco do laborum ullamco quis labore ex. Non minim incididunt ipsum elit dolor fugiat est pariatur officia. Irure nostrud cillum irure et ut. Amet pariatur magna ipsum reprehenderit culpa ea duis do. Enim occaecat elit esse laborum quis ad.",
    properties: new tom_1.Properties({
        margin: new tom_1.MarginBox({ top: 0, right: 2, bottom: 1, left: 2 }),
        padding: new tom_1.PaddingBox({ top: 1, right: 1, bottom: 3, left: 1 })
    })
}));
document.children.push(new tom_1.Element({
    content: "Laborum esse cupidatat veniam veniam labore aute do laborum minim qui id adipisicing aliqua. Sit qui cupidatat voluptate enim ipsum commodo sint Lorem in dolor. Reprehenderit officia irure eiusmod laboris nostrud sit occaecat occaecat eu. Velit minim consequat cillum anim ea.",
    properties: new tom_1.Properties({
        textAlign: tom_1.TextAlign.center,
        margin: new tom_1.MarginBox({ top: 0, right: 2, bottom: 1, left: 2 }),
        padding: new tom_1.PaddingBox({ top: 0, right: 10, bottom: 1, left: 10 })
    })
}));
document.children.push(new tom_1.Element({
    content: "Laboris exercitation commodo labore commodo deserunt ad. Cupidatat esse anim mollit adipisicing veniam in proident proident amet consectetur ut consectetur. Elit ipsum dolor est cillum consequat. Id eu sit ex sunt voluptate ex id ea. Sunt cupidatat magna magna ad aliqua ad amet enim enim in. Amet aliqua cupidatat esse nostrud sint adipisicing. Consectetur dolor do aliquip do do cillum elit amet sunt sit non aliquip quis.",
    properties: new tom_1.Properties({
        textAlign: tom_1.TextAlign.right,
        margin: new tom_1.MarginBox({ top: 0, right: 2, bottom: 1, left: 2 })
    })
}));
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
tome.print();
console.log(tape);
console.log("done.");
//# sourceMappingURL=driver.js.map