(function() {
    angular.module("songSearch").component("cGame", {
      templateUrl: "/pages/game.html",
      controller: ["$state", GameCtrl],
      controllerAs: "vm",
      bindings: {
        $transition$: "<"
      }
    });
  
    function GameCtrl($state) {
      const vm = this;
      
      this.$onInit = function() {
        console.log("$onInit");
        
      };
    }
  })();
  