<script setup>
import { githubLogin } from '#imports';

const login = githubLogin;
const user = await useGithubUser();
// const { t } = VueI18n.useI18n();

useMeta({
  // title: t('message.hello', { msg: '1' })
});

function onClickLogin() {
  login();
}
</script>

<template>
  <div style="padding: 2rem">
    <button class="button button--primary" v-if="!user" @click="onClickLogin">Login with GitHub</button>
  </div>
</template>
