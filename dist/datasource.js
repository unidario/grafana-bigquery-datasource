///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
System.register([], function(exports_1) {
    var ChangeMyNameDatasource;
    return {
        setters:[],
        execute: function() {
            ChangeMyNameDatasource = (function () {
                /** @ngInject */
                function ChangeMyNameDatasource(instanceSettings, backendSrv, templateSrv, $q) {
                    this.backendSrv = backendSrv;
                    this.templateSrv = templateSrv;
                    this.$q = $q;
                    this.name = instanceSettings.name;
                    this.url = 'https://www.googleapis.com/bigquery/v2/projects/chrome-ux-report/datasets/';
                    this.authToken = instanceSettings.authToken;
                }
                ChangeMyNameDatasource.prototype.doRequest = function (options) {
                    options.url = this.url;
                    options.headers = {
                        Authorization: this.authToken,
                    };
                    return this.backendSrv.datasourceRequest(options);
                };
                ChangeMyNameDatasource.prototype.testDatasource = function () {
                    return this.doRequest({
                        url: this.url + '/',
                        method: 'GET',
                    }).then(function (response) {
                        if (response.status === 200) {
                            return { status: "success", message: "Data source is working", title: "Success" };
                        }
                    });
                };
                ChangeMyNameDatasource.prototype.query = function (options) {
                    throw new Error("Query Support not implemented yet.");
                };
                ChangeMyNameDatasource.prototype.annotationQuery = function (options) {
                    throw new Error("Annotation Support not implemented yet.");
                };
                ChangeMyNameDatasource.prototype.metricFindQuery = function (query) {
                    throw new Error("Template Variable Support not implemented yet.");
                };
                return ChangeMyNameDatasource;
            })();
            exports_1("default", ChangeMyNameDatasource);
        }
    }
});
//# sourceMappingURL=datasource.js.map