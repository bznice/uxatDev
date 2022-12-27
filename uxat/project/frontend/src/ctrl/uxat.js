angular.module("uxat", []);
angular.module("uxat").controller("uxatCtrl", ['$scope', function ($scope) {

    /*************************************************************************/
    /** DATA */

    $scope.users = [
        { nick: "bznc", pass: "xxXX1234" },
        { nick: "viruz", pass: "xxXX1904" },
        { nick: "bob", pass: "xxXX0420" }
    ];
    $scope.usersN = 3;

    $scope.userLogged = "";
    $scope.userLoggedContacts = [];

    $scope.passDontMatchSpan = "";
    const passDontMatchMessage = "Both passwords don't match!";
    $scope.passSmallSpan = "";
    const passSmallMessage = "Password mandatory no less than 8";
    $scope.passNotAllowSpan = "";
    const passNotAllowMessage = "Password mandatory contain lower, upper, digit, ONLY!";
    $scope.userNotUniqueSpan = "";
    const userNotUniqueMessage = "This Nick is not available!";

    const minSizePass = 8;
    const mandatoryCharsPassLower = "qwertyuiopasdfghjklzxcvbnm";
    const mandatoryCharsPassUpper = "QWERTYUIOPASDFGHJKLZXCVBNM";
    const mandatoryCharsPassDigit = "0123456789";

    const appBegin = true;

    $scope.helloWorldView = appBegin;
    $scope.uXatView = !appBegin;
    $scope.loginView = !appBegin;
    $scope.createView = !appBegin;
    $scope.userLoggedContactsView = !appBegin;
    $scope.userLoggedMessagesView = !appBegin;

    /*************************************************************************/
    /** GERAL */

    $scope.setTimeoutSpan = function (element, span) {
        if (span != "") clearTimeout(span);
        span = setTimeout($scope.clearDemo, 3000, element, span);
    }

    $scope.clearDemo = function (log, timeoutId) {
        log.textContent = "";
        timeoutId = "";
    }

    /*************************************************************************/
    /** INIT */

    $scope.go = function () {
        $scope.helloWorldView = false;
        $scope.uXatView = true;
        $scope.loginView = false;
        $scope.createView = false;
        $scope.userLoggedContactsView = false;
        $scope.userLoggedMessagesView = false;
    }

    $scope.loginAccess = function () {
        $scope.helloWorldView = false;
        $scope.uXatView = false;
        $scope.loginView = true;
        $scope.createView = false;
        $scope.userLoggedContactsView = false;
        $scope.userLoggedMessagesView = false;
    }

    $scope.createAccess = function () {
        $scope.helloWorldView = false;
        $scope.uXatView = false;
        $scope.loginView = false;
        $scope.createView = true;
        $scope.userLoggedContactsView = false;
        $scope.userLoggedMessagesView = false;
    }

    $scope.userLoggedContactsAccess = function () {
        $scope.helloWorldView = false;
        $scope.uXatView = false;
        $scope.loginView = false;
        $scope.createView = false;
        $scope.userLoggedContactsView = true;
        $scope.userLoggedMessagesView = false;
    }

    $scope.userLoggedMessagesAccess = function () {
        $scope.helloWorldView = false;
        $scope.uXatView = false;
        $scope.loginView = false;
        $scope.createView = false;
        $scope.userLoggedContactsView = false;
        $scope.userLoggedMessagesView = true;
    }

    /*************************************************************************/
    /** LOGIN */

    $scope.loginUser = function (user) {
        $scope.go();
    }

    /*************************************************************************/
    /** CREATE */

    $scope.createUser = function (user) {
        if ((user.nick !== "" && user.nick.length > 0)
            && (user.pass !== "" && user.pass.length > 0)) {
            let resultValidation = $scope.createAccountValidation(user);
            if (resultValidation === 0) {
                user = $scope.configUserToPush(angular.copy(user));
                $scope.pushUser(user);
                $scope.loginUser(user);
            } else {
                switch (resultValidation) {
                    case 1: $scope.spanErrorPassDontMatch();
                        user.pass = "";
                        user.passTentative = "";
                        break;
                    case 2: $scope.spanErrorNickNotUnique();
                        user.nick = "";
                        break;
                    case 3: $scope.spanErrorPassSmall();
                        user.pass = "";
                        user.passTentative = "";
                        break;
                    case 4: $scope.spanErrorPassNotAllow();
                        user.pass = "";
                        user.passTentative = "";
                        break;
                    default: ;
                }
            }
        }
    }

    /*---------- OPERATIONS -------------------*/

    $scope.createAccountValidation = function (user) {
        if (!($scope.passEquals(user.pass, user.passTentative))) return 1;
        if (!($scope.verifyNickIsUnique(user.nick))) return 2;
        if (!($scope.passNotSmall(user.pass))) return 3;
        if (!($scope.passHaveMandatoryChars(user.pass))) return 4;

        return 0;
    }

    $scope.configUserToPush = function(user) {
        return {nick: user.nick.toLowerCase(), pass: user.pass};
    }

    $scope.pushUser = function (user) { 
        $scope.users.push(angular.copy(user));
        $scope.usersN++;
        delete user;
    }

    $scope.passEquals = function (passO, passT) {
        return passO === passT;
    }

    $scope.verifyNickIsUnique = function (nick) {
        let userListResult = $scope.users.filter(user => user.nick === nick);
        return userListResult.length === 0;
    }

    $scope.passNotSmall = function (pass) {
        return pass.length >= minSizePass;
    }

    $scope.passHaveMandatoryChars = function (pass) {
        let containsLower = false;
        let containsUpper = false;
        let containsDigit = false;
        [...mandatoryCharsPassLower].forEach((c) => {
            if (pass.includes(c)) {
                containsLower = true;
            }
        });
        [...mandatoryCharsPassUpper].forEach((c) => {
            if (pass.includes(c)) {
                containsUpper = true;
            }
        });
        [...mandatoryCharsPassDigit].forEach((c) => {
            if (pass.includes(c)) {
                containsDigit = true;
            }
        });
        return containsLower && containsUpper && containsDigit;
    }

    /*---------- SPAN CONTROLLER --------------*/

    $scope.spanErrorPassDontMatch = function () {
        var spanError = document.getElementById("spanErrorCreate");
        spanError.textContent = passDontMatchMessage;
        $scope.setTimeoutSpan(spanError, $scope.passDontMatchSpan);
    }

    $scope.spanErrorPassSmall = function () {
        var spanError = document.getElementById("spanErrorCreate");
        spanError.textContent = passSmallMessage;
        $scope.setTimeoutSpan(spanError, $scope.passSmallSpan);
    }

    $scope.spanErrorPassNotAllow = function () {
        var spanError = document.getElementById("spanErrorCreate");
        spanError.textContent = passNotAllowMessage;
        $scope.setTimeoutSpan(spanError, $scope.passNotAllowSpan);
    }

    $scope.spanErrorNickNotUnique = function () {
        var spanError = document.getElementById("spanErrorCreate");
        spanError.textContent = userNotUniqueMessage;
        $scope.setTimeoutSpan(spanError, $scope.userNotUniqueSpan);
    }

    /*************************************************************************/
}]);