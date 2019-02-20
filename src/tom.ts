
    interface Properties
    {
        width: Number;
        margin: MarginBox;
        textAlign: TextAlign;    
    }
  
    export class Element implements Properties {
    content!: String;
    width!: Number;
    margin!: MarginBox;
    textAlign!: TextAlign;  
    parent: Element | undefined;
    children!: Element[];

    constructor(init?:Partial<Element>)
    {
        Object.assign(this, init);

        if(!this.children) this.children = [];
    }
  }

  export enum TextAlign {
    right,
    center,
    left
  }

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
    }
  }

  export class Stylesheet extends Map<Element, Style>
  {

  }

  export class Style implements Properties
  {
    width!: Number;
    margin!: MarginBox;
    textAlign!: TextAlign;  
  }

  export class TOM{
      document! : Document;
      stylesheet! : Stylesheet;

      constructor (document:Document, stylesheet?:Stylesheet) {
          this.document = document;
          this.stylesheet = stylesheet || new Stylesheet();
      }

      print() : void {
          for(const e of this.document.children)
          {
              console.log(e && e.content || 'nothing');
          }
      }
  }