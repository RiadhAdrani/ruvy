import { describe, it, expect, beforeEach, vitest } from "vitest";
import createEffectCollection from "../createEffectCollection";
import createStateCollection from "../createStateCollection";
import Store from "../Store";

describe("Store class", () => {
  let store: Store;

  beforeEach(() => {
    store = new Store();
  });

  it("it should create a new store with empty collections", () => {
    expect(store.items).toStrictEqual({});
    expect(store.effects).toStrictEqual({});
  });

  it("should create a new items store", () => {
    store.createItemsStore(() =>
      createStateCollection(store, {
        name: "test",
        checkEqual: true,
        forceSet: false,
        keepUnused: false,
        onChanged: () => 0,
      })
    );

    expect(store.items["test"]).toBeDefined();
    expect(store.items["test"].items).toStrictEqual({});
    expect(store.items["test"].used).toStrictEqual([]);
    expect(store.items["test"].name).toBe("test");
  });

  describe("createStateCollection", () => {
    beforeEach(() => {
      store.createItemsStore(() =>
        createStateCollection(store, {
          name: "test",
          checkEqual: true,
          forceSet: false,
          keepUnused: false,
          onChanged: () => 0,
        })
      );
    });

    it("should set a new state entry", () => {
      store.setItem("test", "test", "test");

      expect(store.items["test"].items["test"]).toBeDefined();
      expect(store.items["test"].items["test"].creationIndex).toBe(0);
      expect(store.items["test"].items["test"].history).toStrictEqual([]);
      expect(store.items["test"].items["test"].value).toBe("test");
    });

    it("should not set a state entry when already initialized", () => {
      store.setItem("test", "test", "test");
      store.setItem("test", "test", "test2");

      expect(store.items["test"].items["test"]).toBeDefined();
      expect(store.items["test"].items["test"].creationIndex).toBe(0);
      expect(store.items["test"].items["test"].history).toStrictEqual([]);
      expect(store.items["test"].items["test"].value).toBe("test");
    });

    it("should force set", () => {
      store = new Store();

      store.createItemsStore(() =>
        createStateCollection(store, {
          name: "test",
          checkEqual: true,
          forceSet: true,
          keepUnused: false,
          onChanged: () => 0,
        })
      );

      store.setItem("test", "test", "test");
      store.setItem("test", "test", "test2");

      expect(store.items["test"].items["test"].value).toBe("test2");
    });

    it("should update item", () => {
      store.setItem("test", "test", "test");
      store.updateItem("test", "test", "test2");

      expect(store.items["test"].items["test"].value).toBe("test2");
      expect(store.items["test"].items["test"].history).toStrictEqual(["test"]);
    });

    it("should run onChanged callback", () => {
      store = new Store();

      const onChanged = vitest.fn(() => undefined);

      store.createItemsStore(() =>
        createStateCollection(store, {
          name: "test",
          checkEqual: true,
          forceSet: true,
          keepUnused: false,
          onChanged,
        })
      );

      store.setItem("test", "test", "test");
      store.updateItem("test", "test", "test2");

      expect(store.items["test"].items["test"].value).toBe("test2");
      expect(onChanged).toHaveBeenCalledTimes(1);
    });

    it("should get item value", () => {
      store.setItem("test", "test", "test");

      const [val, set, get] = store.getItem<string>("test", "test");

      expect(val).toBe("test");
      expect(get()).toBe("test");

      set("test2");

      expect(get()).toBe("test2");
    });

    it("should remove item", () => {
      store.setItem("test", "test", "test");

      store.removeItem("test", "test");

      expect(store.items["test"].items["test"]).toBe(undefined);
    });

    it("should not remove item", () => {
      store = new Store();

      const onChanged = vitest.fn(() => undefined);

      store.createItemsStore(() =>
        createStateCollection(store, {
          name: "test",
          checkEqual: true,
          forceSet: true,
          keepUnused: true,
          onChanged,
        })
      );

      store.setItem("test", "test", "test");

      store.removeItem("test", "test");

      expect(store.items["test"].items["test"]).toBeDefined();
    });
  });

  describe("createEffectCollection", () => {
    beforeEach(() => {
      store.createEffectsStore(() =>
        createEffectCollection(store, {
          name: "test",
          keepUnused: false,
        })
      );
    });

    it("should set a new effect entry", () => {
      const cb = vitest.fn(() => undefined);

      store.setEffect("test", "test", cb, "test");

      expect(store.effects["test"].used).toStrictEqual(["test"]);
      expect(store.effects["test"].items["test"]).toBeDefined();
      expect(store.effects["test"].items["test"].dep).toBe("test");
      expect(store.effects["test"].items["test"].called).toBe(0);
      expect(store.effects["test"].items["test"].cleanUp).toBeUndefined();
      expect(store.effects["test"].items["test"].effect).toStrictEqual(cb);
      expect(store.effects["test"].items["test"].shouldRun).toBe(true);
    });

    it("should run the effect", () => {
      const cln = vitest.fn(() => undefined);
      const cb = vitest.fn(() => cln);

      store.setEffect("test", "test", cb, "test");
      store.runEffect("test", "test");

      const item = store.effects["test"].items["test"];

      expect(cb).toHaveBeenCalledTimes(1);
      expect(item.called).toBe(1);
      expect(item.cleanUp).toStrictEqual(cln);
      expect(item.shouldRun).toBe(false);
    });

    it("should update the effect", () => {
      const cln = vitest.fn(() => undefined);
      const cb = vitest.fn(() => cln);

      const cln2 = vitest.fn(() => undefined);
      const cb2 = vitest.fn(() => cln2);

      store.setEffect("test", "test", cb, "test");
      store.runEffect("test", "test");
      store.setEffect("test", "test", cb2, "test2");

      const item = store.effects["test"].items["test"];

      expect(item.shouldRun).toBe(true);
      expect(item.effect).toStrictEqual(cb2);
      expect(item.dep).toBe("test2");
    });
  });
});
