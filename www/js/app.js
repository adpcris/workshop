// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope

//TO TEST THE APPLICATION TO YOUR ANDROID DEVICE USE THE COMMAND: cordova run android
(function () {

    /* -------------------------- Declaration of html Templates --------------------------- */
    HomeView.prototype.template = Handlebars.compile($("#home-tpl").html());
    EmployeeListView.prototype.template = Handlebars.compile($("#employee-list-tpl").html());

    /* ---------------------------------- Local Variables ---------------------------------- */
    var service = new EmployeeService();
    service.initialize().done(function () {
        console.log("Service initialized");
        $('body').html(new HomeView(service).render().$el);
    });

    /* --------------------------------- Event Registration -------------------------------- */
    document.addEventListener('deviceready',function(){
        FastClick.attach(document.body);
        if(navigator.notification){ // Override the default Javascript alert with a native dialog
            window.alert = function(message){
                navigator.notification.alert(
                    message,    // message
                    null,       // callback
                    "Workshop", // title
                    'OK'        // buttonName
                );
            };
        }
    }, false);

}());