"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Element {
    constructor(init) {
        Object.assign(this, init);
        if (!this.children)
            this.children = [];
    }
}
exports.Element = Element;
var TextAlign;
(function (TextAlign) {
    TextAlign[TextAlign["right"] = 0] = "right";
    TextAlign[TextAlign["center"] = 1] = "center";
    TextAlign[TextAlign["left"] = 2] = "left";
})(TextAlign = exports.TextAlign || (exports.TextAlign = {}));
class MarginBox {
}
exports.MarginBox = MarginBox;
class Margin {
}
exports.Margin = Margin;
class Document extends Element {
    constructor() {
        super();
    }
}
exports.Document = Document;
class Stylesheet extends Map {
}
exports.Stylesheet = Stylesheet;
class Style {
}
exports.Style = Style;
class TOM {
    constructor(document, stylesheet) {
        this.document = document;
        this.stylesheet = stylesheet || new Stylesheet();
    }
    print() {
        for (const e of this.document.children) {
            console.log(e && e.content || 'nothing');
        }
    }
}
exports.TOM = TOM;
//# sourceMappingURL=tom.js.map