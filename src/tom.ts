import { Optional } from "typescript-optional";

export class Properties {
  width: Unit | undefined;
  height: Unit | undefined;
  margin: MarginBox = new MarginBox();
  boundary: Boundary = new Boundary();
  border: Border = new Border();
  padding: PaddingBox = new PaddingBox();
  textAlign: TextAlign = TextAlign.left;

  constructor(init?: Partial<Properties>) {
    Object.assign(this, init);
  }
}

class Boundary {
  top: Character = 0;
  right: Character = 0;
  bottom: Character = 0;
  left: Character = 0;

  get horizontal() {
    return this.right.valueOf() + this.left.valueOf();
  }
}

export class Element {
  content!: string;
  properties!: Properties;
  parent: Element | undefined;
  children!: Element[];

  push(e: Element) {
    e.parent = this;
    this.children.push(e);
  }

  constructor(init?: Partial<Element>) {
    Object.assign(this, init);

    if (!this.children) this.children = [];
    if (!this.properties) this.properties = new Properties();
  }
}

export enum TextAlign {
  right,
  center,
  left
}

class Unit extends Number {}
export class Percent extends Unit {

  constructor(percent:number) {
    super(percent)
  }


}
export class Character extends Unit {}
class Auto extends Boolean {}

export class MarginBox {
  top: Percent | Character = 0;
  right: Percent | Character | "auto" = 0;
  bottom: Percent | Character = 0;
  left: Percent | Character | "auto" = 0;

  constructor(init?: Partial<MarginBox>) {
    Object.assign(this, init);
  }
}

export class PaddingBox {
  top: Percent | Character = <Character>0;
  right: Percent | Character = <Character>0;
  bottom: Percent | Character = <Character>0;
  left: Percent | Character = <Character>0;

  constructor(init?: Partial<MarginBox>) {
    Object.assign(this, init);
  }
}

export class Margin {
  auto!: Boolean;
  size!: Number;
}

export class Document extends Element {
  constructor() {
    super();
    this.properties.width = 80;
  }
}

export class BorderStyle {
  border: "solid" | "dashed" = "dashed";
  width: 0 | 1 = 0;
}

export class Border {
  top: BorderStyle = new BorderStyle();
  right: BorderStyle = new BorderStyle();
  bottom: BorderStyle = new BorderStyle();
  left: BorderStyle = new BorderStyle();

  constructor(init?: Partial<Border>) {
    Object.assign(this, init);
  }
}

export class Stylesheet extends Map<Element, Style> {}

export class Style extends Properties {}

export class TOM {
  document!: Document;
  stylesheet!: Stylesheet;

  debug = false;

  constructor(document: Document, stylesheet?: Stylesheet, debug?: boolean) {
    this.document = document;
    this.stylesheet = stylesheet || new Stylesheet();
    this.debug = debug == undefined ? this.debug : debug;
  }

  layout(e: Element): void {

    if(e.properties.width instanceof Percent)
    {
      e.properties.width = e.parent && e.parent.properties.width ? e.parent.properties.width.valueOf() * e.properties.width.valueOf() / 100 : -1;
    }

    this.pushDown(e.properties, e.children, "width");
    this.pushDown(e.properties, e.children, "height");

    if (
      e.properties.margin.left == "auto" &&
      e.properties.margin.right != "auto" &&
      e.parent &&
      e.parent.properties.width &&
      e.properties.width
    ) {
      e.properties.margin.left = <Character>(
        (e.parent.properties.width.valueOf() -
          e.properties.width.valueOf() -
          e.properties.margin.right.valueOf())
      );

      e.properties.width = e.parent.properties.width;
    }

    if (
      e.properties.margin.right == "auto" &&
      e.properties.margin.left != "auto" &&
      e.parent &&
      e.parent.properties.width &&
      e.properties.width
    ) {
      e.properties.margin.right = <Character>(
        (e.parent.properties.width.valueOf() -
          e.properties.width.valueOf() -
          e.properties.margin.left.valueOf())
      );

      e.properties.width = e.parent.properties.width;
    }

    if (
      e.properties.margin.right == "auto" &&
      e.properties.margin.left == "auto" &&
      e.parent &&
      e.parent.properties.width &&
      e.properties.width
    ) {
      e.properties.margin.right = <Character>(
        ((e.parent.properties.width.valueOf() - e.properties.width.valueOf()) /
          2)
      );
      e.properties.margin.left = <Character>(
        ((e.parent.properties.width.valueOf() - e.properties.width.valueOf()) /
          2)
      );

      e.properties.width = e.parent.properties.width;
    }

    for (const child of e.children) this.layout(child);
  }

