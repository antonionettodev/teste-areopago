import { CollectionAfterChangeHook } from 'payload/types';
import { getPixKeys, sendFinanceRequest } from '../api/financeApi';

export const useCreatePixQRCode: CollectionAfterChangeHook = async ({doc, req, operation}) => {
  if(operation === 'create') {
    try {
      const pixResponse = await getPixKeys();
      if (pixResponse?.data?.length === 0) {
        throw new Error('Nenhuma chave Pix encontrada.')
      }
      const pixKey = pixResponse.data[0]?.key;

      const expirationDate = new Date(doc.dateHour);
      expirationDate.setDate(expirationDate.getDate() + 1);

      const requestData = {
        addressKey: pixKey,
        description: doc.title,
        format: 'ALL',
        expirationDate: expirationDate,
        expirationSeconds: null,
        allowsMultiplePayments: true
      }

      const response = await sendFinanceRequest('/pix/qrCodes/static', 'POST', requestData);
      if (response) {
        const responseData = {
          qrCodeImage: response.encodedImage,
          qrCodePayload: response.payload
        }

        await req.payload.update({
          collection: 'events',
          id: doc.id,
          data: {
            financeInfo: responseData,
          }
        })

        console.log(response);
      }
      
    } catch (error) {
      console.error(error)
    }
  };
};