"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_optional_1 = require("typescript-optional");
class Properties {
    constructor(init) {
        this.margin = new MarginBox();
        this.boundary = new Boundary();
        this.border = new Border();
        this.padding = new PaddingBox();
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
    get horizontal() {
        return this.right.valueOf() + this.left.valueOf();
    }
}
class Element {
    push(e) {
        e.parent = this;
        this.children.push(e);
    }
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
class PaddingBox {
    constructor(init) {
        this.top = 0;
        this.right = 0;
        this.bottom = 0;
        this.left = 0;
        Object.assign(this, init);
    }
}
exports.PaddingBox = PaddingBox;
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
class BorderStyle {
    constructor() {
        this.border = "dashed";
        this.width = 0;
    }
}
exports.BorderStyle = BorderStyle;
class Border {
    constructor(init) {
        this.top = new BorderStyle();
        this.right = new BorderStyle();
        this.bottom = new BorderStyle();
        this.left = new BorderStyle();
        Object.assign(this, init);
    }
}
exports.Border = Border;
class Stylesheet extends Map {
}
exports.Stylesheet = Stylesheet;
class Style extends Properties {
}
exports.Style = Style;
class TOM {
    constructor(document, stylesheet, debug) {
        this.debug = false;
        this.document = document;
        this.stylesheet = stylesheet || new Stylesheet();
        this.debug = debug == undefined ? this.debug : debug;
    }
    layout(e) {
        this.pushDown(e.properties, e.children, "width");
        this.pushDown(e.properties, e.children, "height");
        e.properties.boundary.top;
        this.pushDown(e.properties, e.children, "width");
        this.pushDown(e.properties, e.children, "height");
        if (e.properties.margin.left == "auto" &&
            e.properties.margin.right != "auto" &&
            e.parent &&
            e.parent.properties.width &&
            e.properties.width) {
            e.properties.margin.left = ((e.parent.properties.width.valueOf() -
                e.properties.width.valueOf() -
                e.properties.margin.right.valueOf()));
            e.properties.width = e.parent.properties.width;
        }
        for (const child of e.children)
            this.layout(child);
    }
    pushDown(properties, children, src) {
        for (let child of children) {
            if (properties[src] && !child.properties[src]) {
                child.properties[src] = properties[src];
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
        let border = e.properties.border;
        let padding = e.properties.padding;
        let margin_space = margin.left + margin.right;
        let border_space = border.left.width + border.right.width;
        let padding_space = padding.left + padding.right;
        let content_width = e.content.length;
        let display_width = typescript_optional_1.Optional.ofNullable(e.properties.width)
            .map($ => $.valueOf())
            .orElse(0) -
            margin_space -
            border_space -
            padding_space;
        const left_margin_character = this.debug ? "\x1b[46m \x1b[0m" : " ";
        const left_spacing_character = this.debug ? "\x1b[46m▒\x1b[0m" : " ";
        const right_spacing_character = this.debug ? "\x1b[31m▓\x1b[0m" : " ";
        const right_margin_character = this.debug ? "\x1b[41m \x1b[0m" : " ";
        const top_margin_character = this.debug ? "\x1b[43m \x1b[0m" : " ";
        const bottom_margin_character = this.debug ? "\x1b[42m \x1b[0m" : " ";
        let parts = [];
        let top = padding.top;
        while (top-- > 0) {
            parts.push(this.fill(display_width, top_margin_character));
        }
        if (content_width > display_width) {
            let matches = e.content.match(new RegExp(`.{1,${display_width}} `, "g"));
            if (matches)
                for (const match of matches)
                    parts.push(match.trim());
        }
        else {
            parts.push(e.content);
        }
        let bottom = padding.bottom;
        while (bottom-- > 0) {
            parts.push(this.fill(display_width, bottom_margin_character));
        }
        if (margin.top > 0) {
            buffer.push(this.fill(display_width + margin_space + border_space + padding_space, top_margin_character));
            buffer.push("\n");
        }
        if (border.top.width > 0) {
            buffer.push(this.fill(margin.left, left_margin_character));
            buffer.push(this.draw_border_top(display_width + border_space + padding_space));
            buffer.push(this.fill(margin.right, right_margin_character));
            buffer.push("\n");
        }
        for (const part of parts) {
            let content_start = this.spacing(display_width, part);
            const align = typescript_optional_1.Optional.ofNullable(e.properties.textAlign);
            let amount = content_start[align.orElseGet(() => TextAlign.left)];
            buffer.push(this.fill(margin.left, left_margin_character));
            buffer.push(this.fill(border.left.width, "│"));
            buffer.push(this.fill(padding.left, left_margin_character));
            buffer.push(this.fill(amount, left_spacing_character));
            buffer.push(part);
            buffer.push(this.fill(display_width.valueOf() - part.length - amount, right_spacing_character));
            buffer.push(this.fill(padding.right, right_margin_character));
            buffer.push(this.fill(border.right.width, "│"));
            buffer.push(this.fill(margin.right, right_margin_character));
            buffer.push("\n");
        }
        buffer.pop();
        if (border.bottom.width > 0) {
            buffer.push("\n");
            buffer.push(this.fill(margin.left, left_margin_character));
            buffer.push(this.draw_border_bottom(display_width + border_space + padding_space));
            buffer.push(this.fill(margin.right, right_margin_character));
        }
        if (margin.bottom > 0) {
            buffer.push("\n");
            buffer.push(this.fill(display_width + margin_space + border_space + padding_space, bottom_margin_character));
        }
        let output = buffer.join("");
        return output;
    }
    draw_border_top(width) {
        let buffer = [];
        if (width < 2) {
            return "";
        }
        else {
            buffer.push("\u250c");
            while (width-- > 2)
                buffer.push("\u2500");
            buffer.push("\u2510");
            return buffer.join("");
        }
    }
    draw_border_bottom(width) {
        let buffer = [];
        if (width < 2) {
            return "";
        }
        else {
            buffer.push("\u2514");
            while (width-- > 2)
                buffer.push("\u2500");
            buffer.push("\u2518");
            return buffer.join("");
        }
    }
    spacing(display_width, part) {
        let content_start = {};
        content_start[TextAlign.left] = 0;
        content_start[TextAlign.center] =
            display_width.valueOf() / 2 - Math.ceil(part.length / 2);
        content_start[TextAlign.right] = display_width.valueOf() - part.length;
        return content_start;
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