import { PropsWithChildren, useId, useState } from 'react';
import { InfoIcon } from 'lucide-react';

import { Label } from '@ui/label';
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@ui/tooltip';

const REGEX = /({{.*?}})/g;

type Props = {
  options: {
    value: string;
    name: string;
  }[];
  label?: string;
  initialValue?: string;
  getFormattedValue: (value: string) => void;
};

export default function HighlightedInput({
  options,
  label,
  initialValue = '',
  getFormattedValue,
}: PropsWithChildren<Props>) {
  const [value, setValue] = useState<string>(initialValue);

  const id = `higlight-${useId()}`;

  let resultValue = '';

  resultValue = value
    .split(REGEX)
    .map((word) => {
      if (word.match(REGEX) !== null) {
        const findedOption = options.find(
          (option) =>
            option.name ===
            word.replace(REGEX, (match) =>
              match.replace('{{', '').replace('}}', '')
            )
        );

        return findedOption?.value || '';
      }

      return word;
    })
    .join('');

  if (resultValue !== value) {
    getFormattedValue(resultValue);
  }

  return (
    <div className="flex flex-col gap-y-3">
      {label ? (
        <Label className="select-none" htmlFor={id} severity="h6">
          {label}
        </Label>
      ) : null}
      <div className="input-container">
        <input
          id={id}
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <div className="input-renderer">
          {value.split(REGEX).map((word) => {
            if (word.match(REGEX) !== null) {
              const findedOption = options.find(
                (option) =>
                  option.name ===
                  word.replace(REGEX, (match) =>
                    match.replace('{{', '').replace('}}', '')
                  )
              );

              return (
                <TooltipProvider key={word}>
                  <Tooltip>
                    <TooltipTrigger
                      className={
                        findedOption
                          ? 'text-orange-500 z-20'
                          : 'text-red-500 z-20'
                      }
                    >
                      {word}
                    </TooltipTrigger>
                    <TooltipContent className="flex flex-col items-center p-0 shadow">
                      {findedOption ? (
                        <div className="flex flex-col w-full p-4 space-y-4 divide-y bg-orange-50">
                          <div className="flex flex-row items-center justify-between w-full gap-x-12">
                            <InfoIcon className="w-6 h-6 text-orange-600" />
                            <span className="text-xs text-gray-400">
                              Environment Detail
                            </span>
                          </div>
                          <div className="flex flex-row items-center justify-between w-full pt-3 gap-x-4">
                            <span className="text-sm text-orange-600 dark:text-gray-100">
                              Name
                            </span>
                            <span className="text-sm font-bold text-gray-800">
                              {findedOption.name}
                            </span>
                          </div>
                          <div className="flex flex-row items-center justify-between w-full pt-3 gap-x-4">
                            <span className="text-sm text-orange-600 dark:text-gray-100">
                              Value
                            </span>
                            <span className="text-sm font-bold text-gray-800">
                              {findedOption.value || '-'}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-row justify-between w-full p-4 gap-x-4 bg-red-50">
                          <InfoIcon className="w-6 h-6 text-red-600" />
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
                        className={
                          findedOption ? 'fill-orange-500' : 'fill-red-500'
                        }
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
