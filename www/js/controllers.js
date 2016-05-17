angular.module('starter.controllers', ['ngCordova'])

  .run(function ($ionicPlatform, $rootScope, $cordovaLocalNotification) {
    $ionicPlatform.ready(function () {
      var push = new Ionic.Push({
        "debug": true
      });

      push.register(function (token) {
        console.log("Device token:", token.token);
        push.saveToken(token);  // persist the token in the Ionic Platform
      });

      $rootScope.$on('$cordovaPush:notificationReceived', function (event, notification) {
        $cordovaLocalNotification.schedule({
          id: 5,
          title: 'PUSH',
          text: notification.toString(),
          data: {
            customProperty: 'custom value'
          }
        }).then(function (result) {
          alert(result.toString() + "\n" + event.toString() + "\n" + notification.toString());
          console.log('THEN: ', result.toString() + "\n" + event.toString() + "\n" + notification.toString());
        });
      });
    });
  })
  //603744394438
  //    9c945f420ca08cf510b7cca428e58fbc3e8a08868e60e2d1
  //    ezsU6mavfOI:APA91bGKyACqTuhzAWVGiIfe_MyG41asCMMuZp02996T78EcxRxRoeBYMmIOCYpu70z_Oc1VB2i14UoD8vETNFqAmFcQq1-oTAxr8EdPmh_93KEwYU07B9cthfHUhatZfp5g7cgnddlG

  //.run(function ($ionicPlatform, $rootScope, $timeout, $cordovaLocalNotification) {
  //  $ionicPlatform.ready(function () {
  //    if (window.cordova && window.cordova.plugins.Keyboard) {
  //      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
  //    }
  //    if (window.StatusBar) {
  //      StatusBar.styleDefault();
  //    }
  //    window.plugin.notification.local.onadd = function (id, state, json) {
  //      var notification = {
  //        id: id,
  //        state: state,
  //        json: json
  //      };
  //      $timeout(function () {
  //        $rootScope.$broadcast("$cordovaLocalNotification:added", notification);
  //      });
  //    };
  //  });
  //})

  .controller('DashCtrl', function ($scope, $cordovaLocalNotification, $rootScope, $ionicPlatform) {

    $ionicPlatform.ready(function () {

      // ========== Scheduling

      $scope.scheduleSingleNotification = function () {
        $cordovaLocalNotification.schedule({
          id: 1,
          title: 'Title here',
          text: 'Text here',
          data: {
            customProperty: 'custom value'
          }
        }).then(function (result) {
          // ...
        });
      };

      $scope.scheduleMultipleNotifications = function () {
        $cordovaLocalNotification.schedule([
          {
            id: 1,
            title: 'Title 1 here',
            text: 'Text 1 here',
            data: {
              customProperty: 'custom 1 value'
            }
          },
          {
            id: 2,
            title: 'Title 2 here',
            text: 'Text 2 here',
            data: {
              customProperty: 'custom 2 value'
            }
          },
          {
            id: 3,
            title: 'Title 3 here',
            text: 'Text 3 here',
            data: {
              customProperty: 'custom 3 value'
            }
          }
        ]).then(function (result) {
          // ...
        });
      };

      $scope.scheduleDelayedNotification = function () {
        var now = new Date().getTime();
        var _10SecondsFromNow = new Date(now + 10 * 1000);

        $cordovaLocalNotification.schedule({
          id: 1,
          title: 'Title here',
          text: 'Text here',
          at: _10SecondsFromNow
        }).then(function (result) {
          // ...
        });
      };

      $scope.scheduleEveryMinuteNotification = function () {
        $cordovaLocalNotification.schedule({
          id: 1,
          title: 'Title here',
          text: 'Text here',
          every: 'minute'
        }).then(function (result) {
          // ...
        });
      };

      // =========/ Scheduling

      // ========== Update

      $scope.updateSingleNotification = function () {
        $cordovaLocalNotification.update({
          id: 1,
          title: 'Title - UPDATED',
          text: 'Text - UPDATED'
        }).then(function (result) {
          // ...
        });
      };

      $scope.updateMultipleNotifications = function () {
        $cordovaLocalNotification.update([
          {
            id: 1,
            title: 'Title 1 - UPDATED',
            text: 'Text 1 - UPDATED'
          },
          {
            id: 2,
            title: 'Title 2 - UPDATED',
            text: 'Text 2 - UPDATED'
          },
          {
            id: 3,
            title: 'Title 3 - UPDATED',
            text: 'Text 3 - UPDATED'
          }
        ]).then(function (result) {
          // ...
        });
      };

      // =========/ Update

      // ========== Cancelation

      $scope.cancelSingleNotification = function () {
        $cordovaLocalNotification.cancel(1).then(function (result) {
          // ...
        });
      };

      $scope.cancelMultipleNotifications = function () {
        $cordovaLocalNotification.cancel([1, 2]).then(function (result) {
          // ...
        });
      };

      $scope.cancelAllNotifications = function () {
        $cordovaLocalNotification.cancelAll().then(function (result) {
          // ...
        });
      };

      // =========/ Cancelation

      // ========== Events

      $rootScope.$on('$cordovaLocalNotification:schedule',
        function (event, notification, state) {
          // ...
        });

      $rootScope.$on('$cordovaLocalNotification:trigger',
        function (event, notification, state) {
          // ...
        });

      $rootScope.$on('$cordovaLocalNotification:update',
        function (event, notification, state) {
          // ...
        });

      $rootScope.$on('$cordovaLocalNotification:clear',
        function (event, notification, state) {
          // ...
        });

      $rootScope.$on('$cordovaLocalNotification:clearall',
        function (event, state) {
          // ...
        });

      $rootScope.$on('$cordovaLocalNotification:cancel',
        function (event, notification, state) {
          // ...
        });

      $rootScope.$on('$cordovaLocalNotification:cancelall',
        function (event, state) {
          // ...
        });

      $rootScope.$on('$cordovaLocalNotification:click',
        function (event, notification, state) {
          alert("clicked: " + notification.id);
        });

      // =========/ Events

    });


    $scope.add = function () {
      var alarmTime = new Date();
      alarmTime.setMinutes(alarmTime.getMinutes() + 1);
      $cordovaLocalNotification.add({
        id: "1234",
        date: alarmTime,
        message: "This is a message",
        title: "This is a title",
        autoCancel: true,
        sound: null
      }).then(function () {
        console.log("The notification has been set");
      });
    };

    $scope.isScheduled = function () {
      $cordovaLocalNotification.isScheduled("1234").then(function (isScheduled) {
        alert("Notification 1234 Scheduled: " + isScheduled);
      });
    };

    $scope.$on("$cordovaLocalNotification:added", function (id, state, json) {
      alert("Added a notification");
    });
  })

  .controller('ChatsCtrl', function ($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
      Chats.remove(chat);
    };
  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });
