///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
System.register([], function(exports_1) {
    var BigQueryDatasource;
    return {
        setters:[],
        execute: function() {
            BigQueryDatasource = (function () {
                /** @ngInject */
                function BigQueryDatasource(instanceSettings, backendSrv, templateSrv, $q) {
                    this.backendSrv = backendSrv;
                    this.templateSrv = templateSrv;
                    this.$q = $q;
                    this.name = instanceSettings.name;
                    this.url = 'https://www.googleapis.com/bigquery/v2/projects/chrome-ux-report/datasets/';
                    this.authToken = 'Hello World'; // instanceSettings.authToken;
                }
                BigQueryDatasource.prototype.doRequest = function (options) {
                    options.url = this.url;
                    options.headers = {
                        Authorization: "Bearer " + this.authToken,
                    };
                    return this.backendSrv.datasourceRequest(options);
                };
                BigQueryDatasource.prototype.testDatasource = function () {
                    return this.doRequest({
                        url: this.url,
                        method: 'GET',
                        authToken: this.authToken,
                    }).then(function (response) {
                        if (response.status === 200) {
                            return { status: "success", message: "Data source is working", title: "Success" };
                        }
                    });
                };
                BigQueryDatasource.prototype.query = function (options) {
                    throw new Error("Query Support not implemented yet.");
                };
                BigQueryDatasource.prototype.annotationQuery = function (options) {
                    throw new Error("Annotation Support not implemented yet.");
                };
                BigQueryDatasource.prototype.metricFindQuery = function (query) {
                    throw new Error("Template Variable Support not implemented yet.");
                };
                return BigQueryDatasource;
            })();
            exports_1("default", BigQueryDatasource);
        }
    }
});
//# sourceMappingURL=datasource.js.map