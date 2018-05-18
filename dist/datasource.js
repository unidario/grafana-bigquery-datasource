///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
System.register(['lodash', './response_parser'], function(exports_1) {
    var lodash_1, response_parser_1;
    var BigQueryDatasource;
    return {
        setters:[
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (response_parser_1_1) {
                response_parser_1 = response_parser_1_1;
            }],
        execute: function() {
            BigQueryDatasource = (function () {
                /** @ngInject */
                function BigQueryDatasource(instanceSettings, backendSrv, templateSrv, $q) {
                    this.backendSrv = backendSrv;
                    this.templateSrv = templateSrv;
                    this.$q = $q;
                    this.id = instanceSettings.id;
                    this.name = instanceSettings.name;
                    this.url = 'https://www.googleapis.com/bigquery/v2/projects/chrome-ux-report/datasets/';
                    this.authToken = instanceSettings.jsonData.authToken;
                    this.responseParser = new response_parser_1.default(this.$q);
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
                        else {
                            return { status: "error", message: "Data source hates you", title: "I want to die" };
                        }
                    });
                };
                BigQueryDatasource.prototype.interpolateVariable = function (value, variable) {
                    if (typeof value === 'string') {
                        if (variable.multi || variable.includeAll) {
                            return "'" + value + "'";
                        }
                        else {
                            return value;
                        }
                    }
                    if (typeof value === 'number') {
                        return value;
                    }
                    var quotedValues = lodash_1.default.map(value, function (val) {
                        if (typeof value === 'number') {
                            return value;
                        }
                        return "'" + val + "'";
                    });
                    return quotedValues.join(',');
                };
                BigQueryDatasource.prototype.query = function (options) {
                    var _this = this;
                    var queries = lodash_1.default.filter(options.targets, function (item) {
                        return item.hide !== true;
                    }).map(function (item) {
                        return {
                            refId: item.refId,
                            intervalMs: options.intervalMs,
                            maxDataPoints: options.maxDataPoints,
                            datasourceId: _this.id,
                            rawSql: _this.templateSrv.replace(item.rawSql, options.scopedVars, _this.interpolateVariable),
                            format: item.format,
                        };
                    });
                    if (queries.length === 0) {
                        return this.$q.when({ data: [] });
                    }
                    return this.backendSrv
                        .datasourceRequest({
                        url: '/api/tsdb/query',
                        method: 'POST',
                        data: {
                            from: options.range.from.valueOf().toString(),
                            to: options.range.to.valueOf().toString(),
                            queries: queries,
                        },
                    })
                        .then(this.responseParser.processQueryResult);
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