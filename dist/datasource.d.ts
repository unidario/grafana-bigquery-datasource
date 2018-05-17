/// <reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
export default class ChangeMyNameDatasource {
    private backendSrv;
    private templateSrv;
    private $q;
    name: string;
    url: string;
    authToken: string;
    /** @ngInject */
    constructor(instanceSettings: any, backendSrv: any, templateSrv: any, $q: any);
    doRequest(options: any): any;
    testDatasource(): any;
    query(options: any): void;
    annotationQuery(options: any): void;
    metricFindQuery(query: string): void;
}
