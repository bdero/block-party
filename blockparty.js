Blocks = new Mongo.Collection("blocks");

if (Meteor.isClient) {
  Meteor.subscribe("blocks");

  Session.set("editing", null);

  Template.content.helpers({
    blocks: function() {
      return Blocks.find({}).fetch();
    },
  });

  Template.content.events({
    'mousedown': function(e) {
      // Create the block
      var field_position = $(".field").position();
      var block = Blocks.insert({
        x: e.pageX - field_position.left,
        y: e.pageY - field_position.top,
        width: 0,
        height: 0,
      });

      // Record the block we're currently editing
      Session.set("editing", block);
    },
  });
}

if (Meteor.isServer) {
  Meteor.publish("blocks", function() {
    return Blocks.find({});
  });
}
