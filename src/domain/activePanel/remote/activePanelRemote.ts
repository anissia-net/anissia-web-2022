import PageData from "../../../common/PageData";
import ajax from "../../../common/ajax";
import Result from "../../../common/Result";
import ActivePanelListItem from "../ActivePanelListItem";

class ActivePanelRemote {
    public getList(page: number, mode: string): Promise<PageData<ActivePanelListItem>> {
        return fetch(`/api/active-panel/list/${page}?mode=${mode}`).then(e => e.json())
            .then(data => PageData.cast(data, e => Object.assign(new ActivePanelListItem(), e)));
    }

    public addNotice(query: string): Promise<Result<void>> {
        return fetch(`/api/active-panel/notice`, {...ajax.json, ...ajax.post, body: JSON.stringify({query: query.trim()})})
            .then(e => e.json()).then(data => Result.assign(data));
    }
}

export default new ActivePanelRemote()