import { CollectionConfig } from 'payload/types';

const Roles: CollectionConfig = {
  slug: 'roles',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      label: 'Título',
      type: 'text',
      maxLength: 64,
      required: true,
      unique: true,
      admin: {
        placeholder: 'Título do Cargo',
      },
    },
    {
      name: 'permissions',
      label: 'Permissões',
      type: 'group',
      fields: [
        {
          name: 'members',
          label: 'Membros',
          type: 'group',
          fields: [
            {
              name: 'createMembers',
              label: 'Adicionar Membros',
              type: 'checkbox',
              defaultValue: false,
            },
            {
              name: 'getMembers',
              label: 'Visualizar Membros',
              type: 'checkbox',
              defaultValue: true,
            },
            {
              name: 'updateMembers',
              label: 'Atualizar Informações de Membros',
              type: 'checkbox',
              defaultValue: false,
            },
            {
              name: 'deleteMembers',
              label: 'Deletar Membros',
              type: 'checkbox',
              defaultValue: false,
            },
          ],
        },
        {
          name: 'relatives',
          label: 'Familiares',
          type: 'group',
          fields: [
            {
              name: 'createRelatives',
              label: 'Adicionar Familiares',
              type: 'checkbox',
              defaultValue: false,
            },
            {
              name: 'getRelatives',
              label: 'Visualizar Familiares',
              type: 'checkbox',
              defaultValue: true,
            },
            {
              name: 'updateRelatives',
              label: 'Atualizar Familiares',
              type: 'checkbox',
              defaultValue: false,
            },
            {
              name: 'deleteRelatives',
              label: 'Deletar Familiares',
              type: 'checkbox',
              defaultValue: false,
            }
          ],
        },
        {
          name: 'events',
          label: 'Eventos',
          type: 'group',
          fields: [
            {
              name: 'createEvents',
              label: 'Criar Eventos',
              type: 'checkbox',
              defaultValue: false,
            },
            {
              name: 'getEvents',
              label: 'Visualizar Eventos',
              type: 'checkbox',
              defaultValue: true,
            },
            {
              name: 'updateEvents',
              label: 'Atualizar Eventos',
              type: 'checkbox',
              defaultValue: false,
            },
            {
              name: 'deleteEvents',
              label: 'Deletar Eventos',
              type: 'checkbox',
              defaultValue: false,
            },
          ],
        },
      ],
    },
  ],
}

export default Roles