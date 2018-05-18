///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
System.register(['lodash', 'app/plugins/sdk'], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var lodash_1, sdk_1;
    var defaultQuery, BigQueryQueryCtrl;
    return {
        setters:[
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (sdk_1_1) {
                sdk_1 = sdk_1_1;
            }],
        execute: function() {
            defaultQuery = "SELECT\n  UNIX_TIMESTAMP(<time_column>) as time_sec,\n  <value column> as value,\n  <series name column> as metric\nFROM <table name>\nWHERE $__timeFilter(time_column)\nORDER BY <time_column> ASC\n";
            BigQueryQueryCtrl = (function (_super) {
                __extends(BigQueryQueryCtrl, _super);
                /** @ngInject **/
                function BigQueryQueryCtrl($scope, $injector) {
                    _super.call(this, $scope, $injector);
                    this.target.format = this.target.format || 'time_series';
                    this.target.alias = '';
                    this.formats = [{ text: 'Time series', value: 'time_series' }, { text: 'Table', value: 'table' }];
                    if (!this.target.rawSql) {
                        // special handling when in table panel
                        if (this.panelCtrl.panel.type === 'table') {
                            this.target.format = 'table';
                            this.target.rawSql = 'SELECT 1';
                        }
                        else {
                            this.target.rawSql = defaultQuery;
                        }
                    }
                    this.panelCtrl.events.on('data-received', this.onDataReceived.bind(this), $scope);
                    this.panelCtrl.events.on('data-error', this.onDataError.bind(this), $scope);
                }
                BigQueryQueryCtrl.prototype.onDataReceived = function (dataList) {
                    this.lastQueryMeta = null;
                    this.lastQueryError = null;
                    var anySeriesFromQuery = lodash_1.default.find(dataList, { refId: this.target.refId });
                    if (anySeriesFromQuery) {
                        this.lastQueryMeta = anySeriesFromQuery.meta;
                    }
                };
                BigQueryQueryCtrl.prototype.onDataError = function (err) {
                    if (err.data && err.data.results) {
                        var queryRes = err.data.results[this.target.refId];
                        if (queryRes) {
                            this.lastQueryMeta = queryRes.meta;
                            this.lastQueryError = queryRes.error;
                        }
                    }
                };
                BigQueryQueryCtrl.templateUrl = 'partials/query.editor.html';
                return BigQueryQueryCtrl;
            })(sdk_1.QueryCtrl);
            exports_1("BigQueryQueryCtrl", BigQueryQueryCtrl);
        }
    }
});
//# sourceMappingURL=query_ctrl.js.map