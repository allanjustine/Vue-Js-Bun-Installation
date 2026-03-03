import NotFound from "@/components/NotFound.vue";
import TodoItem from "@/components/Todos/TodoItem.vue";
import UserItem from "@/components/Users/UserItem.vue";
import UserSolo from "@/components/Users/UserSolo.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/users",
  },
  {
    path: "/users",
    component: UserItem,
  },
  {
    path: "/users/:id",
    component: UserSolo,
    props: true,
  },
  {
    path: "/todos",
    component: TodoItem,
  },
  {
    path: "/:pathMatch(.*)*",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
