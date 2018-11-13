(function() {
  angular.module("songSearch").component("cLogin", {
    templateUrl: "/pages/login.html",
    controller: ["$http", "$state", LoginCtrl],
    controllerAs: "vm",
    bindings: {
      $transition$: "<"
    }
  });

  function LoginCtrl($http, $state) {
    const vm = this;
    vm.loginParams;
    vm.onLogin = onLogin;
    vm.openPage = openPage;
    vm.ws = new XMLHttpRequest();
    
    

    this.$onInit = function() {
      console.log("$onInit");
      vm.ws.open("GET", "https://reqres.in/api/products/3", true);
      vm.ws.onload = function(){
        console.log(vm.ws.responseText);
    };
    vm.ws.send();
      // vm.trackId = vm.$transition$.params().trackId;
      // $http
      //   .get("https://localhost:5001/api/iTunes/search?term=" + vm.trackId)
      //   .then(function(res) {
      //     console.log(res.data.results[0]);
      //     vm.selectedMusic = res.data.results[0];
      //     vm.currentPage = 0;
      //   });
    };

    function onLogin(){
      console.log(vm.loginParams);
      if(vm.loginParams != undefined){
        if((vm.loginParams.username != undefined)&&(vm.loginParams.username != "")){
          if((vm.loginParams.password != undefined)&&(vm.loginParams.password != "")){
            console.log("OK. Send to API.")
          }else{
            console.log("Empty password")
          }
        }else{
          console.log("Empty username")
        }
      }else{
        console.log("Both empty")
      }
      
    }

    function openPage(url) {
      console.log(vm.selectedMusic.trackViewUrl);
      window.open(url);
    }
  }
})();
