import { createAtom } from '.';
import { TEnvironments } from './types';

const environmentsAtom = createAtom<TEnvironments>([]);

export { environmentsAtom };
