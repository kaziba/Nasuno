'use strict';

const fs = require('fs');

const AffiliateTagCreator          = require('./AffiliateTagCreator');
const Aggregater                   = require('./Aggregater');
const AmazonExpensiveItemRetriever = require('./AmazonExpensiveItemRetriever');
const AnimeAPIClient               = require('./AnimeAPIClient');
const Delayer                      = require('./Delayer');

module.exports = class Index {
  static getExpensiveItemList(params) {
    return AnimeAPIClient.getCours()
    .then( cours => {
      console.log(cours);
      // TODO: to - fromの分だけpromiseをためて、Promise.allで一括取得
      // const cours_array = Object.values(cours);
      const coursArray =  Object.keys(cours).map(key => cours[key]);
      const [from, to] = [coursArray.shift(), coursArray.pop()];
      console.log(from.year, to.year);
      return AnimeAPIClient.getListByYear(from.year);
    })
    .then( animeList => {
      console.log('animeList = ', animeList);
      const promises = animeList.map( (anime, index) => Delayer.delayPromise(5 * 1000 * index)
        .then( a => AmazonExpensiveItemRetriever.retrieve(anime.title)) );
      return Promise.all(promises);
    })
    .then( resultList => {
      console.log(resultList);
      console.log(resultList.length);
      console.log(resultList[0]);
      console.log(resultList[resultList.length - 1]);
      resultList = resultList.filter(result => result.asin);

      console.log(resultList.length);
      console.log(resultList[resultList.length - 1]);
      const byPrice = resultList.slice(0);
      byPrice.sort((a, b) => a.price - b.price);
      const affiliateTagcreator = new AffiliateTagCreator('eiurur');
      byPrice.map( result => affiliateTagcreator.generate(result) );
      return affiliateTagcreator.getTagList();
    })
    .then( tagList => {
      const file = fs.createWriteStream('array.md');
      file.on('error', err => console.log(err) );
      tagList.forEach( tag => file.write(tag + '\n') );
      file.end();
    })
    .catch( err => {
      console.error(err);
    });
  }
};
