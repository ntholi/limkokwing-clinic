export default interface Drug {
  id?: string;
  name: string;
  size: string;
  description?: string;
}

export function drugAsString(drug: Drug) {
  return `${drug.name} (${drug.size})`;
}

export function drugFromString(drugString: string): Drug {
  const match = drugString.match(/^(.*) \((.*)\)$/);
  if (match) {
    return {
      name: match[1],
      size: match[2],
    };
  }
  return {
    name: drugString,
    size: '',
  };
}
