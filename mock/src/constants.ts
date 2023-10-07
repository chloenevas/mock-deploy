// When we write tests, we'll be searching using accessible names. So let's
// use the same constant identifier; that way if we decide to change the text
// in the app, it won't break our tests.
export const TEXT_try_button_accessible_name = "try your sequence";
export const TEXT_number_1_accessible_name = "first number in sequence";
export const TEXT_number_2_accessible_name = "second number in sequence";
export const TEXT_number_3_accessible_name = "third number in sequence";
export const TEXT_try_button_text = "Submit!";
export const loadDictionary = new Map<string, any>();
loadDictionary.set(
  "earnings",
  '\nhasHeader: true.\nheader: [state, data type, average weekly earnings, number of workers, earnings disparity, employed percent].\nRows: [[ri, white, " $1,058.47 ", 395773.6521,  $1.00 , 75%], [ri, black,  $770.26 , 30424.80376,  $0.73 , 6%], [ri, native american/american indian,  $471.07 , 2315.505646,  $0.45 , 0%], [ri, asian-pacific islander, " $1,080.09 ", 18956.71657,  $1.02 , 4%], [ri, hispanic/latino,  $673.14 , 74596.18851,  $0.64 , 14%], [ri, multiracial,  $971.89 , 8883.049171,  $0.92 , 2%]].'
);
loadDictionary.set("stars", "pretend this is data");
loadDictionary.set("race", 42);
