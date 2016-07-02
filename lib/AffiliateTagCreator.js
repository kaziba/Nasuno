/**
 * affiliateコード自動生成
 */
module.exports = class AffiliateTagCreator {
  constructor(id) {
    this.id = id;
    this.tagList = [];
  }

  getTagList() {
    return this.tagList;
  }

  generate(params) {
    const tag = `
<h3>${params.keyword}</h3>
<p>${params.price}円</p>
<div class="amazlet-box" style="margin-bottom:0px;"><div class="amazlet-image" style="float:left;margin:0px 12px 1px 0px;"><a href="http://www.amazon.co.jp/exec/obidos/ASIN/${params.asin}/${this.id}-22/ref=nosim/" name="amazletlink" target="_blank"><img src="${params.image}" alt="${params.title}" style="border: none;" /></a></div><div class="amazlet-info" style="line-height:120%; margin-bottom: 10px"><div class="amazlet-name" style="margin-bottom:10px;line-height:120%"><a href="http://www.amazon.co.jp/exec/obidos/ASIN/${params.asin}/${this.id}-22/ref=nosim/" name="amazletlink" target="_blank">${params.title}</a><div class="amazlet-powered-date" style="font-size:80%;margin-top:5px;line-height:120%">posted with <a href="http://www.amazlet.com/" title="amazlet" target="_blank">amazlet</a> at 16.07.01</div></div><div class="amazlet-detail">${params.detail} <br /></div><div class="amazlet-sub-info" style="float: left;"><div class="amazlet-link" style="margin-top: 5px"><a href="http://www.amazon.co.jp/exec/obidos/ASIN/${params.asin}/${this.id}-22/ref=nosim/" name="amazletlink" target="_blank">Amazon.co.jpで詳細を見る</a></div></div></div><div class="amazlet-footer" style="clear: left"></div>
</div>
<hr>
    `;
    this.tagList.push(tag);
  }
};
