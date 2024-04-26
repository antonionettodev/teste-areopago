import regexPatterns from './regexPatterns';

export function formatCPF(cpf: string): string {
  return cpf.replace(regexPatterns.CPF, '$1.$2.$3-$4');
};

export function formatCEP(cep: string): string {
  return cep.replace(regexPatterns.CEP, '$1-$2');
};

export function formatPhone(phone: string): string {
  return phone.replace(regexPatterns.phone, '($1) $2-$3');
};

export function removeNonAlphanumeric(text: string): string {
  return text.replace(regexPatterns.nonAlphanumeric, '');
};

export function removeNonAlphabetic(text: string): string {
  return text.replace(regexPatterns.nonAlphabetic, '');
};

export function removeNonNumeric(text: string): string {
  return text.replace(regexPatterns.nonNumeric, '');
};

export function removePunctuationMarks(text: string): string {
  return text.replace(regexPatterns.punctuationMarks, '');
};

export function formatAsaasDate(date: Date): string {
  const pad = (num: number): string => num.toString().padStart(2, '0');

  const year: string = date.getFullYear().toString();
  const month: string = pad(date.getMonth() + 1);
  const day: string = pad(date.getDate());
  const hours: string = pad(date.getHours());
  const minutes: string = pad(date.getMinutes());
  const seconds: string = pad(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}