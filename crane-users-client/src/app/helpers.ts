
export const capitalizeFirstLetter =(str:string):string=> {
  if (!str) { 
    return '';
  }
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export const formatDate =(dateFromDB:string):string =>{
  const dateObject: Date = new Date(dateFromDB);

  const formatter = new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      timeZone: 'Israel' 
  });
  const formattedDate: string = formatter.format(dateObject);
  return formattedDate
}

//MAKE A HELPER FUNTION HERE !!!!!!
// Assuming your current date string is 'DD/MM/YYYY'
const ddMMyyyyDate:string= "20/12/2025"; 

// Split, reverse to get YYYY, MM, DD, and join with '-'
const isoDate:string = ddMMyyyyDate.split('/').reverse().join('-'); 
// isoDate will be "2025-12-20"