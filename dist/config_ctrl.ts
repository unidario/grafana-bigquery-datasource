///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

export class BigQueryConfigCtrl {
  static templateUrl = 'partials/config.html';
  current: any;

  /** @ngInject */
  constructor($scope) {
    this.current.jsonData.authToken = 'test';
  }
}
