const { forwardTo } = require('prisma-binding');

const Query = {
    items: forwardTo('db'),
    item: forwardTo('db'),
    itemsConnection: forwardTo('db'),
    // async items(parent, args, ctx, info) {
    //     const items = await ctx.db.items();
    //     return items;
    // }
};

module.exports = Query;
