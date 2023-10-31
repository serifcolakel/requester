export const typeMapper = (data: string): string => {
  if (typeof data === 'object') {
    if (Array.isArray(data)) {
      const arrayElementType =
        (data as unknown[]).length > 0 ? typeMapper(data[0]) : 'unknown';

      return `Array<${arrayElementType}>`;
    }

    const properties = Object.keys(data)
      .map((key) => `${key}: ${typeMapper(data[key])}`)
      .join(',\n  ');

    return `{\n  ${properties}\n}`;
  }

  return typeof data;
};

export function generateTypeInterface(jsonObject: string): string {
  return `export interface GeneratedType \n${typeMapper(jsonObject)} \n`;
}
