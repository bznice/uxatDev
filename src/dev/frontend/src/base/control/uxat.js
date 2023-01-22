angular.module("uxat", []);
angular.module("uxat").controller("uxatCtrl", ['$scope', function ($scope) {

    /*****************************************************************************************************/
    
    /** DATA */

    // User data init
    $scope.users = [
        { nick: "bznc", pass: "xxXX1234" },
        { nick: "viruz", pass: "xxXX1904" },
        { nick: "bob", pass: "xxXX0420" }
    ];
    $scope.usersN = 3;

    $scope.userLogged = "";
    $scope.userLoggedContacts = [];

    // Error messages and aux vars
    $scope.passDontMatchSpan = "";
    const passDontMatchMessage = "Both passwords don't match!";
    $scope.passSmallSpan = "";
    const passSmallMessage = "Password mandatory no less than 8";
    $scope.passNotAllowSpan = "";
    const passNotAllowMessage = "Password mandatory contain lower, upper, digit, ONLY!";
    $scope.userNotUniqueSpan = "";
    const userNotUniqueMessage = "This Nick is not available!";
    $scope.userNotRegistedSpan = "";
    const userNotRegistedMessage = "This nick don't exist!";
    $scope.passIncorrectSpan = "";
    const passIncorrectMessage = "Passwork incorrect!";

    // Pass validation aux vars
    const minSizePass = 8;
    const mandatoryCharsPassLower = "qwertyuiopasdfghjklzxcvbnm";
    const mandatoryCharsPassUpper = "QWERTYUIOPASDFGHJKLZXCVBNM";
    const mandatoryCharsPassDigit = "0123456789";
    const mandatoryCharsPassAll = mandatoryCharsPassLower + mandatoryCharsPassUpper + mandatoryCharsPassDigit;

    // To show initial page
    const appBegin = true;

    // ngInclude changers
    $scope.lettersView = appBegin;
    $scope.uxatAccessView = !appBegin;
    $scope.accessPinView = !appBegin;
    $scope.accessHowView = !appBegin;
    $scope.accessLoginView = !appBegin;
    $scope.accessCreateView = !appBegin;
    $scope.uxatLoggedView = !appBegin;

    $scope.pin = "1128";

    /*****************************************************************************************************/

    /** GERAL */

    $scope.setTimeoutSpan = function (element, span) {
        if (span != "") clearTimeout(span);
        span = setTimeout($scope.clearDemo, 3000, element, span);
    }

    $scope.clearDemo = function (log, timeoutId) {
        log.textContent = "";
        timeoutId = "";
    }

    /*****************************************************************************************************/

    /** PAGES */

    $scope.goToBegin = function () {
        $scope.lettersView = true;
        $scope.uxatAccessView = false;
        $scope.accessPinView = false;
        $scope.accessHowView = false;
        $scope.accessLoginView = false;
        $scope.accessCreateView = false;
        $scope.uxatLoggedView = false;
        $scope.loggedContactsView = false;
        $scope.loggedMessagesView = false;
    }

    $scope.goToAccessMode = function (pinFirst) {
        $scope.lettersView = false;
        $scope.uxatAccessView = true;
        $scope.accessPinView = pinFirst;
        $scope.accessHowView = !pinFirst;
        $scope.accessLoginView = false;
        $scope.accessCreateView = false;
        $scope.uxatLoggedView = false;
        $scope.loggedContactsView = false;
        $scope.loggedMessagesView = false;
    }

    $scope.goToLogin = function () {
        $scope.lettersView = false;
        $scope.uxatAccessView = true;
        $scope.accessPinView = false;
        $scope.accessHowView = false;
        $scope.accessLoginView = true;
        $scope.accessCreateView = false;
        $scope.uxatLoggedView = false;
        $scope.loggedContactsView = false;
        $scope.loggedMessagesView = false;
    }

    $scope.goToCreate = function () {
        $scope.lettersView = false;
        $scope.uxatAccessView = true;
        $scope.accessPinView = false;
        $scope.accessHowView = false;
        $scope.accessLoginView = false;
        $scope.accessCreateView = true;
        $scope.uxatLoggedView = false;
        $scope.loggedContactsView = false;
        $scope.loggedMessagesView = false;
    }

    $scope.goToContacts = function () {
        $scope.lettersView = false;
        $scope.uxatAccessView = true;
        $scope.accessPinView = false;
        $scope.accessHowView = false;
        $scope.accessLoginView = false;
        $scope.accessCreateView = false;
        $scope.uxatLoggedView = true;
        $scope.loggedContactsView = true;
        $scope.loggedMessagesView = false;
    }

    $scope.goToMessages = function () {
        $scope.lettersView = false;
        $scope.uxatAccessView = true;
        $scope.accessPinView = false;
        $scope.accessHowView = false;
        $scope.accessLoginView = false;
        $scope.accessCreateView = false;
        $scope.uxatLoggedView = true;
        $scope.loggedContactsView = false;
        $scope.loggedMessagesView = true;
    }

    /*****************************************************************************************************/

    /** PIN */

    $scope.pinValidation = function(pinInput) {
        if ($scope.pin === pinInput) {
            $scope.goToAccessMode(false);
        } else {
            $scope.goToBegin();
        }
    }

    /*****************************************************************************************************/

    /** LOGIN */

    $scope.loginUser = function (user) {
        if ($scope.verifyAllUserInputFieldsLoginAccount(user)) {
            var resultValidation = $scope.loginAccountValidation(user);
            if (resultValidation === 0) {
                $scope.goToContacts();
            } else {
                switch (resultValidation) {
                    case 1: $scope.spanErrorUserNotRegisted();
                        user.nick = "";
                        user.pass = "";
                        break;
                    case 2: $scope.spanErrorPassIncorrect();
                        user.pass = "";
                        break;
                    default: ;
                }
            }
        }
    }

    /*---------- VALIDATION -------------------*/

    $scope.verifyAllUserInputFieldsLoginAccount = function(user) {
        return (user.nick !== "" && user.nick.length > 0)
            && (user.pass !== "" && user.pass.length > 0);
    }

    $scope.loginAccountValidation = function (user) {
        if ($scope.userNotRegisted(user.nick)) return 1;
        if ($scope.passIncorrect(user)) return 2;

        return 0;
    }

    $scope.userNotRegisted = function(nick) {
        return $scope.users.find(e => e.nick === nick) === (null || undefined);
    }

    $scope.passIncorrect = function(user) {
        return $scope.users.find(e => e.nick === user.nick).pass !== user.pass;
    }

    /*****************************************************************************************************/

    /** CREATE */

    $scope.createUser = function (user) {
        if ($scope.verifyAllUserInputFieldsCreateAccount(user)) {
            var resultValidation = $scope.createAccountValidation(user);
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

    /*---------- VALIDATION -------------------*/

    $scope.verifyAllUserInputFieldsCreateAccount = function(user) {
        return (user.nick !== "" && user.nick.length > 0)
            && (user.pass !== "" && user.pass.length > 0)
            && (user.passTentative !== "" && user.passTentative.length > 0);
    }

    $scope.createAccountValidation = function (user) {
        if (!($scope.passEquals(user.pass, user.passTentative))) return 1;
        if (!($scope.verifyNickIsUnique(user.nick))) return 2;
        if (!($scope.passNotSmall(user.pass))) return 3;
        if (($scope.passHaveSpecialChars(user.pass))) return 4;
        if (!($scope.passHaveMandatoryChars(user.pass))) return 4;

        return 0;
    }
    
    $scope.passEquals = function (passO, passT) {
        return passO === passT;
    }

    $scope.verifyNickIsUnique = function (nick) {
        var userListResult = $scope.users.filter(user => user.nick === nick);
        return userListResult.length === 0;
    }

    $scope.passNotSmall = function (pass) {
        return pass.length >= minSizePass;
    }

    $scope.passHaveSpecialChars = function(pass) {
        var contains = false;
        [...pass].forEach((c) => {
            if(!mandatoryCharsPassAll.includes(c)) { contains = true; }
        });
        return contains;
    }

    $scope.passHaveMandatoryChars = function (pass) {
        var containsLower = false;
        var containsUpper = false;
        var containsDigit = false;
        [...mandatoryCharsPassLower].forEach((c) => {
            if (pass.includes(c)) { containsLower = true; }
        });
        [...mandatoryCharsPassUpper].forEach((c) => {
            if (pass.includes(c)) { containsUpper = true; }
        });
        [...mandatoryCharsPassDigit].forEach((c) => {
            if (pass.includes(c)) { containsDigit = true; }
        });
        return containsLower && containsUpper && containsDigit;
    }

    /*---------- PUSH USER --------------------*/

    $scope.configUserToPush = function (user) {
        return { nick: user.nick.toLowerCase(), pass: user.pass };
    }

    $scope.pushUser = function (user) {
        $scope.users.push(angular.copy(user));
        $scope.usersN++;
        delete user;
    }

    /*****************************************************************************************************/

    /** ERROR SPANS */

    /*---------- LOGIN ------------------------*/

    $scope.spanErrorUserNotRegisted = function () {
        var spanError = document.getElementById("SpanErrorLogin");
        spanError.textContent = userNotRegistedMessage;
        $scope.setTimeoutSpan(spanError, $scope.userNotRegistedSpan);
    }

    $scope.spanErrorPassIncorrect = function () {
        var spanError = document.getElementById("SpanErrorLogin");
        spanError.textContent = passIncorrectMessage;
        $scope.setTimeoutSpan(spanError, $scope.passIncorrectSpan);
    }

    /*---------- CREATE -----------------------*/

    $scope.spanErrorPassDontMatch = function () {
        var spanError = document.getElementById("SpanErrorCreate");
        spanError.textContent = passDontMatchMessage;
        $scope.setTimeoutSpan(spanError, $scope.passDontMatchSpan);
    }

    $scope.spanErrorPassSmall = function () {
        var spanError = document.getElementById("SpanErrorCreate");
        spanError.textContent = passSmallMessage;
        $scope.setTimeoutSpan(spanError, $scope.passSmallSpan);
    }

    $scope.spanErrorPassNotAllow = function () {
        var spanError = document.getElementById("SpanErrorCreate");
        spanError.textContent = passNotAllowMessage;
        $scope.setTimeoutSpan(spanError, $scope.passNotAllowSpan);
    }

    $scope.spanErrorNickNotUnique = function () {
        var spanError = document.getElementById("SpanErrorCreate");
        spanError.textContent = userNotUniqueMessage;
        $scope.setTimeoutSpan(spanError, $scope.userNotUniqueSpan);
    }

    /*****************************************************************************************************/
}]);