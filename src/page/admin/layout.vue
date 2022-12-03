<template>

  <div class="container m-auto px-4 duration-300 py-2 md:py-4">
    <div class="flex justify-between space-x-2 sm:space-x-3 md:space-x-4">
      <router-link to="/admin" class="grow w-1 block max-w-sm p-6 bg-white border border-zinc-200 rounded-md shadow-sm hover:bg-blue-50 dark:bg-zinc-900/60 dark:border-zinc-800/70 dark:hover:bg-zinc-900 text-center">
        <div :class="url('/admin', true) ? 'grayscale-[40%]' : 'grayscale-[100%] opacity-50'">
          <img src="./layout/tab-panel.svg" class="w-5/6 md:w-1/3 inline-block md:mt-2"/>
          <h5 class="mt-5 hidden md:block text-lg font-semibold tracking-tight text-zinc-900 dark:text-gray-300">관리패널</h5>
        </div>
      </router-link>
      <router-link to="/admin/anime" class="grow w-1 block max-w-sm p-6 bg-white border border-zinc-200 rounded-md shadow-sm hover:bg-blue-50 dark:bg-zinc-900/60 dark:border-zinc-800/70 dark:hover:bg-zinc-900 text-center">
        <div :class="url('/admin/anime') ? 'grayscale-[40%]' : 'grayscale-[100%] opacity-50'">
          <img src="./layout/tab-anime.svg" class="w-5/6 md:w-1/3 inline-block md:mt-2"/>
          <h5 class="mt-5 hidden md:block text-lg font-semibold tracking-tight text-zinc-900 dark:text-gray-300">애니메이션</h5>
        </div>
      </router-link>
      <router-link to="/admin/schedule" class="grow w-1 block max-w-sm p-6 bg-white border border-zinc-200 rounded-md shadow-sm hover:bg-blue-50 dark:bg-zinc-900/60 dark:border-zinc-800/70 dark:hover:bg-zinc-900 text-center">
        <div :class="url('/admin/schedule') ? 'grayscale-[40%]' : 'grayscale-[100%] opacity-50'">
          <img src="./layout/tab-schedule.svg" class="w-5/6 md:w-1/3 inline-block md:mt-2"/>
          <h5 class="mt-5 hidden md:block text-lg font-semibold tracking-tight text-zinc-900 dark:text-gray-300">편성표</h5>
        </div>
      </router-link>
      <router-link to="/admin/caption" class="grow w-1 block max-w-sm p-6 bg-white border border-zinc-200 rounded-md shadow-sm hover:bg-blue-50 dark:bg-zinc-900/60 dark:border-zinc-800/70 dark:hover:bg-zinc-900 text-center">
        <div :class="url('/admin/caption') ? 'grayscale-[40%]' : 'grayscale-[100%] opacity-50'">
          <img src="./layout/tab-caption.svg" class="w-5/6 md:w-1/3 inline-block md:mt-2"/>
          <h5 class="mt-5 hidden md:block text-lg font-semibold tracking-tight text-zinc-900 dark:text-gray-300">자막</h5>
        </div>
      </router-link>
    </div>
  </div>
  <div>
    <router-view />
  </div>

</template>

<script setup lang="ts">
import anissia from "../../common/anissia";

const url = anissia.url
</script>
