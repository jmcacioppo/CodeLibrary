codeLibrary.service('checkLogin', function(auth) {
    return auth.currentUser;
});