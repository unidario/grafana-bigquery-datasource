/// <reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
import ResponseParser from './response_parser';
export default class BigQueryDatasource {
    private backendSrv;
    private templateSrv;
    private $q;
    id: any;
    name: string;
    url: string;
    authToken: string;
    responseParser: ResponseParser;
    /** @ngInject */
    constructor(instanceSettings: any, backendSrv: any, templateSrv: any, $q: any);
    doRequest(options: any): any;
    testDatasource(): any;
    interpolateVariable(value: any, variable: any): any;
    query(options: any): any;
    annotationQuery(options: any): void;
    metricFindQuery(query: string): void;
}
