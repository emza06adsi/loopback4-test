import {Entity, model, property, belongsTo} from '@loopback/repository';
import {CountryTb} from './country-tb.model';

@model()
export class ContactInfoTb extends Entity {
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
  Address: string;

  @property({
    type: 'string',
    required: true,
  })
  city: string;

  @property({
    type: 'string',
    required: true,
  })
  Phone: string;

  @property({
    type: 'string',
  })
  CelPhone?: string;

  @property({
    type: 'string',
  })
  EmergencyName?: string;

  @property({
    type: 'string',
  })
  EmergencyPhone?: string;

  @belongsTo(() => CountryTb)
  countryTbId: number;

  constructor(data?: Partial<ContactInfoTb>) {
    super(data);
  }
}

export interface ContactInfoTbRelations {
  // describe navigational properties here
}

export type ContactInfoTbWithRelations = ContactInfoTb & ContactInfoTbRelations;
