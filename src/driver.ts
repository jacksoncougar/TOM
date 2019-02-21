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

const tape =
  "''''╵''''╵''''╵''''╵''''╵''''╵''''╵''''│" +
  "''''╵''''╵''''╵''''╵''''╵''''╵''''╵''''│";

console.log(tape);

let document = new Document();
let tome = new TOM(document);

document.children.push(
  new Element({
    content: "First",
    properties: new Properties({
      textAlign: TextAlign.right,
      margin: new MarginBox({ top: 0, right: 10, bottom: 0, left: 0 })
    })
  })
);

document.children.push(
  new Element({
    content: "Second",
    properties: new Properties({
      textAlign: TextAlign.center,
      margin: new MarginBox({ top: 0, right: 10, bottom: 0, left: 10 })
    })
  })
);

document.children.push(
    new Element({
      content: "Third",
      properties: new Properties({
        textAlign: TextAlign.left,
        margin: new MarginBox({ top: 0, right: 10, bottom: 0, left: 10 })
      })
    })
  );

  
document.children.push(
    new Element({
      content: "Ipsum enim ipsum culpa culpa Lorem ullamco do laborum ullamco quis labore ex. Non minim incididunt ipsum elit dolor fugiat est pariatur officia. Irure nostrud cillum irure et ut. Amet pariatur magna ipsum reprehenderit culpa ea duis do. Enim occaecat elit esse laborum quis ad.",
      properties: new Properties({
        textAlign: TextAlign.left,
        margin: new MarginBox({ top: 0, right: 10, bottom: 0, left: 10 })
      })
    })
  );

tome.print();

console.log(tape);
console.log("done.");
