(function() {
  const myApp = angular.module("songSearch", ["ui.router"]);

  //myApp.controller("listaMusicas", ['$http', '$state', SearchCtrl]);

  myApp.config([
    "$stateProvider",
    "$urlServiceProvider",
    ($stateProvider, $urlServiceProvider) => {
      const states = [
        {
          name: "app",
          redirectTo: "app.main"
        },
        {
          name: "app.login",
          url: "/login",
          component: "cLogin",
        },
        {
          name: "app.register",
          url: "/register",
          component: "cRegister"
        },
        {
          name: "app.main",
          url: "",
          component: "cMain"
        },
        {
          name: "app.game",
          url: "/game",
          component: "cGame"
        }
      ];
      states.forEach(state => $stateProvider.state(state));
      $urlServiceProvider.rules.otherwise({ state: "app" });
    }
  ]);
})();
