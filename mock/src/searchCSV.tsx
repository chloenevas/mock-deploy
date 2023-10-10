import { mainSearchDict } from "./mockedJson";

/**
 * 
 * @param input - value user is searching for
 * @param data - csv that they're searching in 
 * @returns 
 */
export function search(input: string, data: string) {
  var search = input.slice(7); // get rid of "search " from the input
  var searchComps: string[] = [];
  // creates an array containing the header & search value - splits it based on 
  // where there are quotations so that two-word headers or entries can be used 
  // when surrounded by quotes
  const matches: RegExpMatchArray | null = search.match(
    /(".*?"|[^"\s]+)+(?=\s*|\s*$)/g
  );

  if (matches !== null) {
    searchComps = matches;    
  }

  var header: string = "";
  var value = "";

  // if user entered a header
  if (searchComps.length == 2) {
    header = (searchComps[0]).toLowerCase();
    // if header has quotes at beginning and end (meaning it's a multi-word entry)
      if (header[0] == '"' && header[header.length - 1] == '"') {
        header = (header.substring(1, header.length - 1)).toLowerCase();
      }
    header = header + ","; // add a comma just for consistency with mocked key entries
    value = searchComps[1].toLowerCase();
  }

  // if there's no header, ignore it
  else if (searchComps.length == 1) {
    header = "";
    value = searchComps[0].toLowerCase();
  }

  // deals with if the value is a multi-word entry
  if (value[0] == '"' && value[value.length - 1] == '"') {
    value = value.substring(1, value.length - 1);
  }

  var specificDict = mainSearchDict.get(data); // get the dictionary of this csv file
  if (specificDict == undefined) {
    return "Please Load a File First!";
  }
  var response = specificDict.get(header + value); // get the specific search entry from this csv

  if (response == undefined) {
    return "value was not found";
  }

  return response;

}
