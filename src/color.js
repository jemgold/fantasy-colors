import { __, compose, construct, map, mergeAll, replace } from 'ramda';

// https://github.com/jpederson/Pantoner/blob/gh-pages/json/pantone-color-of-the-year.json
const pantonesOfTheYear = [
  {
    "pantone": "cerulean-15-4020",
    "hex": "#9bb7d6"
  },
  {
    "pantone": "fuchsia-rose-17-2031",
    "hex": "#c94476"
  },
  {
    "pantone": "true-red-19-1664",
    "hex": "#c02034"
  },
  {
    "pantone": "aqua-sky-14-4811",
    "hex": "#7ac5c5"
  },
  {
    "pantone": "tigerlily-17-1456",
    "hex": "#e4583e"
  },
  {
    "pantone": "blue-turquoise-15-5217",
    "hex": "#4fb0ae"
  },
  {
    "pantone": "sand-dollar-13-1106",
    "hex": "#decdbf"
  },
  {
    "pantone": "chili-pepper-19-1557",
    "hex": "#9c1b31"
  },
  {
    "pantone": "blue-iris-18-3943",
    "hex": "#595ca1"
  },
  {
    "pantone": "mimosa-14-0848",
    "hex": "#f0bf59"
  },
  {
    "pantone": "turquoise-15-5519",
    "hex": "#41b6ab"
  },
  {
    "pantone": "honeysuckle-18-2120",
    "hex": "#da4f70"
  },
  {
    "pantone": "tangerine-tango-17-1463",
    "hex": "#f05442"
  },
  {
    "pantone": "emerald-17-5641",
    "hex": "#169c78"
  },
  {
    "pantone": "radiant-orchid-18-3224",
    "hex": "#b565a7"
  }
];

const deleteS = replace(__, '');

// regex :: string -> string -> RegExp
const regex = construct(RegExp);

// pantoneTail :: RegExp
const pantoneTail = regex(/-\d+-\d+/, 'g');

// cleanPantone :: string -> string
const cleanPantone = deleteS(pantoneTail);

export const pantones = compose(
  mergeAll,
  map(({ pantone, hex }) => {
    const cleanedPantone = cleanPantone(pantone);
    return { [cleanedPantone]: hex }
  })
)(pantonesOfTheYear);
