///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import _ from 'lodash';
import {QueryCtrl} from 'app/plugins/sdk';
//import './css/query_editor.css!';

export interface BigQuery {
  refId: string;
  format: string;
  alias: string;
  rawSql: string;
}

export interface QueryMeta {
  sql: string;
}

const defaultQuery = `#standardSQL
SELECT
  origin, effective_connection_type, form_factor, first_paint
FROM \`chrome-ux-report.all.201711\`
WHERE
  origin = 'https://www.trivago.com' AND
  effective_connection_type.name = '4G' AND
  form_factor.name = 'desktop'
;`;

export class BigQueryQueryCtrl extends QueryCtrl {
  static templateUrl = 'partials/query.editor.html';

  showLastQuerySQL: boolean;
  formats: any[];
  target: BigQuery;
  lastQueryMeta: QueryMeta;
  lastQueryError: string;
  showHelp: boolean;

  /** @ngInject **/

  constructor($scope, $injector) {
    super($scope, $injector);

    this.target.format = this.target.format || 'time_series';
    this.target.alias = '';
    this.formats = [{ text: 'Time series', value: 'time_series' }, { text: 'Table', value: 'table' }];

    /* Not used atm
    if (!this.target.rawSql) {
      // special handling when in table panel
      if (this.panelCtrl.panel.type === 'table') {
        this.target.format = 'table';
        this.target.rawSql = 'SELECT 1';
      } else {
        this.target.rawSql = defaultQuery;
      }
    }
    */
    this.panelCtrl.events.on('data-received', this.onDataReceived.bind(this), $scope);
    this.panelCtrl.events.on('data-error', this.onDataError.bind(this), $scope);
  }

  onDataReceived(dataList) {
    this.lastQueryMeta = null;
    this.lastQueryError = null;

    let anySeriesFromQuery = _.find(dataList, { refId: this.target.refId });
    if (anySeriesFromQuery) {
      this.lastQueryMeta = anySeriesFromQuery.meta;
    }
  }

  onDataError(err) {
    if (err.data && err.data.results) {
      let queryRes = err.data.results[this.target.refId];
      if (queryRes) {
        this.lastQueryMeta = queryRes.meta;
        this.lastQueryError = queryRes.error;
      }
    }
  }
}
