const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const h = require('./helper');

const jsonPath = path.join(__dirname, '..', 'JSON', 'verse-relations.json');
const jsonPathCh = path.join(__dirname, '..', 'JSON', 'chapters.json');
const csvPath = path.join(__dirname, '..', 'CSV', 'verses.csv');

module.exports =
   () => {
    let keys = [];
    let relations = [];

    fs.createReadStream(csvPath)
    .pipe(csv())
    .on('data', data => {
      keys.push({
        id: parseInt(data.VerseID),
        book: parseInt(data.BookID),
        chap: parseInt(data.Chapter)
      });
    })
    .on('end', () => {
  
      keys.map(x => {
        relations.push({
          'previous-verse': x.id <= 1 ? keys.length : x.id -1,
          'current': x.id,
          'next-verse': x.id <= keys.length -1 ? x.id + 1 : 1 })
      });
  
      const books = keys.reduce((a, c, k) => {
        if(a.length < c.book) {
          a.push({bookId: c.book, chapters:[{bookId: c.book, chap:c.chap, unique: c.book + '.' + c.chap}]})
          return a;
        }
  
        if (a[c.book -1].chapters.length < c.chap ) {
          a[c.book -1].chapters.push({bookId: c.book, chap:c.chap, unique: c.book + '.' + c.chap})
        }
        return a;
      }, [{ bookId:1, chapters: [{bookId: 1, chap:1, unique: '1.1'}]}]);
  
      h.save(JSON.stringify({relations: relations}), jsonPath);
      h.save(JSON.stringify({books: books}), jsonPathCh);
    });
    return "books data prepared"
  };

