<template>
  <section class="modal">
      <div class="modal-container">
        <form class="form" @submit.prevent="handleSubmit">
          <h2> Login </h2>
          <div class="form-wrap">
            <label for="email">Email</label>
            <input type="email" name="email" id="email" v-model="user.email">
          </div>
          <div class="form-wrap">
            <label for="password">Senha</label>
            <input type="password" name="password" id="password" v-model="user.password">
          </div>
          <button> Acessar </button>
        </form>
      </div>
  </section>
</template>

<script>
import api from "../services/http";
import { reactive, toRefs } from 'vue';
import { useStore } from "vuex";

export default {
    name: "Home",
    setup(){
      
      // eslint-disable-next-line no-unused-vars
      const { state, dispatch } = useStore();
      
      const methods = reactive({
        user: {
          email: "",
          password: ""
        },
        async handleSubmit(){
            const rows = await api.auth(this.user.email, this.user.password);
            if(rows !== undefined){
              dispatch('authenticate', rows);
              this.$router.push('/auth');
            }
        }
      })
      
      return { state, ...toRefs(methods) }
    }
}
</script>

<style scoped>
  .modal {
    width: 100%;
    height: 100vh;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;

    background: rgba(0, 0, 0, 0.1);
  }

  .modal-container {
    padding: 32px;
    
    width: 360px;
    height: auto;

    border-radius: 12px;
    background: #fff;

    box-shadow: 2px 2px 16px rgba(0, 0, 0, 0.1);
  }

  .modal-container h2{
    font-size: 24px;
    font-weight: 500;
    color: #1f1f1f;
    text-align: center;
  }

  .form-wrap {
    margin: 18px 0;

    display: flex;
    flex-direction: column;
  }

  .form-wrap label {
    font-family: 'Poppins', sans-serif;
    font-size: 18px;
    font-weight: 100;
    color: #1f1f1f;
  }

  .form-wrap input {
    margin: 8px 0;
    padding: 12px;

    outline: 0;
    border: 1px solid #c9c9c9;
    background: #f9f9f9;

    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    font-weight: 500;
    color: #1f1f1f;
  }

  .form button {
    display: flex;
    justify-content: center;

    width: 220px;
    margin: 8px auto;
    padding: 12px;

    outline: 0;
    border: 0;
    background: #2e78e7;
    border-radius: 4px;
    cursor: pointer;

    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    font-weight: 500;
    color: #f9f9f9;
  }
</style>