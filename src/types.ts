export type TAnimal = {
  name: string;
  taxonomy: {
    kingdom: string;
    phylum: string;
    class: string;
    order: string;
    family: string;
    genus: string;
    scientific_name: string;
  };
  locations: string[];
  characteristics: Record<string, string>;
};
