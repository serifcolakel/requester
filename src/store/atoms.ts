import { Collection } from '@services/collection/types';
import { Environment } from '@services/environment/types';

import { createAtom } from '.';

const environmentsAtom = createAtom<Environment[]>([]);

const selectedEnvironmentAtom = createAtom<Environment | null>(null);

const collectionsAtom = createAtom<Collection[]>([]);

const loadingAtom = createAtom<boolean>(false);

const tokenAtom = createAtom<string>('');

export {
  collectionsAtom,
  environmentsAtom,
  loadingAtom,
  selectedEnvironmentAtom,
  tokenAtom,
};
