// Generated by CoffeeScript 1.10.0
(function() {
  var Trello, client, key, token;

  key = process.env.TRELLO_KEY;

  token = process.env.TRELLO_TOKEN;

  if (!key || !token) {
    console.log('expecting process.env.TRELLO_KEY and process.env.TRELLO_TOKEN');
    process.exit(1);
  }

  Trello = require('../lib');

  client = Trello(key, token);

  client.createBoard({
    name: 'Version 1'
  }).then(function(board) {
    var listParams;
    console.log("created board " + board.name + " id: " + board.id + ", url: " + board.url);
    listParams = {
      name: 'Milestone 1',
      idBoard: board.id
    };
    return client.createList(listParams).then(function(list) {
      var cardParams;
      console.log("created list " + list.name + " id: " + list.id + ", idBoard: " + list.idBoard);
      cardParams = {
        name: 'Server setup',
        due: new Date(),
        idList: list.id,
        urlSource: null
      };
      return client.createCard(cardParams).then(function(card) {
        var checklistParams;
        console.log("created card " + card.name + " id: " + card.id + ", idList: " + card.idList + ", due: " + card.due);
        checklistParams = {
          name: 'Env vars',
          idCard: card.id
        };
        return client.createChecklist(checklistParams).then(function(checklist) {
          var itemParams;
          console.log("created checklist " + checklist.name + " id: " + checklist.id);
          itemParams = {
            name: 'set NODE_ENV',
            checked: false,
            idChecklist: checklist.id
          };
          return client.createCheckitem(itemParams).then(function(checkitem) {
            var listQuery;
            console.log("created checkitem " + checkitem.name + " id: " + checkitem.id);
            listQuery = {
              idBoard: board.id
            };
            return client.getLists(listQuery).then(function(lists) {
              return console.log("have lists: " + (lists.map(function(l) {
                return l.name;
              }).join(', ')));
            });
          });
        });
      });
    });
  })["catch"](function(err) {
    console.log('error');
    return console.dir(err.message);
  });

}).call(this);
