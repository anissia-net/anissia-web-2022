import anissia from "../../common/anissia";

export class TranslatorApplyPoll {
    public comment = "";
    public name = "";
    public no = 0;
    public regDt = "";
    public vote = 0;

    public get regDtText(): string {
        return anissia.ymdOrDynamicAgo(this.regDt);
    }
}
