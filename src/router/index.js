import Vue from "vue";
import Router from "vue-router";
import Login from "@/components/pages/Login";
import Dashboard from "@/components/Dashboard";
import Products from "@/components/Products";

Vue.use(Router);

export default new Router({
  routes: [
    {
      //未被定義的路徑，直接導向登入頁
      path: "*",
      redirect: "/login"
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/admin",
      name: "Dashboard",
      component: Dashboard,
      meta: { requiresAuth: true }, // 進入這個頁面需要登入
      children: [
        {
          // 以 / 開頭的嵌套路徑會被當作根路徑
          // 意思是如果寫 /products 就會顯示 http://localhost:8080/#/products 這個路徑
          // 而非 http://localhost:8080/#/父元件路徑/products
          path: "products",
          name: "Products",
          component: Products,
          
        }
      ]
    }
  ]
});
