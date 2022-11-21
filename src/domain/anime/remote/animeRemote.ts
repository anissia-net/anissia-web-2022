import AnimeCaption from "../AnimeCaption";
import PageData from "../../../common/PageData";
import AnimeAutocorrect from "../AnimeAutocorrect";
import Anime from "../Anime";
import ajax from "../../../common/ajax";
import Result from "../../../common/Result";
import {AnimeRankItem} from "../../rank/AnimeRankItem";

class AnimeRemote {
    private cacheAutocorrect: any = {};
    private genres: string[] = [];

    public getScheduleAnimeList(week: number|string, callback: (list: Anime[]) => void) {
        fetch(`/api/anime/schedule/${week}`)
            .then(e => e.json())
            .then(list => callback(list.map((e: any) => Object.assign(new Anime(), e))));
    }

    public getAnimeCaptionList(animeNo: string|number, callback: (list: AnimeCaption[]) => void) {
        fetch(`/api/anime/caption/animeNo/${animeNo}`)
            .then(e => e.json())
            .then(list => callback(list.map((e: any) => Object.assign(new AnimeCaption(), e))));
    }

    public getAnimeList(page: number, query: string, callback: (page: PageData<Anime>) => void) {
        fetch(`/api/anime/list/${page}?q=${encodeURIComponent(query)}`)
            .then(e => e.json())
            .then(data => callback(PageData.cast(data, (e: any) => Object.assign(new Anime(), e))));
    }

    public getAnime(animeNo: number, callback: (anime: Anime) => void) {
        fetch(`/api/anime/animeNo/${animeNo}`).then(e => e.json()).then(anime => {
            const node = Object.assign(new Anime(), anime);
            node.captions = anime.captions.map((caption: any) => Object.assign(new AnimeCaption(), caption));
            callback(node);
        });
    }

    public getAnimeListAutocorrect(query: string, callback: (list: AnimeAutocorrect[]) => void): void {
        if (query.trim() != '') {
            const cache = this.cacheAutocorrect[query];
            if (cache) {
                callback(cache);
            } else {
                fetch(`/api/anime/autocorrect?q=${encodeURIComponent(query)}`)
                    .then(e => e.json())
                    .then(list => {
                        const rv: AnimeAutocorrect[] = list.map((e: string) => new AnimeAutocorrect(query, e));
                        rv.sort((a, b) => a.lo.localeCompare(b.lo));
                        callback(rv);
                    });
            }
        } else {
            callback([]);
        }
    }

    public getAdminScheduleAnimeList(week: number, callback: (list: Anime[]) => void): void {
        fetch(`/api/admin/schedule/${week}`).then(e => e.json())
            .then(list => callback(list.map((e: any) => Object.assign(new Anime(), e))));
    }

    public getAdminCaptionList(state: number, page: number, callback: (data: PageData<any>) => void): void {
        fetch(`/api/admin/caption/list/${state}/${page}`)
            .then(e => e.json()).then(data => callback(PageData.cast(data, e => Object.assign(new AnimeCaption(), e))));
    }

    public deleteAdminCaption(animeNo: number, callback: (result: Result<any>) => void): void {
        fetch(`/api/admin/caption/${animeNo}`, { ...ajax.delete, ...ajax.json })
            .then(e => e.json()).then(data => callback(Result.assign(data)));
    }

    public updateAdminCaption(caption: AnimeCaption, callback: (result: Result<any>) => void): void {
        fetch(`/api/admin/caption/${caption.animeNo}`, { ...ajax.put, ...ajax.json, body: JSON.stringify(caption) })
            .then(e => e.json()).then(data => callback(Result.assign(data)));
    }

    public getAdminAnimeList(query: string, page: number, callback: (data: PageData<Anime>) => void): void {
        fetch(`/api/admin/anime/list/${page}?q=${encodeURIComponent(query)}`).then(e => e.json()).then(data => callback(PageData.cast(data, (e: any) => Object.assign(new Anime(), e))));
    }

    public getAdminAnimeDelist(callback: (data: PageData<Anime>) => void): void {
        fetch(`/api/admin/anime/delist`).then(e => e.json()).then(data => callback(PageData.cast(data, (e: any) => Object.assign(new Anime(), e))));
    }

    public addAdminCaption(animeNo: number, callback: (result: Result<any>) => void): void {
        fetch(`/api/admin/caption/${animeNo}`, { ...ajax.post, ...ajax.json })
            .then(e => e.json()).then(data => callback(Result.assign(data)));
    }

    public addAdminAnime(anime: Anime, callback: (result: Result<any>) => void): void {
        fetch(`/api/admin/anime`, { ...ajax.post, ...ajax.json, body: JSON.stringify(anime) })
            .then(e => e.json()).then(data => callback(Result.assign(data)));
    }

    public updateAdminAnime(anime: Anime, callback: (result: Result<any>) => void): void {
        fetch(`/api/admin/anime/${anime.animeNo}`, { ...ajax.put, ...ajax.json, body: JSON.stringify(anime) })
            .then(e => e.json()).then(data => callback(Result.assign(data)));
    }

    public deleteAdminAnime(animeNo: number, callback: (result: Result<any>) => void): void {
        fetch(`/api/admin/anime/${animeNo}`, { ...ajax.delete, ...ajax.json })
            .then(e => e.json()).then(data => callback(Result.assign(data)));
    }

    public recoverAdminAnime(agendaNo: number, callback: (result: Result<any>) => void): void {
        fetch(`/api/admin/anime/recover/${agendaNo}`, { ...ajax.post, ...ajax.json })
            .then(e => e.json()).then(data => callback(Result.assign(data)));
    }

    public getCaptionRecent(callback: (data: AnimeCaption[]) => void): void {
        fetch(`/api/anime/caption/recent`).then(e => e.json()).then(list => callback(list.map((e: any) => Object.assign(new AnimeCaption(), e))));
    }

    public getCaptionRecentPage(page: number, callback: (data: PageData<AnimeCaption>) => void): void {
        fetch(`/api/anime/caption/recent/${page}`).then(e => e.json()).then(list => callback(PageData.cast(list, e => Object.assign(new AnimeCaption(), e))));
    }

    public getGenres(callback: (genres: string[]) => void): void {
        if (this.genres.length) {
            callback(this.genres);
        } else {
            fetch(`/api/anime/genres`).then(e => e.json()).then(genres => callback((this.genres = genres)));
        }
    }

    public getRank(type: string, callback: (list: AnimeRankItem[]) => void): void {
        fetch(`/api/anime/rank/${type}`).then(e => e.json()).then(list => {
            for (let i = list.length - 1 ; i >= 1 ; i--) {
                if (list[i - 1].rank === list[i].rank) {
                    list[i].rank = '-';
                }
            }
            if (list.length < 30) {
                list = list.concat([...new Array(30).keys()].map(e => ({animeNo: 0, rank: e+1})).slice(list.length));
            }
            callback(list.map((e: any) => Object.assign(new AnimeRankItem(), e)));
        });
    }
}

export default new AnimeRemote()