import { CollectionConfig } from "payload/types";
import errorMessages from "../utils/errorMessages";
import { useLocalizationConvert } from "../hooks/useLocalization";
import { useCreatePixQRCode } from "../hooks/usePix";

const Events: CollectionConfig = {
  slug: 'events',
  hooks: {
    afterChange: [
      useLocalizationConvert,
      useCreatePixQRCode
    ],
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      label: 'Título',
      type: 'text',
      index: true,
      required: true,
      maxLength: 128,
      admin: {
        placeholder: 'Título do Evento',
      },
    },
    {
      name: 'description',
      label: 'Descrição',
      type: 'textarea',
      maxLength: 512,
      admin: {
        placeholder: 'Descrição do Evento',
      },
    },
    {
      name: 'dateHour',
      label: 'Data e Hora',
      type: 'date',
      index: true,
      required: true,
      admin: {
        placeholder: 'Data e Hora do Evento',
        date: {
          displayFormat: 'dd/MM/yyyy - hh:mm',
          pickerAppearance: 'dayAndTime',
        },
      },
      validate: (value) => {
        const now = new Date();
        const eventDate = new Date(value);

        if (eventDate < now) {
          return errorMessages.INVALID_EVENT_DATE;
        }
        return true;
      },
    },
    {
      name: 'local',
      type: 'text',
      required: true,
      maxLength: 256,
      admin: {
        placeholder: 'Endereço do Evento',
      }
    },
    {
      name: 'geoLocal',
      type: 'point',
      admin: {
        disabled: true,
      }
    },
    {
      name: 'masonicDegree',
      label: 'Grau Maçônico',
      type: 'number',
      index: true,
      required: true,
      min: 1,
      max: 3,
      defaultValue: 1,
      admin: {
        placeholder: 'Grau Maçônico do Evento',
      },
    },
    {
      name: 'type',
      label: 'Tipo do Evento',
      type: 'select',
      required: true,
      index: true,
      defaultValue: 'event',
      options: [
        {
          label: 'Evento',
          value: 'event',
        },
        {
          label: 'Reunião',
          value: 'meeting',
        },
        {
          label: 'Confraternização',
          value: 'confraternization',
        },
        {
          label: 'Aniversário',
          value: 'birthday',
        },
        {
          label: 'Outros',
          value: 'others',
        },
      ]
    },
    {
      name: 'status',
      label: 'Status do Evento',
      type: 'select',
      required: true,
      index: true,
      defaultValue: 'scheduled',
      options: [
        {
          label: 'Agendado',
          value: 'scheduled',
        },
        {
          label: 'Em Andamento',
          value: 'on_progress',
        },
        {
          label: 'Encerrado',
          value: 'finished',
        },
        {
          label: 'Cancelado',
          value: 'canceled',
        }
      ]
    },
    {
      name: 'presences',
      label: 'Presenças',
      type: 'relationship',
      relationTo: 'members',
      hasMany: true,
    },
    {
      name: 'tags',
      label: 'Tags do Evento',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
    },
    {
      name: 'financeInfo',
      label: 'Informações Financeiras do Evento',
      type: 'group',
      unique: true,
      admin: {
        readOnly: true,
        condition: (data) => {
          if (data.type === 'meeting') {
            return true;
          } else {
            return false;
          }
        }
      },
      fields: [
        {
          name: 'qrCodeImage',
          label: 'Imagem do QR Code',
          type: 'text',
        },
        {
          name: 'qrCodePayload',
          label: 'Payload do QR Code',
          type: 'text',
        },
      ]
    }
  ],
}

export default Events;