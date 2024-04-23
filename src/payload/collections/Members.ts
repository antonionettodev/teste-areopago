import { CollectionConfig } from 'payload/types';
import { validateCEP, validateCIM, validateCPF, validatePhone } from '../utils/validators';
import { formatCEP, formatCPF, formatPhone, removePunctuationMarks } from '../utils/formatters';
import { useCustomerChange, useCustomerDelete } from '../hooks/useCustomer';

const Members: CollectionConfig = {
  slug: 'members',
  admin: {
    useAsTitle: 'name',
  },
  auth: {
    tokenExpiration: 28800,
    verify: true,
    lockTime: 1000 * 3600,
    maxLoginAttempts: 5,
  },
  hooks: {
    afterChange: [
      useCustomerChange
    ],

    afterDelete: [
      useCustomerDelete,
    ]
  },
  fields: [
    {
      name: 'cim',
      label: 'CIM',
      type: 'text',
      unique: true,
      required: true,
      index: true,
      maxLength: 8,
      admin: {
        placeholder: 'Carteira de Identidade Maçônica',
      },
      validate: (val) => validateCIM(val),
      hooks: {
        beforeChange: [
          ({value}) => value ? removePunctuationMarks(value) : value,
        ]
      }
    },
    {
      name: 'name',
      label: 'Nome',
      type: 'text',
      required: true,
      index: true,
      maxLength: 256,
      admin: {
        placeholder: 'Nome do Membro',
      },
    },
    {
      name: 'financeId',
      type: 'text',
      unique: true,
      admin: {
        readOnly: true,
      }
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
      admin: {
        placeholder: 'Email do Membro',
      },
    },
    {
      name: 'masonicDegree',
      label: 'Grau Maçônico',
      type: 'number',
      index: true,
      required: true,
      max: 3,
      min: 1,
      defaultValue: 1,
      admin: {
        placeholder: 'Grau Maçônico do Membro',
      },
    },
    {
      name: 'role',
      label: 'Cargo',
      type: 'relationship',
      relationTo: 'roles',
      index: true,
    },
    {
      name: 'birthday',
      label: 'Data de Nascimento',
      type: 'date',
      admin: {
        placeholder: 'Data de Nascimento do Membro',
        date: {
          displayFormat: 'dd/MM/yyyy',
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'cpf',
      label: 'CPF',
      type: 'text',
      unique: true,
      minLength: 11,
      admin: {
        placeholder: 'CPF do Membro',
      },
      validate: (val) => validateCPF(val),
      hooks: {
        beforeChange: [
          ({value}) => value ? removePunctuationMarks(value) : value,
        ],

        afterRead: [
          ({value}) => value ? formatCPF(value) : value,
        ]
      },
    },
    {
      name: 'phone',
      label: 'Telefone',
      type: 'text',
      unique: true,
      minLength: 10,
      admin: {
        placeholder: 'Telefone do Membro',
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
    {
      name: 'relatives',
      label: 'Familiares',
      type: 'relationship',
      relationTo: 'relatives',
      hasMany: true,
    },
    {
      name: 'address',
      label: 'Endereço',
      type: 'group',
      fields: [
        {
          name: 'street',
          label: 'Logradouro',
          type: 'text',
          maxLength: 512,
          admin: {
            placeholder: 'Endereço do Membro',
          },
        },
        {
          name: 'cep',
          label: 'CEP',
          type: 'text',
          minLength: 8,
          admin: {
            placeholder: 'CEP do Membro',
          },
          validate: (val) => validateCEP(val),
          hooks: {
            beforeChange: [
              ({value}) => value ? removePunctuationMarks(value) : value,
            ],

            afterRead: [
              ({value}) => value ? formatCEP(value) : value,
            ],
          }, 
        },
      ],
    },
    {
      name: 'status',
      label: 'Membro Ativo',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'profilePhoto',
      label: 'Foto de Perfil',
      type: 'upload',
      relationTo: 'media',
    },
  ],
};

export default Members;