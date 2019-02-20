import {Document, TOM, Element, TextAlign} from  "./tom"

console.log("Demo:");

let document = new Document();
let tome = new TOM(document);

document.children.push(new Element({content: "First", textAlign: TextAlign.right}));
document.children.push(new Element({content: "Second", textAlign: TextAlign.center}));
document.children.push(new Element({content: "Third"}));

tome.print();

console.log("done.");


 

