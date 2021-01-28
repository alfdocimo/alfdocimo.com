const optimizedImages = require('next-optimized-images');

module.exports = optimizedImages({
    env: {
        FORMSPREE_PROJECT_ID: process.env.FORMSPREE_PROJECT_ID
    }
});
