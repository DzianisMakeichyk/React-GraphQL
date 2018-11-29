const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Mutations = {
    async createItem(parent, args, ctx, info) {
        const item = await ctx.db.mutation.createItem({
            data: {
                ...args
            }
        }, info);

        return item;
    },

    updateItem(parent, args, ctx, info) {
        // Get a copy of the updates
        const updates = { ...args };
        // Remove the ID from the updates
        delete updates.id;
        // Run the update method
        return ctx.db.mutation.updateItem({
            data: updates,
            where: {
                id: args.id
            }
        }, info);
    },

    async deleteItem(parent, args, ctx, info) {
        const where = { id: args.id };
        // Find the item
        const item = await ctx.db.query.item({ where }, `{ id title }`);
        // Check if the own that item, or have the permission
        // TODO
        // Delete it
        return ctx.db.mutation.deleteItem({ where }, info);
    },

    async signup(parent, args, ctx, info) {
        // lowercase their email
        args.email = args.email.toLowerCase();
        // has their password
        args.password = 'dogs123';
        const password = await bcrypt.hash(args.password, 10);
        // create a users db
        const user = await ctx.db.mutation.createUser({
            data: {
                ...args,
                password,
                permission: { set: ['USER'] }
            }
        }, info);
        // create the JWT token from them
        const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)
        // we set the jws as a cookie on the response
        ctx.response.cookie('token', token, {
            http
        })
    }
};

module.exports = Mutations;
