import {Entity, model, property} from '@loopback/repository';

@model()
export class AppUserTb extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  LastName: string;

  @property({
    type: 'string',
    required: true,
  })
  Name: string;

  @property({
    type: 'boolean',
    required: true,
  })
  IsMilitar: boolean;

  @property({
    type: 'date',
    required: true,
  })
  TimeCreate: string;

  @property({
    type: 'boolean',
    required: true,
  })
  IsTemporal: boolean;

  @property({
    type: 'string',
    required: true,
  })
  UserName: string;

  @property({
    type: 'string',
    // required: true,
  })
  Password?: string;

  @property({
    type: 'string',
    required: true,
  })
  Email: string;

  @property({
    type: 'string',
    required: true,
  })
  EmailVerified: string;

  @property({
    type: 'string',
  })
  verificationToken?: string;


  constructor(data?: Partial<AppUserTb>) {
    super(data);
  }
}

export interface AppUserTbRelations {
  // describe navigational properties here
}

export type AppUserTbWithRelations = AppUserTb & AppUserTbRelations;
