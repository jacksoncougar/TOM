import { Optional } from "typescript-optional";

export class Properties {
  width: Unit | undefined;
  height: Unit | undefined;
  margin: MarginBox = new MarginBox();
  boundary: Boundary = new Boundary();
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
}

export class Element {
  content!: string;
  properties!: Properties;
  parent: Element | undefined;
  children!: Element[];

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
export class Percent extends Unit {}
export class Character extends Unit {}
class Auto extends Boolean {}

export class MarginBox {
  top: Percent | Character = 0;
  right: Percent | Character | Auto = 0;
  bottom: Percent | Character = 0;
  left: Percent | Character | Auto = 0;

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

export class Stylesheet extends Map<Element, Style> {}

export class Style extends Properties {}

export class TOM {
  document!: Document;
  stylesheet!: Stylesheet;

  constructor(document: Document, stylesheet?: Stylesheet) {
    this.document = document;
    this.stylesheet = stylesheet || new Stylesheet();
  }

  layout(e: Element): void {
    this.pushDown(e.properties, e.children, "width");
    this.pushDown(e.properties, e.children, "height");
  }

  pushDown<K extends keyof Properties>(
    properties: Properties,
    children: Element[],
    p: K
  ) {
    for (let child of children) {
      if (properties[p] && !child.properties[p]) {
        child.properties[p] = properties[p];
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

    let margin_space = <number>margin.left + <number>margin.right;

    let content_width = e.content.length;
    let display_width =
      Optional.ofNullable(e.properties.width)
        .map($ => $.valueOf())
        .orElse(0) - margin_space;

    let content_start: { [key: string]: number } = {};
    content_start[TextAlign.left] = 0;
    content_start[TextAlign.center] =
      display_width.valueOf() / 2 - content_width / 2;
    content_start[TextAlign.right] = display_width.valueOf() - content_width;

    const align = Optional.ofNullable(e.properties.textAlign);
    let amount = content_start[align.orElseGet(() => TextAlign.left)];

    buffer.push(this.fill(<number>margin.left, "\x1b[46m \x1b[0m"));
    buffer.push(this.fill(amount, "\x1b[46m▒\x1b[0m"));
    buffer.push(e.content);
    buffer.push(
      this.fill(display_width.valueOf() - content_width - amount, "\x1b[31m▓\x1b[0m")
    );
    buffer.push(this.fill(<number>margin.right, "\x1b[41m \x1b[0m"));

    return buffer.join("");
  }

  fill(amount: number, value?: string) {
    let buffer = [];
    while (--amount >= 0) buffer.push(Optional.ofNullable(value).orElse(" "));

    return buffer.join("");
  }
}
