<template>

  <div class="container m-auto px-4 duration-300">

    <div class="flex w-full justify-between rounded-md shadow-sm mt-1">
      <router-link to="/admin/caption" class="text-center flex-1 rounded-l-lg p-4 text-sm border border-gray-200 dark:border-zinc-700 dark:bg-zinc-900" :class="state === 1 ? 'bg-white text-blue-700 dark:text-gray-300' : 'bg-gray-50 text-gray-500 dark:grayscale-[50%] dark:text-neutral-500 dark:bg-opacity-50'">
        방영중
      </router-link>
      <router-link to="/admin/caption?state=0" class="text-center flex-1 rounded-r-lg p-4 text-sm border border-gray-200 dark:border-zinc-700 dark:bg-zinc-900" :class="state === 0 ? 'bg-white text-blue-700 dark:text-gray-300' : 'bg-gray-50 text-gray-500 dark:grayscale-[50%] dark:text-neutral-500 dark:bg-opacity-50'">
        완료
      </router-link>
    </div>

    <div class="mt-5">
      <div class="mt-3 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div v-for="node in list.content" class="p-4 bg-white rounded-md border border-zinc-300 dark:bg-zinc-900/50 dark:border-zinc-700 shadow-sm">
          <div class="anissia-node-hover-view-del text-lg pt-1 px-1">
            {{node.subject}}
            <i @click="doDelete(node)" class="fa-solid inline-block p-[3px] ml-1 fa-xmark hover:text-red-500 cursor-pointer opacity-50"></i>
          </div>
          <div class="mt-4 flex">
            <input type="button" value="◀" @click="moveEpisode(node, false)" class="w-[60px] mr-2 text-gray-700 dark:text-white bg-zinc-100 hover:bg-zinc-200 outline-none font-medium rounded-md text-sm py-2.5 text-center dark:bg-zinc-700 dark:hover:bg-zinc-600" />
            <input type="number" name="episode" v-model="node.episode" class="text-center outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:border-blue-600 block w-full p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-zinc-300">
            <input type="button" value="▶" @click="moveEpisode(node, true)" class="w-[60px] ml-2 text-gray-700 dark:text-white bg-zinc-100 hover:bg-zinc-200 outline-none font-medium rounded-md text-sm py-2.5 text-center dark:bg-zinc-700 dark:hover:bg-zinc-600" />
          </div>
          <div class="mt-4 flex">
            <input type="datetime-local" v-model="node.updDt" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}" class="text-center outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:border-blue-600 block w-full p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-zinc-300" />
            <input type="button" value="현재" @click="setNow(node)" class="w-[60px] ml-2 text-gray-700 dark:text-white bg-zinc-100 hover:bg-zinc-200 outline-none font-medium rounded-md text-sm py-2.5 text-center dark:bg-zinc-700 dark:hover:bg-zinc-600" />
          </div>
          <div class="mt-4 flex">
            <input type="text" name="website" v-model="node.website" placeholder="https://example.com" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:border-blue-600 block w-full p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-zinc-300">
            <input type="button" value="저장" @click="doSave(node)" class="w-[60px] ml-2 text-blue-800 dark:text-white bg-blue-200 hover:bg-blue-300 outline-none font-medium rounded-md text-sm py-2.5 text-center dark:bg-gray-700 dark:hover:bg-gray-800" />
          </div>

        </div>
      </div>
      <div v-if="list.content.length == 0">
        <div class="text-center text-xl mt-32">진행중인 자막이 없습니다.</div>
      </div>
    </div>

  </div>

</template>

<script setup lang="ts">
import {nextTick, onMounted, Ref, ref} from "vue";
import scrollLoader from "../../common/ScrollLoader";
import PageData from "../../common/PageData";
import animeRemote from "../../domain/anime/remote/animeRemote";
import AnimeCaption from "../../domain/anime/AnimeCaption";
import {onBeforeRouteUpdate} from "vue-router";
import {Locate} from "../../common/Locate";
import anissia from "../../common/anissia";

const page = ref(0);
const state = ref(0);
const sl = scrollLoader();
const list = ref(PageData.empty()) as Ref<PageData<AnimeCaption>>;

function clear(locate: Locate) {
  state.value = locate.getParameter('state', '1') == '0' ? 0 : 1;
  page.value = 0;
}

function load() {
  const isFirstPage = page.value == 0;

  animeRemote.getAdminCaptionList(state.value, page.value, pageData => {
    if (isFirstPage) {
      list.value = pageData;
    } else {
      list.value = list.value.merge(pageData);
    }
    if (!pageData.last) {
      nextTick(() => sl.next())
    }
  });
}

function moveEpisode(caption: AnimeCaption, isUp: boolean) {
  const episode = Number(caption.episode);
  if (isUp) {
    caption.episode = ((isNaN(episode) ? 0 : Math.floor(episode)) + 1).toString();
  } else {
    caption.episode = Math.max(0, (isNaN(episode) ? 1 : Math.ceil(episode)) - 1).toString();
  }
}

function setNow(caption: AnimeCaption) {
  caption.updDt = anissia.dateFormat(new Date(), "yyyy-MM-ddTHH:mm");
}

function doSave(caption: AnimeCaption) {
  animeRemote.updateAdminCaption(caption, result => alert(result.msg));
}

function doDelete(caption: AnimeCaption) {
  if (confirm("자막을 종료하시겠습니까?")) {
    animeRemote.deleteAdminCaption(caption.animeNo, result => {
      result.st == "OK" ? load() : alert(result.msg);
    });
  }
}

clear(new Locate());
sl.callback(() => {
  page.value++;
  load();
});
load();

onBeforeRouteUpdate((to, from, next) => {
  clear(new Locate(to.fullPath));
  next();
  load();
})

</script>

<style scoped>
.anissia-node-hover-view-del:not(:hover) i { display: none }
</style>