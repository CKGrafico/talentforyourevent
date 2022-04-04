<script setup>
import { githubLogout } from '#imports';

defineProps({
  user: {
    type: Object,
    required: true
  }
});

const logout = githubLogout;
</script>

<template>
  <div>
    <img :src="user.avatar_url" />
    <p>
      Welcome <strong>{{ user.login }}</strong
      >, nice to meet you!
    </p>
    <button @click="logout">Logout</button>
  </div>
</template>
