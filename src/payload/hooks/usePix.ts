import { CollectionAfterChangeHook } from 'payload/types';
import { getPixKeys, sendFinanceRequest } from '../api/financeApi';
import { formatAsaasDate } from '../utils/formatters';

export const useCreatePixQRCode: CollectionAfterChangeHook = async ({doc, req, operation}) => {
  if(operation === 'create' && doc.type === 'meeting') {
    try {
      const pixResponse = await getPixKeys();
      if (pixResponse?.data?.length === 0) {
        throw new Error('Nenhuma chave Pix encontrada.')
      }
      const pixKey = pixResponse.data[0]?.key;

      const expirationDate = new Date(doc.dateHour);
      expirationDate.setDate(expirationDate.getDate() + 1);
      const formattedDate = formatAsaasDate(expirationDate)

      const requestData = {
        addressKey: pixKey,
        description: `Reunião - #${formattedDate}`,
        format: 'ALL',
        expirationDate: formattedDate,
        expirationSeconds: null,
        allowsMultiplePayments: true
      }

      const response = await sendFinanceRequest('pix/qrCodes/static', 'POST', requestData);
      if (response) {
        const responseData = {
          qrCodeId: response.id,
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
      }
      
    } catch (error) {
      console.error(error)
    }
  };
};

export const useGetTotalRaisedPix: CollectionAfterChangeHook = async({doc, previousDoc, operation, context, req}) => {
  if (context.triggerAfterChange === false) {
    return
  }

  if (operation === 'update' && doc.financeInfo.financeStatus !== previousDoc.financeInfo.financeStatus) {
    try {
      const response = await sendFinanceRequest('payments', 'GET')
      if(response && response.data) {
        const pixPayments = response.data.filter((payment) => payment.pixQrCodeId === doc.financeInfo.qrCodeId);
        const totalRaised = pixPayments.reduce((acc, payment) => acc + payment.value, 0);
        
        await req.payload.update({
          collection: 'events',
          id: doc.id,
          data: {
            financeInfo: {
              ...doc.financeIndo,
              totalRaised: totalRaised,
            },
          },
        });
      }
    } catch(error) {
      console.error(error)
    }
  }
}