import * as dayjs from "dayjs";

export interface IReclamation {
  id?: number | null;
  message?: string | null;
  observation?: string | null;
  sousTypeReclamation?: ISousTypeReclamation | null;

  situation?: number | null;
  createdDate?: dayjs.Dayjs | null;
  modifiedDate?: dayjs.Dayjs | null;
  createdBy?: string | null;
  modifiedBy?: string | null;
}

export class Reclamation implements IReclamation {
  constructor(
    public id?: number | null,
    public message?: string | null,
    public observation?: string | null,
    sousTypeReclamation?: ISousTypeReclamation | null,

  public image?: string | null,
    public situation?: number | null,
    public createdDate?: dayjs.Dayjs | null,
    public modifiedDate?: dayjs.Dayjs | null,
    public createdBy?: string | null,
    public modifiedBy?: string | null
  ) {
  }
}

export interface ISousTypeReclamation {
  id?: number;
  libFr?: string | null;
  TypeReclamation?: ITypeReclamation | null;

}

export class SousTypeReclamation implements ISousTypeReclamation {
  constructor(
    public id?: number,
    public libFr?: string | null,
    public TypeReclamation?: ITypeReclamation | null,

  ) {
  }
}

export interface ITypeReclamation {
  id?: number;
  libFr?: string | null;

}

export class TypeReclamation implements ITypeReclamation {
  constructor(
    public id?: number,
    public libFr?: string | null,

  ) {
  }
}
