import { CollectionConfig } from 'payload/types';
import { formatPhone, removePunctuationMarks } from '../utils/formatters';
import { validatePhone } from '../utils/validators';

const Relatives: CollectionConfig = {
  slug: 'relatives',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      admin: {
        placeholder: 'Nome do Familiar',
      },
      required: true,
      maxLength: 256,
    },
    {
      name: 'relationship',
      label: 'Grau de Parentesco',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Pai',
          value: 'pai',
        },
        {
          label: 'Mãe',
          value: 'mãe',
        },
        {
          label: 'Avô',
          value: 'avô',
        },
        {
          label: 'Avó',
          value: 'avó',
        },
        {
          label: 'Irmão',
          value: 'irmão',
        },
        {
          label: 'Irmã',
          value: 'irmã',
        },
        {
          label: 'Filho',
          value: 'filho',
        },
        {
          label: 'Filha',
          value: 'filha',
        },
        {
          label: 'Esposa',
          value: 'esposa',
        },
        {
          label: 'Tio',
          value: 'tio'
        },
        {
          label: 'Tia',
          value: 'tia'
        },
        {
          label: 'Primo',
          value: 'primo',
        },
        {
          label: 'Prima',
          value: 'prima',
        },
      ],
    },
    {
      name: 'email',
      type: 'email',
      unique: true,
      admin: {
        placeholder: 'Email do Familiar',
      },
    },
    {
      name: 'phone',
      label: 'Telefone',
      type: 'text',
      unique: true,
      minLength: 10,
      admin: {
        placeholder: 'Telefone do Familiar',
      },
      validate: (val) => validatePhone(val),
      hooks: {
        beforeChange: [
          ({value}) => value ? removePunctuationMarks(value) : value,
        ],

        afterRead: [
          ({value}) => value ? formatPhone(value) : value,
        ]
      },
    },
  ],
};

export default Relatives;