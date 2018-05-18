export default class ResponseParser {
    private $q;
    constructor($q: any);
    processQueryResult(res: any): {
        data: any[];
    };
    parseMetricFindQueryResult(refId: any, results: any): any;
    transformToKeyValueList(rows: any, textColIndex: any, valueColIndex: any): any[];
    transformToSimpleList(rows: any): any;
    findColIndex(columns: any, colName: any): number;
    containsKey(res: any, key: any): boolean;
    transformAnnotationResponse(options: any, data: any): any;
}
