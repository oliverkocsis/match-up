import { Injectable } from '@angular/core';

@Injectable()
export class LogsProvider {

  public logs: string[] = [];

  constructor() { }

  log(msg: string) {
    this.logs.push(msg);
  }

  get(): string[] {
    return this.logs;
  }
}
