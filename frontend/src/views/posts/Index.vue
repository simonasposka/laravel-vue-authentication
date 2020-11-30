<template>
  <div>
    <h3>Posts:</h3>
    <p v-if="error" style="color: red">{{ error }}</p>
    <div v-if="posts" class="posts-wrapper">
      <div v-for="(post, index) in posts" :key="index" class="post">
        <h3>{{ post.title }}</h3>
        <p>{{ post.text }}</p>
      </div>
    </div>
    <p v-else>loading...</p>
  </div>
</template>

<script>

import repository from "@/api/repository";

export default {
  name: 'posts-index',

  data() {
    return {
      posts: null,
      error: null,
    }
  },

  async mounted() {
    try {
      let { data } = await repository.getPosts();
      this.posts = data;
    } catch (error) {
      this.error = error;
    }
  },
};
</script>

<style scoped>
  .posts-wrapper {
    width: 75%;
    margin: 0 auto;
  }

  .post {
    margin-bottom: 25px;
    text-align: left;
  }
</style>

