import { TEnvironments } from './types';
import { createAtom } from '.';

const environmentsAtom = createAtom<TEnvironments>([]);

export { environmentsAtom };
