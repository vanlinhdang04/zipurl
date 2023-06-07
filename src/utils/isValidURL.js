export const isValidURL = (str) => {
  let givenURL ;
    try {
        givenURL = new URL (str);
    } catch (error) {
        console.log ("error is", error);
       return false; 
    }
    return true;
};