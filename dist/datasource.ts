///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import _ from 'lodash';
import ResponseParser from './response_parser';

export default class BigQueryDatasource {
  id: any;
  name: string;
  url: string;
  authToken: string;
  responseParser: ResponseParser;

  /** @ngInject */
  constructor(instanceSettings, private backendSrv, private templateSrv, private $q) {
    this.id = instanceSettings.id;
    this.name = instanceSettings.name;
    this.url = 'https://www.googleapis.com/bigquery/v2/projects/chrome-ux-report/datasets/';
    this.authToken = instanceSettings.jsonData.authToken;
    this.responseParser = new ResponseParser(this.$q);
  }

  doRequest(options) {
    options.url = this.url;
    options.headers = {
      Authorization: "Bearer " + this.authToken,
    };
    return this.backendSrv.datasourceRequest(options);
  }

  testDatasource() {
    return this.doRequest({
      url: this.url,
      method: 'GET',
      authToken: this.authToken,
    }).then(response => {
      if (response.status === 200) {
        return { status: "success", message: "Data source is working", title: "Success" };
      } else {
        return { status: "error", message: "Data source hates you", title: "I want to die" };
      }
    });
  }

  query(options) {
      var queries = _.filter(options.targets, item => {
        return item.hide !== true;
      }).map(item => {
        return {
          refId: item.refId,
          datasourceId: this.id,
          rawSql: item.rawSql.replace("\n", " "),
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
            //from: options.range.from.valueOf().toString(),
            //to: options.range.to.valueOf().toString(),
            queries: queries.rawSql,
            useLegacySql: false,
          },
        })
        .then(this.responseParser.processQueryResult);
  }

  annotationQuery(options) {
    throw new Error("Annotation Support not implemented yet.");
  }

  metricFindQuery(query: string) {
    throw new Error("Template Variable Support not implemented yet.");
  }

}
