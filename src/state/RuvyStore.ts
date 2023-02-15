import { Callback } from "../types";
import createEffectCollection from "./createEffectCollection";
import createStateCollection from "./createStateCollection";
import Store from "./Store";

export class RuvyStore extends Store {
  onChanged: Callback;

  constructor(onChanged: Callback) {
    super();

    this.onChanged = onChanged;

    this.createItemsStore(() =>
      createStateCollection(this, {
        name: "state",
        checkEqual: true,
        forceSet: false,
        keepUnused: false,
      })
    );

    this.createEffectsStore(() =>
      createEffectCollection(this, { name: "effect", keepUnused: false })
    );
  }
}
