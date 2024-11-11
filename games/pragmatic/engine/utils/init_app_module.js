const path = require('path');

module.exports = function initializer(app) {
    const dir = process.cwd();

    return {
        modules: [],

        add() {
            this.modules.push(...arguments);
            return this;
        },

        async init() {
            for (const m of this.modules) {
                // logger.info(`Loading module ${m}`);

                const factory = require(path.resolve(m));
                if (typeof factory === 'function') {
                    const r = factory(app);
                    if (r instanceof Promise)
                        await r;
                }
            }

            for (const name in app.db) {
                const model = app.db[name];

                try {
                    await model.sync();
                } catch (e) { }
            }
        }
    }
}