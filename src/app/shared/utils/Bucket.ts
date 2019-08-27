export interface FORM_DATA {
  controlName   : string;
  controlValue  : string;
}

export class Bucket<T> {

  private bucketContent: Array<T>;

  constructor(){
    this.bucketContent = [];
  }

  public append(item: T): number{
    if (this.has(item)){
      return -1;
    }
    return this.bucketContent.push(item);
  }

  public has(item: T): boolean {
    this.bucketContent
    return true;
  }
}
