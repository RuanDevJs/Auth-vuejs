<template>
  <p v-if="state.loadingUser">Carregando</p>
  <header class="header" v-else>
      <div class="header-container">
          <div class="title">
              <h1> {{ state.user.username }}</h1>
          </div>
          <div class="sign-out">
              <button @click="handleClick"> Sair </button>
          </div>
      </div>
  </header>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity';
import { useStore } from 'vuex'
import { onMounted } from '@vue/runtime-core';

export default {
    name: "Authenticated",
    setup(){
        const {  dispatch, state } = useStore();

        const methods = reactive({
           handleClick(){
            dispatch('signOut');
            this.$router.push("/");
           }
        });

        onMounted(() => {
            dispatch('getUserById');
        });

        return { state, ...toRefs(methods) }
    }
}
</script>

<style scoped>
    h1 {
        text-align: center;

        font-size: 24px;
        color: #333;
    }

    button {
        display: flex;
        justify-content: center;

        width: 220px;
        margin: 8px auto;
        padding: 12px;

        outline: 0;
        border: 0;
        background: rgb(238, 51, 66);
        border-radius: 4px;
        cursor: pointer;

        font-family: 'Poppins', sans-serif;
        font-size: 16px;
        font-weight: 500;
        color: #f9f9f9;
    }

    .header {
        padding: 16px;
        border-bottom: 1px solid #c9c9c9;
    }
    
    .header-container {
        max-width: 960px;
        margin: 0 auto;

        display: flex;
        flex-wrap: wrap;
        align-content: center;
        align-items: center;
        justify-content: space-between;

    }
</style>