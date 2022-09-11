const Event = require('../../models/event');

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      return events;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  createEvent: async (args, req) => {

    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: args.eventInput.price,
      image: args.eventInput.image,
      types: args.eventInput.types,
      propertyName: args.eventInput.propertyName,
    });

    try {
      const result = await event.save();
      return result;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};
