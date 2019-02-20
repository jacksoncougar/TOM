import {Document, TOM, Element} from  "./tom"

console.log("Demo:");

let document = new Document();
let tome = new TOM(document);

document.children.push(new Element({content: "First"}));
document.children.push(new Element({content: "Second"}));
document.children.push(new Element({content: "Third"}));

tome.print();

console.log("done.");




