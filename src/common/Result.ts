import PageData from "./PageData";

export default class Result<T> {
  constructor(st= '', msg = '', data: T | null = null) {
    this.st = st;
    this.msg = msg;
    this.data = data;
  }

  public st: string;
  public msg: string;
  public data: T | null;

  public get success(): boolean {
    return this.st == 'OK';
  }

  public get msgNotNull(): string {
    return this.msg || '알수없는 오류입니다.\n잠시 후 다시 시도해주세요.';
  }

  public static assign<T>(obj: any): Result<T> {
    return Object.assign(new Result<T>(), obj);
  }

  public static assignPage<T>(obj: any): Result<PageData<T>> {
    return Object.assign(new Result<PageData<T>>(), obj);
  }
}
