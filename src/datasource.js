export class GenericDatasource {

  constructor(instanceSettings, $q, backendSrv, templateSrv) {
    this.type = instanceSettings.type;
    this.name = instanceSettings.name;
    // TODO: don't hardcode projectID
    this.url = 'https://www.googleapis.com/bigquery/v2/projects/chrome-ux-report/datasets/'
    this.q = $q;
    this.headers = {'Content-Type': 'application/json'};
    if (typeof instanceSettings.authToken === 'string' && instanceSettings.authToken.length > 0) {
      this.headers['Authorization'] = 'Bearer ' + instanceSettings.authToken;
    }
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

  doRequest(options) {
    options.withCredentials = this.withCredentials;
    options.headers = this.headers;

    return this.backendSrv.datasourceRequest(options);
  }
}
