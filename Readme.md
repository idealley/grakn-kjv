# GraKn King James Project
This project aims at testing the functionalities of Grakn
    1. Relations between books, chapters, verses and words
    2. Relations between topics and verses
    3. Cross references (Verses speaking of other verses or refering to)
    4. Relation among people and places
    5. Relation among people
    6. Inferences
    7. CSV imports
    8. JSON imports
    9. Templates
    10. etc.

## Ontology migration
the `bible.gql` file is the original ontology, loaded in the graph. I wanted to experiment and improve the ontology, for it to look like `bible-latest.gql` but this version of the file, removes `plays <role>` from the `person` entity and causes out of memory exceptions. Thus I tried with the `bible-updated.gql`, which leaves the `plays <role>` but that too out of memor exceptions

## Data parse
Prepares some data for import. To regenerate the files just run

```js
>>> npm install
>>> node index
```

## Import steps

1. `graql.sh -f ./ontology/bible.gql`
2. `graql.sh`
3. `>>> insert $x isa bible, has name "King James Version", has short-name "KJV", has language "English", has language-code "en-EN", has publication-year 1611;`
4. `>>> commit`
5. `migration.sh csv -t ./templates/books.gql -i ./CSV/Books.csv -k grakn`
6. `migration.sh json -t ./templates/chapters.gql -i ./JSON/chapters.json -k grakn` 
6. `>>> match $b isa book, has book-id $bid; $c isa chapter, has book-id $bid;insert (book-role:$b, chapter-role: $c) isa belongs;`
7. `>>> commit`
8. `migration.sh csv -t ./templates/verses.gql -i ./CSV/Verses.csv -k grakn`
9. `migration.sh csv -t ./templates/places.gql -i ./CSV/Places.csv -k grakn`
10. `migration.sh csv -t ./templates/people.gql -i ./CSV/People.csv -k grakn`
11. `$ migration.sh csv -t ./templates/words.gql -i ./CSV/MainIndex.csv -k grakn`
12. `migration.sh csv -t ./templates/topics.gql -i ./CSV/Topics.csv -k grakn`
12. `migration.sh csv -t ./templates/topic-relations.gql -i ./CSV/TopicIndex.csv -k grakn`
13. `migration.sh csv -t ./templates/place-alias.gql -i ./CSV/PlaceAliases.csv -k grakn`
14. `migration.sh csv -t ./templates/people-alias.gql -i ./CSV/PeopleAliases.csv -k grakn`
15. `migration.sh csv -t ./templates/book-alias.gql -i ./CSV/BookAliases.csv -k grakn`
16. `migration.sh csv -t ./templates/strongs.gql -i ./CSV/Strongs.csv -k grakn`
17. `migration.sh csv -t ./templates/strongs-rel.gql -i ./CSV/StrongsIndex.csv -k grakn`
18. `migration.sh csv -t ./templates/groups.gql -i ./CSV/groups.csv -k grakn`
19. `migration.sh csv -t ./templates/people-to-groups.gql -i ./CSV/PeopleGroups.csv -k grakn`
20. `migration.sh json -t ./templates/verse-rel.gql -i ./JSON/verse-relations.json -k grakn`
21. `migration.sh csv -t ./templates/people-relations.gql -i ./CSV/PeopleRelationships.csv -k grakn`

