import { useCustomAtom } from '@store/index';
import { environmentsAtom } from '@store/atoms';
import { TEnvironment } from '@store/types';
import { generateRandomId } from '@lib/generate';
import notification from '@lib/notification';

/**
 * @description This hook is used to manage environments with global state
 * @returns Returns the all functionality for environments
 */
export default function useEnvironments() {
  const [environments, setEnvironments] = useCustomAtom(environmentsAtom);

  const hasEmptyEnvironments = () =>
    environments.some((env) => env.veriable === '' || env.value === '');

  const addEnvironment = () => {
    if (hasEmptyEnvironments()) {
      notification('Please fill the empty environments.', 'warning');

      return;
    }

    setEnvironments([
      ...environments,
      {
        id: generateRandomId(),
        veriable: '',
        value: '',
      },
    ]);
  };

  const removeEnvironment = (environment: TEnvironment) => {
    setEnvironments(environments.filter((env) => env.id !== environment.id));
  };

  const updateEnvironmentValue = (env: TEnvironment, value: string) => {
    setEnvironments(
      environments.map((environment) =>
        environment.id === env.id ? { ...env, value } : environment
      )
    );
  };

  const updateEnvironmentVariableName = (
    env: TEnvironment,
    veriable: string
  ) => {
    setEnvironments(
      environments.map((environment) =>
        environment.id === env.id ? { ...env, veriable } : environment
      )
    );
  };

  const removeEmptyEnvironments = () => {
    setEnvironments(
      environments.filter((env) => env.veriable !== '' && env.value !== '')
    );
  };

  return {
    environments,
    addEnvironment,
    removeEnvironment,
    updateEnvironmentValue,
    updateEnvironmentVariableName,
    removeEmptyEnvironments,
  };
}