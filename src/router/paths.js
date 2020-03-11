import store from '../store'
import LoginPage from '../views/Login'
import Home from '../views/Home'
import Cadastro from'../views/Cadastro'
import HomeCursos from '../views/HomeCursos'
import CadastroCursos from '../views/CadastroCursos'



export default [


    /* Geral */
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/cursos',
        name: 'HomeCursos',
        component: HomeCursos
    },
    {
        path: '/login',
        meta: {
            public: true,
        },
        props: true,
        name: 'Login',
        component: LoginPage
    },
    {
        path: '/cadastro',
        meta: {
            public: true,
        },
        props: true,
        name: 'Cadastro',
        component: Cadastro
    },
    {
        path: '/cadastroc',
        meta: {
            public: true,
        },
        props: true,
        name: 'CadastroCursos',
        component: CadastroCursos
    },
    {
        path: '/logout',
        meta: { breadcrumb: true },
        name: 'Logout',
        beforeEnter (to, from, next) {
            store.dispatch('auth/logout', false)
        },
    },

];
