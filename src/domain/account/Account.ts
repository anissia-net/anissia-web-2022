import anissia from "../../common/anissia";

export class Account {
    public email = ""
    public name = "";
    public regDt = "";
    public roles = [] as string[];

    public get rolesText(): string[] {
        if (this.roles.length == 0) {
            return ['μΌλ°νμ'];
        }
        return this.roles;
    }

    public get regDtText(): string {
        return anissia.ymdOrDynamicAgo(this.regDt);
    }
}