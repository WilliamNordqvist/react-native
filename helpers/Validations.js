const Validation = (ssn, phoneNumber, email, country) => {
  let error = false;
  let errMessages = [];

  const ssnValidation = () => {
    ssn = trimString(ssn)
    
    if (ssn === null || ssn === "" || ssn === undefined) {
      error = true;
      errMessages = [...errMessages, "Personal identity number is required"]
    } 
    else if( ssn.length > 12 || ssn.length < 10) {
      error = true;
      errMessages = [...errMessages, "Personal identity number can only be between 10 to 12 digits"]
    }

     if (checkChar(ssn)) {
      error = true;
      errMessages = [...errMessages, "Personal identity number can not contain character"]
    }

  };


  const phoneValidation = () => {
    phoneNumber = trimString(phoneNumber)
  
    if (phoneNumber === null || phoneNumber === "" || phoneNumber === undefined) {
      error = true;
      errMessages = [...errMessages, "Phone number is required"]
    } 
    else if( phoneNumber.length > 10 || phoneNumber.length < 8 || phoneNumber[0] !== '0') {
      error = true;
      errMessages = [...errMessages, "Phone number can only be between 8 to 10 digits and needs to start with 0"]
    }
    if (checkChar(phoneNumber)) {
      error = true;
      errMessages = [...errMessages, "Phone number can not contain character"]
    }
  }


const emailValidation = () => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(email === null || email === "" || email === undefined){
    error = true;
    errMessages = [...errMessages, "Email is required"]
  }
  else if(re.test(email) === false){
    error = true;
    errMessages = [...errMessages, "Invalid email"]
  }
}

const countryValidation = () => {
if(country == 'Choose a country' || country === null){
  error = true;
  errMessages = [...errMessages, "Country list is required"]
}
}
  
  ssnValidation();
  phoneValidation();
  emailValidation();
  countryValidation();
  return {errMessages, error};
};

export default Validation;







const checkChar = (string) => {
  if(string){
    return /[A-Za-z]/.test(string);
  }
}
const trimString = (string) => {
  if(string){
  return string.replace(/\s/g, "").replace(/([^a-z0-9]+)/gi, '');
  }
}