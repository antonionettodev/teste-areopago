const regexPatterns = {
  CIM: /^\d{1,8}$/,
  CPF: /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
  CEP: /^(\d{5})(\d{3})$/,
  phone: /^(\d{2})(\d{4,5})(\d{4})$/,
  nonAlphanumeric: /[^a-zA-Z0-9]/g,
  nonAlphabetic: /[^a-zA-Z]/g,
  nonNumeric: /[^0-9]/g,
  punctuationMarks: /[\s_()-./]/g, 
};

export default regexPatterns;