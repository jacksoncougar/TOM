"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_optional_1 = require("typescript-optional");
class Properties {
    constructor(init) {
        this.margin = new MarginBox();
        this.boundary = new Boundary();
        this.textAlign = TextAlign.left;
        Object.assign(this, init);
    }
}
exports.Properties = Properties;
class Boundary {
    constructor() {
        this.top = 0;
        this.right = 0;
        this.bottom = 0;
        this.left = 0;
    }
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
exports.Percent = Percent;
class Character extends Unit {
}
exports.Character = Character;
class Auto extends Boolean {
}
class MarginBox {
    constructor(init) {
        this.top = 0;
        this.right = 0;
        this.bottom = 0;
        this.left = 0;
        Object.assign(this, init);
    }
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
            if (properties[p] && !child.properties[p]) {
                child.properties[p] = properties[p];
            }
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
        let margin = typescript_optional_1.Optional.ofNullable(e.properties.margin).orElse(new MarginBox());
        let margin_space = margin.left + margin.right;
        let content_width = e.content.length;
        let display_width = typescript_optional_1.Optional.ofNullable(e.properties.width)
            .map($ => $.valueOf())
            .orElse(0) - margin_space;
        let content_start = {};
        content_start[TextAlign.left] = 0;
        content_start[TextAlign.center] =
            display_width.valueOf() / 2 - content_width / 2;
        content_start[TextAlign.right] = display_width.valueOf() - content_width;
        const align = typescript_optional_1.Optional.ofNullable(e.properties.textAlign);
        let amount = content_start[align.orElseGet(() => TextAlign.left)];
        buffer.push(this.fill(margin.left, "░"));
        buffer.push(this.fill(amount, "▒"));
        buffer.push(e.content);
        buffer.push(this.fill(display_width.valueOf() - content_width - amount, "▒"));
        buffer.push(this.fill(margin.right, "░"));
        return buffer.join("");
    }
    fill(amount, value) {
        let buffer = [];
        while (--amount >= 0)
            buffer.push(typescript_optional_1.Optional.ofNullable(value).orElse(" "));
        return buffer.join("");
    }
}
exports.TOM = TOM;
//# sourceMappingURL=tom.js.map