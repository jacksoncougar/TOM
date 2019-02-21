"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_optional_1 = require("typescript-optional");
class Properties {
    constructor(init) {
        Object.assign(this, init);
    }
}
exports.Properties = Properties;
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
        for (const e of this.document.children) {
            console.log(this.render(e));
        }
    }
    render(e) {
        let buffer = [];
        let content_width = e.content.length;
        let width = e.properties.width || 0;
        let content_start = {};
        content_start[TextAlign.left] = 0;
        content_start[TextAlign.center] = (width.valueOf() - content_width) / 2;
        content_start[TextAlign.right] = (width.valueOf() - content_width);
        const align = typescript_optional_1.Optional.ofNullable(e.properties.textAlign);
        let amount = content_start[align.orElseGet(() => TextAlign.left)];
        for (let fill = 0; fill < amount; fill++) {
            buffer.push(' ');
        }
        buffer.push(e.content);
        for (let fill = buffer.length; fill < width; fill++) {
            buffer.push(' ');
        }
        return buffer.join('');
    }
}
exports.TOM = TOM;
//# sourceMappingURL=tom.js.map