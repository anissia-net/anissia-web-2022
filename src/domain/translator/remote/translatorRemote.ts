import Result from "../../../common/Result";
import ajax from "../../../common/ajax";
import PageData from "../../../common/PageData";
import {TranslatorApply} from "../TranslatorApply";
import {TranslatorApplyPoll} from "../TranslatorApplyPoll";

class TranslatorRemote {
    public getApplyList(page: number): Promise<PageData<TranslatorApply>> {
        return fetch(`/api/translator/apply/list/${page}`).then(e => e.json()).then(data => PageData.cast(data, e => Object.assign(new TranslatorApply(), e)));
    }

    public getApply(applyNo: number): Promise<TranslatorApply> {
        return fetch(`/api/translator/apply/${applyNo}`).then(e => e.json()).then(data => {
            const view = Object.assign(new TranslatorApply(), data);
            view.polls = data.polls.map((e: any) => Object.assign(new TranslatorApplyPoll(), e));
            return view;
        });
    }

    public addApply(website: string): Promise<Result<number>> {
        return fetch(`/api/translator/apply`, { ...ajax.post, ...ajax.json, body: JSON.stringify({website}) })
            .then(e => e.json()).then(data => Result.assign(data));
    }

    public addApplyPoll(applyNo: number, point: string, comment: string): Promise<Result<any>> {
        return fetch(`/api/translator/apply/${applyNo}/poll`, { ...ajax.post, ...ajax.json, body: JSON.stringify({point, comment}) })
            .then(e => e.json()).then(data => data);
    }

    public getAdminTranslatorApplyCount(): Promise<number> {
        return fetch(`/api/admin/translator/apply/count`).then(e => e.json()).then(data => data.count);
    }
}


export default new TranslatorRemote();