  pushDown<K extends keyof Properties>(
    properties: Properties,
    children: Element[],
    src: K
  ) {
    for (let child of children) {
      if (properties[src] && !child.properties[src]) {
        child.properties[src] = properties[src];
      }
    }
  }

  print(): void {
    this.layout(this.document);

    for (const e of this.document.children) {
      console.log(this.render(e));
    }
  }

  render(e: Element): string {
    let buffer = [];

    let margin = Optional.ofNullable(e.properties.margin).orElse(
      new MarginBox()
    );

    let border = e.properties.border;
    let padding = e.properties.padding;

    let margin_space = <number>margin.left + <number>margin.right;
    let border_space = border.left.width + border.right.width;
    let padding_space = <number>padding.left + <number>padding.right;

    let content_width = e.content.length;
    let display_width =
      Optional.ofNullable(e.properties.width)
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

    let top = <number>padding.top;
    while (top-- > 0) {
      parts.push(this.fill(display_width, top_margin_character));
    }

    if (content_width > display_width) {
      let matches = e.content.match(
        new RegExp(`.{1,${display_width}}( |\n|$)`, "g")
      );
      if (matches)
        for (const match of matches)
          parts.push(match[match.length - 1].match(/\s/) ?match.slice(0, match.length - 1) : match);
    } else {
      parts.push(e.content);
    }

    let bottom = <number>padding.bottom;
    while (bottom-- > 0) {
      parts.push(this.fill(display_width, bottom_margin_character));
    }

    if (margin.top > 0) {
      buffer.push(
        this.fill(
          display_width + margin_space + border_space + padding_space,
          top_margin_character
        )
      );
      buffer.push("\n");
    }

    if (border.top.width > 0) {
      buffer.push(this.fill(<number>margin.left, left_margin_character));
      buffer.push(
        this.draw_border_top(display_width + border_space + padding_space)
      );
      buffer.push(this.fill(<number>margin.right, right_margin_character));
      buffer.push("\n");
    }

    for (const part of parts) {
      let content_start = this.spacing(display_width, part);

      const align = Optional.ofNullable(e.properties.textAlign);
      let amount = content_start[align.orElseGet(() => TextAlign.left)];

      buffer.push(this.fill(<number>margin.left, left_margin_character));
      buffer.push(this.fill(<number>border.left.width, "│"));
      buffer.push(this.fill(<number>padding.left, left_margin_character));
      buffer.push(this.fill(amount, left_spacing_character));
      buffer.push(part);
      buffer.push(
        this.fill(
          display_width.valueOf() - part.length - amount,
          right_spacing_character
        )
      );

      buffer.push(this.fill(<number>padding.right, right_margin_character));
      buffer.push(this.fill(<number>border.right.width, "│"));
      buffer.push(this.fill(<number>margin.right, right_margin_character));

      buffer.push("\n");
    }
    buffer.pop();

    if (border.bottom.width > 0) {
      buffer.push("\n");
      buffer.push(this.fill(<number>margin.left, left_margin_character));
      buffer.push(
        this.draw_border_bottom(
          <number>display_width + border_space + padding_space
        )
      );
      buffer.push(this.fill(<number>margin.right, right_margin_character));
    }

    if (margin.bottom > 0) {
      buffer.push("\n");
      buffer.push(
        this.fill(
          display_width + margin_space + border_space + padding_space,
          bottom_margin_character
        )
      );
    }

    let output = buffer.join("");

    return output;
  }

  private draw_border_top(width: number): string {
    let buffer = [];
    if (width < 2) {
      return "";
    } else {
      buffer.push("\u250c");
      while (width-- > 2) buffer.push("\u2500");
      buffer.push("\u2510");

      return buffer.join("");
    }
  }

  private draw_border_bottom(width: number): string {
    let buffer = [];
    if (width < 2) {
      return "";
    } else {
      buffer.push("\u2514");
      while (width-- > 2) buffer.push("\u2500");
      buffer.push("\u2518");

      return buffer.join("");
    }
  }

  private spacing(
    display_width: number,
    part: string
  ): { [key: string]: number } {
    let content_start: {
      [key: string]: number;
    } = {};
    content_start[TextAlign.left] = 0;
    content_start[TextAlign.center] =
      display_width.valueOf() / 2 - Math.ceil(part.length / 2);
    content_start[TextAlign.right] = display_width.valueOf() - part.length;
    return content_start;
  }

  fill(amount: number, value?: string) {
    let buffer = [];
    while (--amount >= 0) buffer.push(Optional.ofNullable(value).orElse(" "));

    return buffer.join("");
  }
}
