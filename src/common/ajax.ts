/**
 * ajax Util
 */
class Ajax {

  get json(): any { return { headers: {'Content-Type': 'application/json'} }; }
  get get(): any { return { method: 'GET' }; }
  get post(): any { return { method: 'POST' }; }
  get delete(): any { return { method: 'delete' }; }
  get put(): any { return { method: 'put' }; }

}

export default new Ajax();
