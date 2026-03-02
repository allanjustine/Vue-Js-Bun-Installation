import TodoItem from "@/components/Todos/TodoItem.vue";
import UserItem from "@/components/Users/UserItem.vue";
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
    path: "/todos",
    component: TodoItem,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
