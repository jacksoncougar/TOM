import { Optional } from "typescript-optional"

export class Properties {
  width: Unit | undefined;
  height: Unit | undefined;
  margin: MarginBox | undefined;
  textAlign: TextAlign | undefined;

  constructor(init?: Partial<Properties>) {
    Object.assign(this, init);
  }
}

export class Element {
  content!: string;
  properties!: Properties;
  parent: Element | undefined;
  children!: Element[];

  constructor(init?: Partial<Element>) {
    Object.assign(this, init);

    if (!this.children) this.children = [];
    if(!this.properties) this.properties = new Properties();
  }
}

export enum TextAlign {
  right,
  center,
  left
}

class Unit extends Number {}
class Percent extends Unit {}
class Character extends Unit {}

export class MarginBox {
  top!: Margin;
  right!: Margin;
  bottom!: Margin;
  left!: Margin;
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
      if (properties[p] && !child.properties[p])
        child.properties[p] = properties[p];
    }
  }

  print(): void {
    this.layout(this.document);

  for (const e of this.document.children) {
    console.log(this.render(e));
  }
  }


  render(e : Element) : string
  {
      let buffer = [];

      let content_width = e.content.length;
      let width = e.properties.width || 0;

      let content_start : {[key:string]:number;}= {};
      content_start[TextAlign.left] = 0;
      content_start[TextAlign.center] = (width.valueOf() - content_width) / 2;
      content_start[TextAlign.right] = (width.valueOf() - content_width);

      const align = Optional.ofNullable(e.properties.textAlign);
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
