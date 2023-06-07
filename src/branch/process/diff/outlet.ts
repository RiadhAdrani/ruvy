import { Core } from '../../../core/Core.js';
import { Branch } from '../../types.js';
import { getOutletDepth } from '../../utils/index.js';

const outlet = (current: Branch): Array<unknown> => {
  const depth = getOutletDepth(current) - 1;

  const child = Core.singleton.router?.getComponentByDepth(depth);

  return [child];
};

export default outlet;
