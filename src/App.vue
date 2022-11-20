<template>
  <router-view/>
</template>

<script setup lang="ts">
import theme from "./common/theme";
import sessionService from "./domain/session/remote/sessionService";
import {onBeforeMount} from "vue";
import {useRoute, useRouter} from "vue-router";

const route = useRoute();
const router = useRouter();

theme.apply()

onBeforeMount(() => {
  sessionService.sync((isLogin) => {
    if (isLogin) {
      sessionService.amendPathBySession(route.path, router);
    } else {
      sessionService.tokenLogin(() => sessionService.amendPathBySession(route.path, router));
    }
  });
  setInterval(() => { sessionService.sync(); }, 5 * 60000);
});
</script>
