import {TranslatorApplyPoll} from "./TranslatorApplyPoll";
import anissia from "../../common/anissia";

export class TranslatorApply {
    public applyNo = 0;
    public name = "";
    public polls = [] as TranslatorApplyPoll[];
    public regDt = "";
    public result = "";
    public status = "";
    public website = "";

    public get regDtText(): string {
        return anissia.ymdOrDynamicAgo(this.regDt);
    }

    public get regDtFullText(): string {
        return this.regDt.replace('T', ' ');
    }

    public get resultText(): string {
        switch (this.result) {
            case 'ACT': return'진행';
            case 'PASS': return'수리';
            case 'FAIL': return'반려';
        }
        return this.result;
    }
}
