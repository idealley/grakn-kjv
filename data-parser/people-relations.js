const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const h = require('./helper');
const _ = require('lodash');

const jsonPath = path.join(__dirname, '..', 'JSON', 'people-relations.json');
const csvPath = path.join(__dirname, '..', 'CSV', 'PeopleRelationships.csv');

module.exports = () => {
  const d = [];
  fs.createReadStream(csvPath)
  .pipe(csv())
  .on('data', data => {
    d.push({
      primary: parseInt(data.Primary),
      rel: parseInt(data.RelatedTo),
      type: data.RelType
    });
  })
  .on('end', () => {
    const results = d.reduce((a,v) => {
      const item = _.find(d, i => i.rel === v.primary && i.primary === v.rel);
      const acc = _.find(a, i => i.primary === v.rel) || [];
      if (v.rel !== acc.primary) {
        a.push({
          primary: v.primary, 
          type1: v.type, 
          related: v.rel, 
          type2: item.type
        });
      }
      return a;
    },[]);
    h.save(JSON.stringify({relations: results}), jsonPath);
  });
};

