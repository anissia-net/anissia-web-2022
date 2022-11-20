export default class Session {
  public static assign(obj: any): Session {
    return obj !== null ? Object.assign(new Session(), obj) : new Session();
  }

  public name = '';
  public roles = [] as string[];

  public get isLogin() {
    return this.name != '';
  }

  public get isRoot() {
    return this.hasRole('ROOT');
  }

  public get isAdmin() {
    return this.hasRole('ROOT', 'TRANSLATOR');
  }

  public hasRole(...roles: string[]) {
    if (roles.length == 0) {
      return true;
    }
    for (let i = 0 ; i < roles.length ; i++) {
      if (this.roles.indexOf(roles[i]) != -1) {
        return true;
      }
    }
    return false;
  }
}
