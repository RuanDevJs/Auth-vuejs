import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import Auth from "../components/Auth.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "home",
            component: Home
        },
        {
            path: "/auth",
            name: "auth",
            component: Auth,
            meta: {
                login: true
            }
        }
    ]
});

router.beforeEach((to, from, next) => {
    const auth = window.localStorage.getItem('_auth');

    if(to.matched.some(record => record.meta.login)){
        if(auth){
            next();
        }else{
            next('/');
        }
    }else {
        next();
    }
})

export default router;