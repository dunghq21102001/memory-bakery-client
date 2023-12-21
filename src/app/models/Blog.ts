export interface IBlog {
  _id: string,
  Title: string,
  CreateDate: any,
  Writer: string,
  Content: string,
  Image: Array<string>,
  Outstanding: boolean
}

export class Blog {
  constructor(
      public _id: string = '',
      public Title: string = '',
      public CreateDate: any = '',
      public Writer: string = '',
      public Content: string = '',
      public Image: Array<string> = [],
      public Outstanding: boolean = false
  ) { }
}
