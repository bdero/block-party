Blocks = new Mongo.Collection("blocks");

if (Meteor.isClient) {
  Meteor.subscribe("blocks");

  Template.content.helpers({
    blocks: function() {
      return Blocks.find({}).fetch();
    },
  });
}

if (Meteor.isServer) {
  Meteor.publish("blocks", function() {
    return Blocks.find({});
  });
}
