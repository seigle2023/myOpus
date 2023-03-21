import { createRouter, createWebHistory } from 'vue-router'
import G4 from '../views/G4.vue'

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: '/',
            name: 'glb',
            component: G4
        },
        {
            path: '/PM',
            name: 'PM',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import ('../views/PM.vue')
        },

    ]
})

export default router