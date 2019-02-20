"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Properties {
}
class Element {
    constructor(init) {
        Object.assign(this, init);
        if (!this.children)
            this.children = [];
        if (!this.properties)
            this.properties = new Properties();
    }
}
exports.Element = Element;
var TextAlign;
(function (TextAlign) {
    TextAlign[TextAlign["right"] = 0] = "right";
    TextAlign[TextAlign["center"] = 1] = "center";
    TextAlign[TextAlign["left"] = 2] = "left";
})(TextAlign = exports.TextAlign || (exports.TextAlign = {}));
class Unit extends Number {
}
class Percent extends Unit {
}
class Character extends Unit {
}
class MarginBox {
}
exports.MarginBox = MarginBox;
class Margin {
}
exports.Margin = Margin;
class Document extends Element {
    constructor() {
        super();
        this.properties.width = 80;
    }
}
exports.Document = Document;
class Stylesheet extends Map {
}
exports.Stylesheet = Stylesheet;
class Style extends Properties {
}
exports.Style = Style;
class TOM {
    constructor(document, stylesheet) {
        this.document = document;
        this.stylesheet = stylesheet || new Stylesheet();
    }
    layout(e) {
        this.pushDown(e.properties, e.children, "width");
        this.pushDown(e.properties, e.children, "height");
    }
    pushDown(properties, children, p) {
        for (let child of children) {
            if (properties[p] && !child.properties[p])
                child.properties[p] = properties[p];
        }
    }
    print() {
        this.layout(this.document);
        var output = [];
    }
}
exports.TOM = TOM;
//# sourceMappingURL=tom.js.map