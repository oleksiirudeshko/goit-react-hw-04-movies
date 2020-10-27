import queryString from 'query-string';

export default function getQeryParams(qs) {
  return queryString.parse(qs);
}
