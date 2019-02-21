import { Document, TOM, Element, TextAlign, Properties } from "./tom";

console.log("Demo:");

let document = new Document();
let tome = new TOM(document);

document.children.push(
  new Element({
    content: "First",
    properties: new Properties({ textAlign: TextAlign.right })
  })
);

document.children.push(
  new Element({
    content: "Second",
    properties: new Properties({ textAlign: TextAlign.center })
  })
);

document.children.push(
  new Element({
    content: "Third",
    properties: new Properties({ textAlign: TextAlign.left })
  })
);

tome.print();

console.log("done.");
