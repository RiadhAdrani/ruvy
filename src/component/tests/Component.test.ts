import { isTextNode, isElement } from "@riadh-adrani/dom-control-js";
import { hasProperty, omit } from "@riadh-adrani/utils";
import { it, describe, expect, vitest, beforeEach } from "vitest";
import {
  IComponentTemplate,
  IComponent,
  IComponentSymbol,
  IComponentType,
  ITextComponent,
} from "../../types";
import {
  createComponent,
  createId,
  createTextComponent,
  diffComponents,
  executeUpdateCallbacks,
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
      const component: IComponentTemplate = {
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
      const component: IComponentTemplate = {
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
      const component: IComponentTemplate = {
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
      const component: IComponentTemplate = {
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

  describe("diffComponents", () => {
    let current: IComponent;

    const mount = (component: IComponent) => {
      document.body.innerHTML = "";
      document.body.append(renderComponent(component));
    };

    beforeEach(() => {
      current = processComponent(createComponent("div", {}));
      mount(current);
    });

    it("should throw when current component is not mounted", () => {
      const current: IComponent = processComponent(createComponent("div", {}));

      expect(() => diffComponents(current, current)).toThrow(
        "Unexpected State: cannot update a non-rendered component"
      );
    });

    it("should replace component with different tag", () => {
      const updated: IComponent = processComponent(createComponent("p", {}));

      const actions = diffComponents(current, updated);

      expect(actions.children).toStrictEqual([]);
      expect(actions.id).toBe("0");

      const named = actions.actions.map((a) => a.reason);

      expect(named).toStrictEqual([
        `replace-of-tags-ns:(div|http://www.w3.org/1999/xhtml) => (p|http://www.w3.org/1999/xhtml)`,
      ]);

      const omittedCurrent = omit(current, "domNode", "parent");
      const omittedUpdate = omit(updated, "domNode", "parent");
      expect(omittedCurrent).toStrictEqual(omittedUpdate);

      executeUpdateCallbacks(actions);
      expect(document.body.innerHTML).toBe("<p></p>");
    });

    it("should replace component with different namespaces", () => {
      const updated: IComponent = processComponent(
        createComponent("svg", { ns: "http://www.w3.org/2000/svg" })
      );

      const actions = diffComponents(current, updated);
      const named = actions.actions.map((a) => a.reason);

      expect(named).toStrictEqual([
        `replace-of-tags-ns:(div|http://www.w3.org/1999/xhtml) => (svg|http://www.w3.org/2000/svg)`,
      ]);

      const omittedCurrent = omit(current, "domNode", "parent");
      const omittedUpdate = omit(updated, "domNode", "parent");
      expect(omittedCurrent).toStrictEqual(omittedUpdate);

      executeUpdateCallbacks(actions);
      expect(document.body.innerHTML).toBe("<svg></svg>");
    });

    it("should update component with text component", () => {
      document.body.innerHTML = "";

      const current: IComponent = processComponent(
        createComponent("div", { children: createComponent("a", { href: "www.google.com" }) })
      );

      const updated: IComponent = processComponent(
        createComponent("div", { children: ["test-2"] })
      );

      mount(current);

      const actions = diffComponents(current, updated);
      const named = actions.children.map((a) => a.actions[0].reason);

      expect(named).toStrictEqual([
        "replace-of-tags-ns:(a|http://www.w3.org/1999/xhtml) => (#text|http://www.w3.org/1999/xhtml)",
      ]);

      const omittedCurrent = omit(current.children[0], "domNode", "parent");
      const omittedUpdate = omit(updated.children[0], "domNode", "parent");
      expect(omittedCurrent).toStrictEqual(omittedUpdate);

      executeUpdateCallbacks(actions);
      expect(document.body.innerHTML).toBe("<div>test-2</div>");
    });

    it("should update text data", () => {
      document.body.innerHTML = "";

      const current: IComponent = processComponent(createComponent("div", { children: ["test"] }));

      const updated: IComponent = processComponent(
        createComponent("div", { children: ["test-2"] })
      );

      mount(current);

      const actions = diffComponents(current, updated);
      const named = actions.children.map((a) => a.actions[0].reason);

      expect((current.children[0] as ITextComponent).data).toBe("test-2");

      expect(named).toStrictEqual(["update-text-data"]);

      const omittedCurrent = omit(current.children[0], "domNode", "parent");
      const omittedUpdate = omit(updated.children[0], "domNode", "parent");
      expect(omittedCurrent).toStrictEqual(omittedUpdate);

      executeUpdateCallbacks(actions);

      expect(document.body.innerHTML).toBe("<div>test-2</div>");
    });

    it("should not update same text data", () => {
      document.body.innerHTML = "";

      const current: IComponent = processComponent(createComponent("div", { children: ["test"] }));

      const updated: IComponent = processComponent(createComponent("div", { children: ["test"] }));

      mount(current);

      const actions = diffComponents(current, updated);
      const named = actions.children.map((a) => a.actions);

      const omittedCurrent = omit(current.children[0], "domNode", "parent");
      const omittedUpdate = omit(updated.children[0], "domNode", "parent");
      expect(omittedCurrent).toStrictEqual(omittedUpdate);

      expect(named).toStrictEqual([[]]);
    });

    it("should add new attribute", () => {
      const updated: IComponent = processComponent(createComponent("div", { class: "test" }));

      const actions = diffComponents(current, updated);
      const named = actions.actions.map((a) => a.reason);

      expect(named).toStrictEqual(["add-attribute-class"]);

      expect(current.attributes["class"]).toBe("test");

      const omittedCurrent = omit(current, "domNode", "parent");
      const omittedUpdate = omit(updated, "domNode", "parent");
      expect(omittedCurrent).toStrictEqual(omittedUpdate);

      executeUpdateCallbacks(actions);
      expect(document.body.innerHTML).toBe('<div class="test"></div>');
    });

    it("should update attribute", () => {
      const current: IComponent = processComponent(createComponent("div", { class: "test" }));

      mount(current);

      const updated: IComponent = processComponent(createComponent("div", { class: "test2" }));

      const actions = diffComponents(current, updated);
      const named = actions.actions.map((a) => a.reason);

      expect(named).toStrictEqual(["update-attribute-class"]);

      expect(current.attributes["class"]).toBe("test2");

      const omittedCurrent = omit(current, "domNode", "parent");
      const omittedUpdate = omit(updated, "domNode", "parent");
      expect(omittedCurrent).toStrictEqual(omittedUpdate);

      executeUpdateCallbacks(actions);
      expect(document.body.innerHTML).toBe('<div class="test2"></div>');
    });

    it("should remove attribute", () => {
      const current: IComponent = processComponent(createComponent("div", { class: "test" }));

      mount(current);

      const updated: IComponent = processComponent(createComponent("div", {}));

      const actions = diffComponents(current, updated);
      const named = actions.actions.map((a) => a.reason);

      expect(named).toStrictEqual(["remove-attribute-class"]);

      const omittedCurrent = omit(current, "domNode", "parent");
      const omittedUpdate = omit(updated, "domNode", "parent");
      expect(omittedCurrent).toStrictEqual(omittedUpdate);

      executeUpdateCallbacks(actions);

      expect(document.body.innerHTML).toBe("<div></div>");
    });

    it("should set event", () => {
      (current.domNode as HTMLElement).click();

      const onClick = vitest.fn();

      const updated: IComponent = processComponent(createComponent("div", { onClick }));

      const actions = diffComponents(current, updated);
      const named = actions.actions.map((a) => a.reason);

      expect(named).toStrictEqual(["set-event-onClick"]);

      expect(current.events["onClick"]).toStrictEqual(onClick);

      const omittedCurrent = omit(current, "domNode", "parent");
      const omittedUpdate = omit(updated, "domNode", "parent");
      expect(omittedCurrent).toStrictEqual(omittedUpdate);

      executeUpdateCallbacks(actions);

      (current.domNode as HTMLElement).click();

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("should update event", () => {
      const onClick = vitest.fn();
      const onClick2 = vitest.fn();

      const current: IComponent = processComponent(createComponent("div", { onClick }));

      mount(current);

      const updated: IComponent = processComponent(createComponent("div", { onClick: onClick2 }));

      const actions = diffComponents(current, updated);
      const named = actions.actions.map((a) => a.reason);

      expect(current.events["onClick"]).toStrictEqual(onClick2);

      expect(named).toStrictEqual(["set-event-onClick"]);

      const omittedCurrent = omit(current, "domNode", "parent");
      const omittedUpdate = omit(updated, "domNode", "parent");
      expect(omittedCurrent).toStrictEqual(omittedUpdate);

      executeUpdateCallbacks(actions);

      (current.domNode as HTMLElement).click();

      expect(onClick).toHaveBeenCalledTimes(0);
      expect(onClick2).toHaveBeenCalledTimes(1);
    });

    it("should remove event", () => {
      const onClick = vitest.fn();

      const current: IComponent = processComponent(createComponent("div", { onClick }));

      mount(current);

      (current.domNode as HTMLElement).click();

      const updated: IComponent = processComponent(createComponent("div", {}));

      const actions = diffComponents(current, updated);
      const named = actions.actions.map((a) => a.reason);

      expect(named).toStrictEqual(["remove-event-onClick"]);

      expect(hasProperty(current.events, "onClick")).toBe(false);

      const omittedCurrent = omit(current, "domNode", "parent");
      const omittedUpdate = omit(updated, "domNode", "parent");
      expect(omittedCurrent).toStrictEqual(omittedUpdate);

      executeUpdateCallbacks(actions);

      (current.domNode as HTMLElement).click();

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("should remove excess children from current", () => {
      const current: IComponent = processComponent(
        createComponent("div", { children: ["test-1", "test-2"] })
      );

      const updated: IComponent = processComponent(
        createComponent("div", { children: ["test-1"] })
      );

      mount(current);

      const actions = diffComponents(current, updated);
      const named = actions.actions.map((a) => a.reason);

      expect(named).toStrictEqual(["remove-excess-child-0-1"]);

      const omittedCurrent = omit(current.children[0], "domNode", "parent");
      const omittedUpdate = omit(updated.children[0], "domNode", "parent");
      expect(omittedCurrent).toStrictEqual(omittedUpdate);
      expect(current.children.length).toBe(1);

      executeUpdateCallbacks(actions);

      expect(document.body.innerHTML).toBe("<div>test-1</div>");
    });

    it("should add new children to current", () => {
      const updated: IComponent = processComponent(
        createComponent("div", { children: ["test-1", "test-2"] })
      );

      const current: IComponent = processComponent(
        createComponent("div", { children: ["test-1"] })
      );

      mount(current);

      const actions = diffComponents(current, updated);
      const named = actions.actions.map((a) => a.reason);

      expect(named).toStrictEqual(["add-new-child-0-1"]);
      expect(current.children.length).toBe(2);

      executeUpdateCallbacks(actions);

      expect(document.body.innerHTML).toBe("<div>test-1test-2</div>");
    });

    it("should update children recursively", () => {
      const current: IComponent = processComponent(
        createComponent("div", { children: ["test-1", "test-2"] })
      );

      const updated: IComponent = processComponent(
        createComponent("div", { children: ["test-2", "test-1"] })
      );

      mount(current);

      executeUpdateCallbacks(diffComponents(current, updated));

      expect(document.body.innerHTML).toBe("<div>test-2test-1</div>");
    });
  });
});
