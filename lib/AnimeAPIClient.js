'use strict';

const fetch = require('node-fetch');

/**
 * アニメのタイトル取得(from animeAPI)
 */
const ENDPOINT = "http://api.moemoe.tokyo/anime/v1/";

module.exports = class AnimeAPIClient {

  static getCours() {
    return fetch(`${ENDPOINT}master/cours`).then( res => res.json() );
  }

  static getListByYear(year) {
    return fetch(`${ENDPOINT}master/${year}`).then( res => res.json() );
  }
};
