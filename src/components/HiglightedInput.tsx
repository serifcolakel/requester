import { useId, useState } from 'react';
import useEnvironments from '@hooks/useEnvironments';
import { AiFillInfoCircle } from 'react-icons/ai';
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import { Label } from './ui/label';

const REGEX = /({{.*?}})/g;

export default function HiglightedInput() {
  const [value, setValue] = useState(
    'https://{{BASE_URL}}/api/v1/{{ENDPOINT}}'
  );

  const { environments } = useEnvironments();

  const id = `higlight-${useId()}`;

  return (
    <div className="flex flex-col gap-y-1">
      <Label className="select-none" htmlFor={id} severity="h6">
        Requester Base URL
      </Label>
      <div className="input-container">
        <input
          id={id}
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <div className="input-renderer">
          {value.split(REGEX).map((word) => {
            if (word.match(REGEX) !== null) {
              const env = environments.find(
                (environment) =>
                  environment.veriable ===
                  word.replace('{{', '').replace('}}', '')
              );

              return (
                <TooltipProvider key={word}>
                  <Tooltip>
                    <TooltipTrigger
                      className={
                        env ? 'text-orange-500 z-20' : 'text-red-500 z-20'
                      }
                    >
                      {word}
                    </TooltipTrigger>
                    <TooltipContent className="flex flex-col items-center p-0 shadow">
                      {env ? (
                        <div className="flex flex-col w-full p-4 space-y-4 divide-y bg-orange-50">
                          <div className="flex flex-row items-center justify-between w-full gap-x-12">
                            <AiFillInfoCircle className="w-5 h-5 text-orange-600" />
                            <span className="text-xs text-gray-400">
                              Environment Detail
                            </span>
                          </div>
                          <div className="flex flex-row items-center justify-between w-full pt-3 gap-x-4">
                            <span className="text-sm text-orange-600 dark:text-gray-100">
                              Name
                            </span>
                            <span className="text-sm font-bold text-gray-800">
                              {env?.veriable}
                            </span>
                          </div>
                          <div className="flex flex-row items-center justify-between w-full pt-3 gap-x-4">
                            <span className="text-sm text-orange-600 dark:text-gray-100">
                              Value
                            </span>
                            <span className="text-sm font-bold text-gray-800">
                              {env?.value}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-row justify-between w-full p-4 gap-x-4 bg-red-50">
                          <AiFillInfoCircle className="w-6 h-6 text-red-600" />
                          <div className="flex flex-col gap-y-2">
                            <span className="text-base font-bold text-gray-800">
                              Unresolved environment variable.
                            </span>
                            <span className="text-sm text-gray-500">
                              <b>{word}</b> environment variable is not defined.
                            </span>
                            <span className="text-sm text-gray-500">
                              Make sure it is defined in your environment.
                            </span>
                          </div>
                        </div>
                      )}
                      <TooltipArrow
                        className={env ? 'fill-orange-500' : 'fill-red-500'}
                      />
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            }

            return <span key={word}>{word}</span>;
          })}
        </div>
      </div>
    </div>
  );
}
