/*global angular */
var app = angular.module('cnrapp', []);

app.filter('secondsToDateTime', [function () {
    'use strict';
    return function (seconds) {
        return new Date(1970, 0, 1).setSeconds(seconds);
    };
}]);

app.filter('cnrFilter', function () {
    'use strict';
    return function (items, cnrFilterObj) {
        var filteredResults = [];

        angular.forEach(items, function (item) {
            if (cnrFilterObj.server1 === true && cnrFilterObj.server2 === true) {
                filteredResults.push(item);
            } else if (cnrFilterObj.server1 === true && item.serverNumber === 1) {
                filteredResults.push(item);
            } else if (cnrFilterObj.server2 === true && item.serverNumber === 2) {
                filteredResults.push(item);
            }
        });
        return filteredResults;
    };
});


app.controller('listController', function ($http, $filter, $scope) {
    'use strict';
    $scope.loading = true;
    $scope.players = [];
    $scope.s1 = [];
    $scope.s2 = [];

    $scope.cnrFilterObj = {
        admin: true,
        players: true,
        server1: true,
        server2: true
    };

    $scope.skills = [
        {
            id: 0,
            skill: 'Police Officer'
        },
        {
            id: 1,
            skill: 'Car Jacker'
        },
        {
            id: 2,
            skill: 'Rapist'
        },
        {
            id: 3,
            skill: 'Drug Dealer'
        },
        {
            id: 4,
            skill: 'Hitman'
        },
        {
            id: 5,
            skill: 'Prostitute'
        },
        {
            id: 6,
            skill: 'Con Artist'
        },
        {
            id: 7,
            skill: 'Pick Pocket'
        },
        {
            id: 8,
            skill: 'Arms Dealer'
        },
        {
            id: 9,
            skill: 'Mechanic'
        },
        {
            id: 10,
            skill: 'Street Vendor'
        },
        {
            id: 11,
            skill: 'Kidnapper'
        },
        {
            id: 12,
            skill: 'Private Medic'
        },
        {
            id: 13,
            skill: 'Food Vendor'
        }
    ];

    $scope.skillFilter = 0;

    $scope.player = {
        name: ''
    };

    $scope.closeInfo = function () {
        $scope.player = {};
    };

    $scope.openInfo = function (player) {
        $scope.player = player;
    };


    $http.get("player.php")
        .then(function (res) {
            $scope.s1 = res.data.servers[0];
            $scope.s2 = res.data.servers[1];

            $scope.s1.players.forEach(function (player) {
                player.serverNumber = 1;
                player.serverCity = $scope.s1.mapname;
            });

            $scope.s2.players.forEach(function (player) {
                player.serverNumber = 2;
                player.serverCity = $scope.s2.mapname;
            });

            $scope.players = $scope.s1.players.concat($scope.s2.players);

            $scope.loading = false;
        });
});
