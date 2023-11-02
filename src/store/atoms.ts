import { Environment } from '@services/environment/types';

import { createAtom } from '.';

const environmentsAtom = createAtom<Environment[]>([]);

const selectedEnvironmentAtom = createAtom<Environment | null>(null);

const loadingAtom = createAtom<boolean>(false);

const tokenAtom = createAtom<string>('');

export { environmentsAtom, loadingAtom, selectedEnvironmentAtom, tokenAtom };
