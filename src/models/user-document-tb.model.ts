import {Entity, model, property, belongsTo} from '@loopback/repository';
import {TypeDocumentTb} from './type-document-tb.model';
import {AppUserTb} from './app-user-tb.model';

@model()
export class UserDocumentTb extends Entity {
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
  Document: string;

  @property({
    type: 'string',
    required: true,
  })
  PlaceExpedition: string;

  @property({
    type: 'date',
    required: true,
  })
  DateExpedition: string;

  @belongsTo(() => TypeDocumentTb)
  typeDocumentTbId: number;

  @belongsTo(() => AppUserTb)
  appUserTbId: number;

  constructor(data?: Partial<UserDocumentTb>) {
    super(data);
  }
}

export interface UserDocumentTbRelations {
  // describe navigational properties here
}

export type UserDocumentTbWithRelations = UserDocumentTb & UserDocumentTbRelations;
