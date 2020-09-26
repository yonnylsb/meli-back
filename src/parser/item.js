const _get = require("lodash/get");
const _first = require("lodash/first");

function parseItem({
    id,
    title,
    currency_id,
    price,
    pictures,
    condition,
    shipping,
    sold_quantity
}, {plain_text}){
    const getShipping = _get(shipping, "free_shipping");
    const getDecimals = price % 1;
    const getPicture = _first(pictures);
    const getPictureUrl = _get(getPicture, "secure_url");

    return {
        author: {
            name: "Yonny Leandro",
            lastname: "Sanchez Beltran"
        },
        item: {
            id,
            title,
            price: {
                currency: currency_id,
                amount: price,
                decimals: getDecimals
            },
            picture: getPictureUrl,
            condition,
            free_shipping: getShipping,
            sold_quantity,
            description: plain_text
        },
    }
}

module.exports = parseItem;

