import regexPatterns from './regexPatterns';
import errorMessages from './errorMessages';
import { removePunctuationMarks } from './formatters';

export function validateCIM(cim: string): string | true {
  return cim ? regexPatterns.CIM.test(removePunctuationMarks(cim)) || errorMessages.INVALID_CIM : true;
}

export function validateCPF(cpf: string): string | true {
  return cpf ? regexPatterns.CPF.test(removePunctuationMarks(cpf)) || errorMessages.INVALID_CPF : true;
}

export function validateCEP(cep: string): string | true {
  return cep ? regexPatterns.CEP.test(removePunctuationMarks(cep)) || errorMessages.INVALID_CEP : true;
}

export function validatePhone(phone: string): string | true {
  return phone ? regexPatterns.phone.test(removePunctuationMarks(phone)) || errorMessages.INVALID_PHONE : true;
}