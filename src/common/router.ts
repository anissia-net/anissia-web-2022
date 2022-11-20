import {createRouter, createWebHistory} from 'vue-router'

import p301 from '../page/301.vue'
import p404 from '../page/404.vue'

import sc2015 from '../page/schedule/2015.vue'
import sc2009 from '../page/schedule/2009.vue'

import siteLayout from '../page/site/layout.vue'
import home from '../page/site/home.vue'
import schedule from '../page/site/schedule.vue'
import anime from '../page/site/anime.vue'
import translatorApply from '../page/site/translatorApply.vue'
import captionRecent from '../page/site/captionRecent.vue'
import introduce from '../page/site/introduce.vue'
import notice from '../page/site/notice.vue'
import inquiry from '../page/site/inquiry.vue'
import login from '../page/site/login.vue'
import register from '../page/site/register.vue'
import recover from '../page/site/recover.vue'
import account from '../page/site/account.vue'

import adminLayout from '../page/admin/layout.vue'
import adminHome from '../page/admin/home.vue'
import adminAnime from '../page/admin/anime.vue'
import adminSchedule from '../page/admin/schedule.vue'
import adminCaption from '../page/admin/caption.vue'

const defaultTitle = import.meta.env.VITE_TITLE;
const trackingId = import.meta.env.VITE_GA_TRACKING_ID;

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve({ left: 0, top: 0 }), 1);
    });
  },
  routes: [
      // schedule
      { path: '/schedule/2015', component: sc2015, meta: { title: '애니편성표' } },
      { path: '/schedule/2009', component: sc2009, meta: { title: '애니편성표 2009' } },
      // basic
      {
        path: '/', component: siteLayout,
        children: [
          { path: '/', component: home },
          { path: '/schedule', component: schedule },
          { path: '/anime', component: anime },
          { path: '/caption/recent', component: captionRecent },
          { path: '/translator/apply', component: translatorApply },
          { path: '/introduce', component: introduce },
          { path: '/notice', component: notice },
          { path: '/inquiry', component: inquiry },
          { path: '/login', component: login },
          { path: '/register/:token', component: register },
          { path: '/register', component: register },
          { path: '/recover', component: recover },
          { path: '/recover/:token', component: recover },
          { path: '/account', component: account },
          {
            path: '/admin', component: adminLayout,
            children: [
              { path: '/admin', component: adminHome },
              { path: '/admin/anime', component: adminAnime },
              { path: '/admin/schedule', component: adminSchedule },
              { path: '/admin/caption', component: adminCaption },
            ]
          },
          { path: '/anitime/:path(.*)', component: p301, meta: { title: '애니시아 - 주소이전' } },
          { path: '/:path(.*)', component: p404, meta: { title: '애니시아 404' } },
        ]
      },
  ],
});

router.afterEach((to, from) => {
  // set title
  // @ts-ignore
  document.title = to.meta.title || defaultTitle;
  const path = to.fullPath.indexOf('#') == -1 ? to.fullPath : to.fullPath.substring(0, to.fullPath.indexOf('#'));

  // sned google analytics
  const gtag = (window as any).gtag;
  gtag('set', 'title', document.title);
  gtag('js', new Date());
  gtag('config', trackingId, {'page_path': path});
});

export default router;
