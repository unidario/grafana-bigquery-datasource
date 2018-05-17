import BigQueryDatasource from './datasource';
import {BigQueryQueryCtrl} from './query_ctrl';
import {BigQueryConfigCtrl} from './config_ctrl';

class BigQueryAnnotationsQueryCtrl {
  static templateUrl = 'partials/annotations.editor.html';
}

export {
  BigQueryDatasource as Datasource,
  BigQueryQueryCtrl as QueryCtrl,
  BigQueryConfigCtrl as ConfigCtrl,
  BigQueryAnnotationsQueryCtrl as AnnotationsQueryCtrl,
};
