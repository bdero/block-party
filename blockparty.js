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
    "mousedown": function(e) {
      if (!Session.get("editing")) {
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
      }
    },
    "mousemove": function(e) {
      var editing = Session.get("editing");
      if (editing) {
        var field_position = $(".field").position();
        var block = Blocks.findOne(editing);
        var block_position = $("#" + editing).position();
        Blocks.update(editing, {
          $set: {
            width: e.pageX - field_position.left - block.x,
            height: e.pageY - field_position.top - block.y,
          },
        });
      }
    },
    "mouseup": function(e) {
      Session.set("editing", null);
    },
  });
  Template.controls.events({
    "click button": function(e) {
      Meteor.call("clearAllBlocks");
    },
  });
}

if (Meteor.isServer) {
  Meteor.publish("blocks", function() {
    return Blocks.find({});
  });

  Meteor.methods({
    clearAllBlocks: function() {
      Blocks.remove({});
    },
  });
}
