  <script>//BEGINNING OF JAMES AND NANA'S CODE!!!!!!!!!
    function ChatController($scope) {
      var socket = io.connect();

      $scope.messages = [];
      $scope.roster = [];
      $scope.name = '';
      $scope.text = '';
      $scope.getResult = null;
      $scope.searchLogged = null;

      socket.on('connect', function() {
        $scope.setName();
      });
      
      socket.on('GET_2', function(test_string) {
        $scope.getResult = test_string;
        $scope.$apply();
      });

      $scope.tell = function tell() {
        $scope.searchLogged = $scope.text;
        socket.emit('GET', $scope.getResult);
        socket.emit('LOG', $scope.searchLogged); //SEPARATE FUNCTION- LOG
      }
      
      $scope.delee = function delee() {
        socket.emit('DELETE'); //do we need an object too?
      }
      
      $scope.setName = function setName() {
        socket.emit('identify', $scope.name);
      };
    }//END OF JAMES AND NANA'S CODE!!!!!!!!!!!!!!!!!!!!!!!! BEGINNING OF BOB AND CAMERON'S CODE!!!!!!!!!!!!!!!!!!!!!!!!
  </script>
