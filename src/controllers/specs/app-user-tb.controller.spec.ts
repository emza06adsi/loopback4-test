export const CredentialsSchema = {
  type: 'objet',
  // required: ['Email', 'Password'],
  properties: {
    Email: {
      type: 'string',
      format: 'Email'
    },
    Password: {
      type: 'string',
      minLength: 8
    },
  },
};


export const CredentialRequestBody = {

  description: 'The input of login function',
  required: true,
  content: {
    'application/json': {
      schema: {
        type: 'object',
        required: ['Email', 'Password'],
        properties: {
          Email: {
            type: 'string',
            // format: 'Email'
          },
          Password: {
            type: 'string',
            minLength: 8
          },
        }
      }
    }

  }

  // description: ' The input of login function',
  // required: true,
  // content: {
  //   'application/json': {schema: CredentialsSchema}
  // },
};
