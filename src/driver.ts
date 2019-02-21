import {
  Document,
  TOM,
  Element,
  TextAlign,
  Properties,
  MarginBox,
  Percent
} from "./tom";

console.log("Demo:");

let document = new Document();
let tome = new TOM(document);

document.children.push(
  new Element({
    content: "First",
    properties: new Properties({
      textAlign: TextAlign.right,
      margin: new MarginBox({ top: 0, right: 5, bottom: 0, left: 0 })
    })
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
