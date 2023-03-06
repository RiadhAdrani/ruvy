import { isTextNode, isElement } from "@riadh-adrani/dom-control-js";
import { it, describe, expect, vitest } from "vitest";
import {
  ComponentTemplate,
  IComponent,
  IComponentSymbol,
  IComponentType,
  ITextComponent,
} from "../../types";
import {
  createComponent,
  createId,
  createTextComponent,
  isComponent,
  isFragment,
  processComponent,
  renderComponent,
} from "../Component";

describe("Component", () => {
  describe("createComponent", () => {
    it("should throw when tag is empty", () => {
      expect(() => createComponent("", {})).toThrow();
    });

    it("should create a component template with minimal props", () => {
      expect(createComponent("div", {})).toStrictEqual({
        tag: "div",
        ns: "http://www.w3.org/1999/xhtml",
        children: [],
        attributes: {},
        events: {},
        symbol: IComponentSymbol,
      });
    });

    it("should override tag", () => {
      expect(createComponent("div", { tag: "a" })).toStrictEqual({
        tag: "a",
        ns: "http://www.w3.org/1999/xhtml",
        children: [],
        attributes: {},
        events: {},
        symbol: IComponentSymbol,
      });
    });

    it("should add array of children", () => {
      expect(createComponent("div", { children: ["1", 2, true] })).toStrictEqual({
        tag: "div",
        ns: "http://www.w3.org/1999/xhtml",
        children: ["1", 2, true],
        attributes: {},
        events: {},
        symbol: IComponentSymbol,
      });
    });

    it("should add single children in array", () => {
      expect(createComponent("div", { children: "1" })).toStrictEqual({
        tag: "div",
        ns: "http://www.w3.org/1999/xhtml",
        children: ["1"],
        attributes: {},
        events: {},
        symbol: IComponentSymbol,
      });
    });

    it("should add event", () => {
      const onClick = () => undefined;

      expect(createComponent("div", { onClick })).toStrictEqual({
        tag: "div",
        ns: "http://www.w3.org/1999/xhtml",
        children: [],
        attributes: {},
        events: { onClick },
        symbol: IComponentSymbol,
      });
    });

    it("should add unknown key as attribute", () => {
      const test = "test";

      expect(createComponent("div", { test })).toStrictEqual({
        tag: "div",
        ns: "http://www.w3.org/1999/xhtml",
        children: [],
        attributes: { test },
        events: {},
        symbol: IComponentSymbol,
      });
    });
  });

  describe("isComponent", () => {
    it.each([
      [1, false],
      ["1", false],
      [{}, false],
      [{ symbol: "test" }, false],
      [{ symbol: IComponentSymbol }, false],
      [{ symbol: IComponentSymbol, tag: "div" }, true],
    ])("should determine if object is a component", (obj, expected) => {
      expect(isComponent(obj)).toBe(expected);
    });
  });

  describe("isFragment", () => {
    it.each([
      [1, false],
      ["1", false],
      [{}, false],
      [{ symbol: "test" }, false],
      [{ symbol: IComponentSymbol }, false],
      [{ symbol: IComponentSymbol, tag: "div" }, false],
      [{ symbol: IComponentSymbol, tag: IComponentType.Fragment }, true],
    ])("should determine if object is a fragment component", (obj, expected) => {
      expect(isFragment(obj)).toBe(expected);
    });
  });

  describe("createId", () => {
    it('should return "0" when no index and parent are provided', () => {
      expect(createId()).toBe("0");
    });

    it("should return correct id", () => {
      const parent: IComponent = {
        attributes: {},
        children: [],
        events: {},
        id: "0-1",
        ns: "http://www.w3.org/1999/xhtml",
        symbol: IComponentSymbol,
        tag: "div",
        type: IComponentType.Standard,
        domNode: undefined,
        parent: undefined,
      };

      expect(createId(0, parent)).toBe("0-1-0");
    });
  });

  describe("createTextComponent", () => {
    const parent: IComponent = {
      attributes: {},
      children: [],
      events: {},
      id: "0",
      ns: "http://www.w3.org/1999/xhtml",
      symbol: IComponentSymbol,
      tag: "div",
      type: IComponentType.Standard,
      domNode: undefined,
      parent: undefined,
    };

    it("should create a text node component", () => {
      expect(createTextComponent("test", 0, parent)).toStrictEqual({
        attributes: {},
        children: [],
        data: "test",
        events: {},
        id: "0-0",
        ns: "http://www.w3.org/1999/xhtml",
        tag: IComponentType.Text,
        type: IComponentType.Text,
        domNode: undefined,
        parent,
        symbol: IComponentSymbol,
      });
    });
  });

  describe("processComponent", () => {
    it("should create a basic component with minimal options", () => {
      const component: ComponentTemplate = {
        attributes: {},
        children: [],
        events: {},
        ns: "http://www.w3.org/1999/xhtml",
        symbol: IComponentSymbol,
        tag: "div",
      };

      expect(processComponent(component)).toStrictEqual({
        attributes: {},
        children: [],
        events: {},
        id: "0",
        ns: "http://www.w3.org/1999/xhtml",
        tag: "div",
        type: IComponentType.Standard,
        domNode: undefined,
        parent: undefined,
        symbol: IComponentSymbol,
      });
    });

    it(`it should throw when tag is of type ${IComponentType.Fragment}`, () => {
      const component: ComponentTemplate = {
        attributes: {},
        children: [],
        events: {},
        ns: "http://www.w3.org/1999/xhtml",
        symbol: IComponentSymbol,
        tag: IComponentType.Fragment,
      };

      expect(() => processComponent(component)).toThrow();
    });

    it("should transform primitive children to text components", () => {
      const component: ComponentTemplate = {
        attributes: {},
        children: ["test", 2],
        events: {},
        ns: "http://www.w3.org/1999/xhtml",
        symbol: IComponentSymbol,
        tag: "div",
      };

      const processed = processComponent(component);

      expect(processed).toStrictEqual({
        attributes: {},
        children: [
          {
            attributes: {},
            children: [],
            data: "test",
            events: {},
            id: "0-0",
            ns: "http://www.w3.org/1999/xhtml",
            tag: IComponentType.Text,
            type: IComponentType.Text,
            domNode: undefined,
            parent: processed,
            symbol: IComponentSymbol,
          },
          {
            attributes: {},
            children: [],
            data: "2",
            events: {},
            id: "0-1",
            ns: "http://www.w3.org/1999/xhtml",
            tag: IComponentType.Text,
            type: IComponentType.Text,
            domNode: undefined,
            parent: processed,
            symbol: IComponentSymbol,
          },
        ],
        events: {},
        id: "0",
        ns: "http://www.w3.org/1999/xhtml",
        tag: "div",
        type: IComponentType.Standard,
        domNode: undefined,
        parent: undefined,
        symbol: IComponentSymbol,
      });
    });

    it("should unload fragment children in parent", () => {
      const component: ComponentTemplate = {
        attributes: {},
        children: [
          {
            attributes: {},
            children: ["test", 2],
            events: {},
            ns: "http://www.w3.org/1999/xhtml",
            symbol: IComponentSymbol,
            tag: IComponentType.Fragment,
          },
        ],
        events: {},
        ns: "http://www.w3.org/1999/xhtml",
        symbol: IComponentSymbol,
        tag: "div",
      };

      const processed = processComponent(component);

      expect(processed).toStrictEqual({
        attributes: {},
        children: [
          {
            attributes: {},
            children: [],
            data: "test",
            events: {},
            id: "0-0",
            ns: "http://www.w3.org/1999/xhtml",
            tag: IComponentType.Text,
            type: IComponentType.Text,
            domNode: undefined,
            parent: processed,
            symbol: IComponentSymbol,
          },
          {
            attributes: {},
            children: [],
            data: "2",
            events: {},
            id: "0-1",
            ns: "http://www.w3.org/1999/xhtml",
            tag: IComponentType.Text,
            type: IComponentType.Text,
            domNode: undefined,
            parent: processed,
            symbol: IComponentSymbol,
          },
        ],
        events: {},
        id: "0",
        ns: "http://www.w3.org/1999/xhtml",
        tag: "div",
        type: IComponentType.Standard,
        domNode: undefined,
        parent: undefined,
        symbol: IComponentSymbol,
      });
    });

    it("should create component with children", () => {
      const component = createComponent("div", {
        children: [createComponent("h1", {}), createComponent("h2", {})],
      });

      const processed = processComponent(component);

      expect(processed).toStrictEqual({
        attributes: {},
        children: [
          {
            attributes: {},
            children: [],
            events: {},
            id: "0-0",
            ns: "http://www.w3.org/1999/xhtml",
            tag: "h1",
            type: IComponentType.Standard,
            domNode: undefined,
            parent: processed,
            symbol: IComponentSymbol,
          },
          {
            attributes: {},
            children: [],
            events: {},
            id: "0-1",
            ns: "http://www.w3.org/1999/xhtml",
            tag: "h2",
            type: IComponentType.Standard,
            domNode: undefined,
            parent: processed,
            symbol: IComponentSymbol,
          },
        ],
        events: {},
        id: "0",
        ns: "http://www.w3.org/1999/xhtml",
        tag: "div",
        type: IComponentType.Standard,
        domNode: undefined,
        parent: undefined,
        symbol: IComponentSymbol,
      });
    });
  });

  describe("renderComponent", () => {
    it("should throw when trying to render a fragment", () => {
      const component: IComponent = {
        attributes: {},
        events: {},
        children: [],
        id: "0",
        ns: "http://www.w3.org/1999/xhtml",
        symbol: IComponentSymbol,
        tag: IComponentType.Fragment,
        type: IComponentType.Fragment,
      };

      expect(() => renderComponent(component)).toThrow(
        "Unexpected Type: cannot render a fragment component."
      );
    });

    it("should render a text node", () => {
      const component: ITextComponent = {
        attributes: {},
        events: {},
        children: [],
        id: "0",
        ns: "http://www.w3.org/1999/xhtml",
        symbol: IComponentSymbol,
        tag: IComponentType.Text,
        type: IComponentType.Text,
        data: "test",
      };

      const node = renderComponent(component);

      expect(component.domNode).toStrictEqual(node);
      expect(isTextNode(node)).toBe(true);
    });

    it("should render an html element", () => {
      const component = processComponent(createComponent("div", {}));

      const node = renderComponent(component);

      expect(component.domNode).toStrictEqual(node);
      expect(isElement(node)).toBe(true);
      expect((node as HTMLDivElement).outerHTML).toBe("<div></div>");
    });

    it("should render attributes", () => {
      const component = processComponent(createComponent("div", { class: "test" }));

      const node = renderComponent<HTMLDivElement>(component);

      expect(node.outerHTML).toBe('<div class="test"></div>');
      expect(node.className).toBe("test");
    });

    it("should add events", () => {
      const fn = vitest.fn();

      const component = processComponent(createComponent("div", { onClick: fn }));

      const node = renderComponent<HTMLDivElement>(component);

      node.click();

      expect(fn).toHaveBeenCalledTimes(1);
    });

    it("should render children recursively (1st level)", () => {
      const component = processComponent(createComponent("div", { children: ["test"] }));

      const node = renderComponent<HTMLDivElement>(component);

      expect(node.outerHTML).toBe("<div>test</div>");
    });

    it("should render children recursively (2nd level)", () => {
      const component = processComponent(
        createComponent("div", { children: ["test", createComponent("p", { children: ["deep"] })] })
      );

      const node = renderComponent<HTMLDivElement>(component);

      expect(node.outerHTML).toBe("<div>test<p>deep</p></div>");
    });
  });
});
