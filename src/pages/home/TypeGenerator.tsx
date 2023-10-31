import { useState } from 'react';

import notification from '@lib/notification';

import { generateTypeInterface } from './util';

type JSONType = string; // Define a type for JSON data

function TypeGenerator({ jsonObject }: { jsonObject: JSONType }) {
  const [generatedTypes, setGeneratedTypes] = useState<string>('');

  const generateTypes = () => {
    try {
      const parsedData = JSON.parse(jsonObject);

      const typeInterface = generateTypeInterface(parsedData);

      setGeneratedTypes(typeInterface);
    } catch (error) {
      window.console.error('Invalid JSON data:', error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(generatedTypes)
      .then(() => notification('Copied to clipboard'))
      .catch((error) => window.console.error('Copy failed:', error));
  };

  return (
    <div className="flex flex-col gap-y-4">
      <button onClick={generateTypes} type="button">
        Generate Types
      </button>
      <button onClick={copyToClipboard} type="button">
        Copy Types
      </button>
      {generatedTypes ? (
        <pre className="p-4 text-sm text-gray-900 bg-gray-400 rounded-md">
          <code>{generatedTypes}</code>
        </pre>
      ) : null}
    </div>
  );
}

export default TypeGenerator;
