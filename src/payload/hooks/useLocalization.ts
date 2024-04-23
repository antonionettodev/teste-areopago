import { CollectionAfterChangeHook } from 'payload/types';
import { getLocalCoordinates } from '../api/localizationApi';

export const useLocalizationConvert: CollectionAfterChangeHook = async({doc, req, context, previousDoc}) => {
  if (context.triggerAfterChange === false || doc.local === previousDoc.local) {
    return;
  }
  try {
    const response = await getLocalCoordinates(doc.local);
    console.log(response)
    if(response?.results[0]?.geometry?.location) {
      const location = response.results[0].geometry.location;
      const locationData = {
        coordinates: [location.lng, location.lat],
        type: 'Point',
      };
      
      await req.payload.update({
        collection: 'events',
        id: doc.id,
        data: { geoLocal: locationData },
        context: {triggerAfterChange: false}
      });
    }
  } catch (error) {
    console.error(error);
  }
}