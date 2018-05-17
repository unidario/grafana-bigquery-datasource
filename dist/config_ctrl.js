///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
System.register([], function(exports_1) {
    var BigQueryConfigCtrl;
    return {
        setters:[],
        execute: function() {
            BigQueryConfigCtrl = (function () {
                /** @ngInject */
                function BigQueryConfigCtrl($scope) {
                    this.current.jsonData.authToken = this.current.jsonData.authToken;
                }
                BigQueryConfigCtrl.templateUrl = 'partials/config.html';
                return BigQueryConfigCtrl;
            })();
            exports_1("BigQueryConfigCtrl", BigQueryConfigCtrl);
        }
    }
});
//# sourceMappingURL=config_ctrl.js.map