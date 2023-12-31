import { UtilityProps } from '@/types.js';

export * from '../lib/index.js';

export type PropsWithUtility<T extends object = object> = UtilityProps & T;
