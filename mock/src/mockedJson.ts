export const loadDictionary = new Map<string, any>();
export const searchDictionaryE = new Map<string, any>();
export const searchDictionaryStars = new Map<string, any>();
export const mainSearchDict = new Map<string, Map<string, any>>();
// load mapping
loadDictionary.set(
  "/Users/chloenevas/Documents/mock-cnevas-rgonza27/mock/src/income.csv",
  '\nhasHeader: true.\nheader: [state, data type, average weekly earnings, number of workers, earnings disparity, employed percent].\nRows: [[ri, white, " $1,058.47 ", 395773.6521,  $1.00 , 75%], [ri, black,  $770.26 , 30424.80376,  $0.73 , 6%], [ri, native american/american indian,  $471.07 , 2315.505646,  $0.45 , 0%], [ri, asian-pacific islander, " $1,080.09 ", 18956.71657,  $1.02 , 4%], [ri, hispanic/latino,  $673.14 , 74596.18851,  $0.64 , 14%], [ri, multiracial,  $971.89 , 8883.049171,  $0.92 , 2%]].'
);
loadDictionary.set(
  "/Users/chloenevas/Documents/mock-cnevas-rgonza27/mock/src/stars.csv",
  "\nhasHeader: false.\nRows: [[0, Sol, 0, 0, 0], [1, 282.43485, 0.00449, 5.36884],[2, 43.04329, 0.00285, -15.24144],[3, 277.11358, 0.02422, 223.27753],[3759, 96 G. Psc, 7.26388, 1.55643, 0.68697],[70667, Proxima Centauri, -0.47175, -0.36132, -1.15037],[71454, Rigel Kentaurus B, -0.50359, -0.42128, -1.1767],[71457, Rigel Kentaurus A, -0.50362, -0.42139, -1.17665],[87666, Barnard's Star, -0.01729, -1.81533, 0.14824],[118721, '', -2.28262, 0.64697, 0.29354]]");

loadDictionary.set("race", 42);

// search stars

searchDictionaryStars.set(
  "Barnard's Star",
  "[87666,Barnard's Star,-0.01729,-1.81533,0.14824]"
);

//search <column> <value>

var output: string[][]
//output.push
// search income
searchDictionaryE.set(
  "None RI",

  '[[ri, white, " $1,058.47 ", 395773.6521,  $1.00 , 75%], [ri, black,  $770.26 , 30424.80376,  $0.73 , 6%], [ri, native american/american indian,  $471.07 , 2315.505646,  $0.45 , 0%], [ri, asian-pacific islander, " $1,080.09 ", 18956.71657,  $1.02 , 4%], [ri, hispanic/latino,  $673.14 , 74596.18851,  $0.64 , 14%], [ri, multiracial,  $971.89 , 8883.049171,  $0.92 , 2%]]'
);

searchDictionaryE.set("White", "[ri, white, \" $1,058.47 \", 395773.6521,  $1.00 , 75%]");
searchDictionaryE.set(
  "Black",
  '[ri, black,  $770.26 , 30424.80376,  $0.73 , 6%]'
);

mainSearchDict.set(loadDictionary.get("/Users/chloenevas/Documents/mock-cnevas-rgonza27/mock/src/income.csv"),searchDictionaryE);
mainSearchDict.set(
  loadDictionary.get("/Users/chloenevas/Documents/mock-cnevas-rgonza27/mock/src/stars.csv"),
  searchDictionaryStars
);

