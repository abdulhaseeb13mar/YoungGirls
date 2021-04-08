export const isFormValid = (firstname, email, phone, address) => {
  return firstname === ''
    ? prepareResponse(false, 'firstname', 'is empty')
    : email === ''
    ? prepareResponse(false, 'email', 'is Empty')
    : !email.includes('@') || !email.includes('.')
    ? prepareResponse(false, 'email', 'is not valid')
    : phone === ''
    ? prepareResponse(false, 'phone', 'number is empty')
    : phone.length !== 11
    ? prepareResponse(false, 'phone', 'number must have 11 digits')
    : address === ''
    ? prepareResponse(false, 'address', 'is empty')
    : prepareResponse(true, '', '');
};

const prepareResponse = (status, category, msg) => {
  return {
    status: status,
    errMsg: msg,
    errCategory: category,
  };
};
