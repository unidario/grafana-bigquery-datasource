import _ from 'lodash';

export default class ResponseParser {

  parse(query, results) {
    /*
    if (!results || results.results.length === 0) { return []; }

    var sqlResults = results.results[0];
    if (!sqlResults.series) {
      return [];
    }

    var res = {};
    _.each(sqlResults.series, serie => {
      _.each(serie.values, value => {
        if (_.isArray(value)) {
          addUnique(res, value[0]);
        } else {
          addUnique(res, value);
        }
      });
    });

    return _.map(res, value => {
      return { text: value};
    });
  }
  */
  var sample_response = [{
                          "target":"upper_75",
                          "datapoints":[
                            [622, 1450754160000],
                            [365, 1450754220000]
                          ]
                        },
                        {
                          "target":"upper_90",
                          "datapoints":[
                            [861, 1450754160000],
                            [767, 1450754220000]
                          ]
                        }
                      ];
  return sample_response;
}

/*
function addUnique(arr, value) {
  arr[value] = value;
}
*/