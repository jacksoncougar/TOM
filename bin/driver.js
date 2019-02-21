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
        this.value = buffer.reverse().join("");
    }
}
const document_width = 60;
let document = new tom_1.Document();
document.properties.width = document_width;
const tape = new Tape(document_width).value;
console.log(tape);
let tome = new tom_1.TOM(document, undefined, false);
document.push(new tom_1.Element({
    content: "Ipsum enim ipsum culpa culpa Lorem ullamco do laborum ullamco quis labore ex. Non minim incididunt ipsum elit dolor fugiat est pariatur officia. Irure nostrud cillum irure et ut. Amet pariatur magna ipsum reprehenderit culpa ea duis do. Enim occaecat elit esse laborum quis ad.",
    properties: new tom_1.Properties({
        margin: new tom_1.MarginBox({ top: 0, right: 2, bottom: 1, left: 2 })
    })
}));
/*
document.push(
  new Element({
    content: `
    ,-.,-.,-.,-.
    \`7        .'
     |        |
     |      .-!.
     |  .---| ||
     | (C   \`-'^.
     |  \`      _;
     |        |
    ("\`--.    |
    /\`-._ \`-._|        /\\
   /     \`-._/=\      /\`-\\
  /  /    \\  >~7\     |\`-|
 /  |      | \\-\\ ;   /\ /
;   \`-j--f-'  \\/\`!__7\\ y
|     |  |     \`./_I_;'
|     |  |       ||
|     |  |       ||
|     |  |       ||
|     |  |_      ||
|____/   .-'_____|'
    (/|||\\\\ | |
     |\`^' \` | \\
     |      | |
     \\      | |
     |      | |
     |      | /
     |      | |
     /      | |
     |______|_|
       |___|_|
hjw   /     \`=\`=====.
      \`='-----------
    `
  })
);*/
document.push(new tom_1.Element({
    content: "Laborum esse cupidatat veniam veniam labore aute do laborum minim qui id adipisicing aliqua. Sit qui cupidatat voluptate enim ipsum commodo sint Lorem in dolor.",
    properties: new tom_1.Properties({
        textAlign: tom_1.TextAlign.center,
        border: new tom_1.Border({
            top: { border: "solid", width: 1 },
            bottom: { border: "solid", width: 1 },
            left: { border: "solid", width: 1 },
            right: { border: "solid", width: 1 }
        }),
        width: new tom_1.Percent(50),
        margin: new tom_1.MarginBox({ top: 0, right: 1, bottom: 0, left: "auto" }),
        padding: new tom_1.PaddingBox({ top: 0, right: 1, bottom: 0, left: 1 })
    })
}));
document.push(new tom_1.Element({
    content: "Aliquip labore nostrud do anim id sint cillum aliqua ipsum pariatur consectetur ipsum. Elit officia ad reprehenderit sit anim nisi tempor adipisicing.",
    properties: new tom_1.Properties({
        textAlign: tom_1.TextAlign.center,
        border: new tom_1.Border({
            top: { border: "solid", width: 1 },
            bottom: { border: "solid", width: 1 },
            left: { border: "solid", width: 1 },
            right: { border: "solid", width: 1 }
        }),
        width: 30,
        margin: new tom_1.MarginBox({ top: 0, right: 'auto', bottom: 0, left: 2 }),
        padding: new tom_1.PaddingBox({ top: 0, right: 1, bottom: 0, left: 1 })
    })
}));
document.push(new tom_1.Element({
    content: "Et do ullamco mollit adipisicing nulla in dolor ipsum ex magna.",
    properties: new tom_1.Properties({
        textAlign: tom_1.TextAlign.center,
        border: new tom_1.Border({
            top: { border: "solid", width: 1 },
            bottom: { border: "solid", width: 1 },
            left: { border: "solid", width: 1 },
            right: { border: "solid", width: 1 }
        }),
        width: 30,
        margin: new tom_1.MarginBox({ top: 0, right: 'auto', bottom: 0, left: 'auto' }),
        padding: new tom_1.PaddingBox({ top: 0, right: 1, bottom: 0, left: 1 })
    })
}));
document.push(new tom_1.Element({
    content: "Laboris exercitation commodo labore commodo deserunt ad. Cupidatat esse anim mollit adipisicing veniam in proident proident amet consectetur ut consectetur. ",
    properties: new tom_1.Properties({
        textAlign: tom_1.TextAlign.right,
        margin: new tom_1.MarginBox({ top: 0, right: 2, bottom: 1, left: 2 }),
        padding: new tom_1.PaddingBox({ top: 0, right: 1, bottom: 0, left: 1 })
    })
}));
document.push(new tom_1.Element({
    content: "First",
    properties: new tom_1.Properties({
        textAlign: tom_1.TextAlign.right,
        margin: new tom_1.MarginBox({ top: 0, right: 10, bottom: 0, left: 0 })
    })
}));
document.push(new tom_1.Element({
    content: "Second",
    properties: new tom_1.Properties({
        textAlign: tom_1.TextAlign.center,
        margin: new tom_1.MarginBox({ top: 0, right: 10, bottom: 0, left: 10 })
    })
}));
document.push(new tom_1.Element({
    content: "Third",
    properties: new tom_1.Properties({
        textAlign: tom_1.TextAlign.left,
        margin: new tom_1.MarginBox({ top: 0, right: 20, bottom: 0, left: 10 })
    })
}));
tome.print();
console.log(tape);
console.log("done.");
//# sourceMappingURL=driver.js.map