'use strict';

const client = require('cheerio-httpcli');

const ENDPOINT = "https://www.amazon.co.jp/s/";
const SEARCH_OPTIONS = {
  sort: 'price-desc-rank'
};

/**
 * Amazonにリクエスト送信(encodeURIComponent)、一番上のアイテム情報を回収
 */
module.exports = class AmazonExpensiveItemRetriever {

  static retrieve(keyword, num=1) {
    return new Promise((resolve, reject) => {
      console.log(keyword);
      // console.log(Object.assign({keywords: encodeURIComponent(keyword)}, SEARCH_OPTIONS));
      client.fetch(ENDPOINT, Object.assign({keywords: keyword}, SEARCH_OPTIONS))
      .then( result => {
        console.log(result.$('title').text());
        // for(let i = 0; i < 10; i++) {
        //   result.$(`.s-result-list`).each(function(idx) {
        //     console.log(result.$(this).text());
        //     // console.log(result.$(this).attr('/color-price'));
        //   })
        //   // console.log(result.$(`result_${i}`).attr('data-asin'));

        // }
        let data = {
          keyword: keyword,
          asin: result.$('#result_0').attr('data-asin'),
          title: result.$('#result_0 .s-access-detail-page').text(),
          detail: result.$('#result_0 h3.a-color-null').text(),
          image: result.$('#result_0 .s-access-image').attr('src'),
        };

        result.$('#result_0 span.a-size-base.a-text-bold').each( function(idx){
          if (idx) return;
          data.price = result.$(this).text().split(' ').pop().replace(/,/g, '') - 0;
        });

        // console.log(data);
        return resolve(data);
      })
      .catch( err => reject(err) );
    })
  }
};
