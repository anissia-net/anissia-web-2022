import PageData from "../../../common/PageData";
import ajax from "../../../common/ajax";
import Result from "../../../common/Result";
import {Topic} from "../Topic";
import {BoardInfo} from "../BoardInfo";
import {RecentBoardData} from "../RecentBoardData";

class BoardRemote {
    public getTicker(ticker: string, callback: (data: BoardInfo) => void): void {
        fetch(`/api/board/ticker/${ticker}`).then(e => e.json()).then(data => callback(Object.assign(new BoardInfo(), data)));
    }

    public getTopic(ticker: string, topicNo: number, callback: (topic: any) => void): void {
        fetch(`/api/board/topic/${ticker}/${topicNo}`).then(e => e.json()).then(topic => callback(Topic.assign(topic)));
    }

    public getList(ticker: string, page: number, callback: (list: PageData<Topic>) => void): void {
        fetch(`/api/board/list/${ticker}/${page}`).then(e => e.json()).then(list => callback(PageData.cast(list, e => Topic.assign(e))));
    }

    public getRecentHome(callback: (data: RecentBoardData) => void): void {
        fetch(`/api/board/recent/home`).then(e => e.json()).then(data => callback(RecentBoardData.assign(data)));
    }

    public createTopic(ticker: string, topic: string, content: string, callback: (result: Result<number|null>) => void): void {
        fetch(`/api/board/topic/${ticker}`, { ...ajax.json, ...ajax.post, body: JSON.stringify({ topic, content }) })
            .then(e => e.json()).then(data => callback(Result.assign(data)));
    }

    public updateTopic(topicNo: number, topic: string, content: string, callback: (result: Result<any>) => void): void {
        fetch(`/api/board/topic/${topicNo}`, { ...ajax.json, ...ajax.put, body: JSON.stringify({ topic, content }) })
            .then(e => e.json()).then(data => callback(Result.assign(data)));
    }

    public deleteTopic(topicNo: number, callback: (result: Result<any>) => void): void {
        fetch(`/api/board/topic/${topicNo}`, { ...ajax.json, ...ajax.delete })
            .then(e => e.json()).then(data => callback(Result.assign(data)));
    }

    public createPost(topicNo: number, content: string, callback: (result: Result<any>) => void): void {
        fetch(`/api/board/post/${topicNo}`, { ...ajax.json, ...ajax.post, body: JSON.stringify({ content }) })
            .then(e => e.json()).then(data => callback(Result.assign(data)));
    }

    public updatePost(postNo: number, content: string, callback: (result: Result<any>) => void): void {
        fetch(`/api/board/post/${postNo}`, { ...ajax.json, ...ajax.put, body: JSON.stringify({ content }) })
            .then(e => e.json()).then(data => callback(Result.assign(data)));
    }

    public deletePost(postNo: number, callback: (result: Result<any>) => void): void {
        fetch(`/api/board/post/${postNo}`, { ...ajax.json, ...ajax.delete })
            .then(e => e.json()).then(data => callback(Result.assign(data)));
    }
}

export default new BoardRemote()