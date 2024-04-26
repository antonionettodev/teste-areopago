import { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload/types';
import { sendFinanceRequest } from '../api/financeApi';

export const useCustomerChange: CollectionAfterChangeHook = async ({ doc, operation, req}) => {
  const data = {
    name: doc?.name,
    cpfCnpj: doc?.cpf,
    email: doc?.email,
    mobilePhone: doc?.phone,
    address: doc?.address?.street,
    postalCode: doc?.address?.cep
  };

  if (operation === 'create') {
    try {
      const response = await sendFinanceRequest('customers', 'POST', data);
      if (response && response.id) {
        await req.payload.update({collection: 'members', id: doc.id, data: {financeId: response.id}})
      }
    } catch(error) {
      console.error(error)
    }
  }

  if (operation === 'update') {
    sendFinanceRequest(`customers/${doc.financeId}`, 'PUT', data);
  }
}

export const useCustomerDelete: CollectionAfterDeleteHook = async ({ doc }) => {
  if(doc.financeId) {
    try {
      const response = await sendFinanceRequest(`customers/${doc.financeId}`, 'DELETE');
      if(response) {
        console.log(response);
      }
      } catch (error) {
        console.error(error);
      }
  }
}