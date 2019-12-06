<template>
  <v-app>
    <Header title="Application for test"/>
    <v-content>
      <router-view />
    </v-content>
    <NoticeModal />
  </v-app>
</template>

<script>
import Header from "@/components/Header";
import NoticeModal from "@/components/Modals/NoticeModal";

export default {
  name: 'App',

  components: {
    Header,
    NoticeModal,
  },

  data: () => ({
    //
  }),
};
</script>
