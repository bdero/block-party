Blocks = new Mongo.Collection("blocks");

if (Meteor.isClient) {
  Meteor.subscribe("blocks");
}

if (Meteor.isServer) {
  Meteor.publish("blocks", function() {
    return Blocks.find({});
  });
}
