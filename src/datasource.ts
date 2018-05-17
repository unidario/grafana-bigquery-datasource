///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import _ from 'lodash';

export class GenericDatasource {



}

export default class ChangeMyNameDatasource {
  name: string;
  url: string;
  authToken: string;

  /** @ngInject */
  constructor(instanceSettings, private backendSrv, private templateSrv, private $q) {
    this.name = instanceSettings.name;
    this.url = 'https://www.googleapis.com/bigquery/v2/projects/chrome-ux-report/datasets/';
    this.authToken = instanceSettings.authToken;

  }

  doRequest(options) {
    options.url = this.url;
    options.headers = {
      Authorization: this.authToken,
    };
    return this.backendSrv.datasourceRequest(options);
  }

  testDatasource() {
    return this.doRequest({
      url: this.url + '/',
      method: 'GET',
    }).then(response => {
      if (response.status === 200) {
        return { status: "success", message: "Data source is working", title: "Success" };
      }
    });
  }


  query(options) {
    throw new Error("Query Support not implemented yet.");
  }

  annotationQuery(options) {
    throw new Error("Annotation Support not implemented yet.");
  }

  metricFindQuery(query: string) {
    throw new Error("Template Variable Support not implemented yet.");
  }

  testDatasource() {
    if (this.basicAuth || this.withCredentials) {
      options.withCredentials = true;
    }
    if (this.basicAuth) {
      options.headers = {
        Authorization: this.basicAuth,
};
    return this.$q.when({
      status: 'error',
      message: 'Data Source is just a template and has not been implemented yet.',
      title: 'Error'
    });
  }
}
