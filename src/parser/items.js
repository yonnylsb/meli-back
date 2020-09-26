const _get = require("lodash/get");
const _map = require("lodash/map");
const _find = require("lodash/find");

function parseItemsResults(itemsJson){
    const getFilters = _get(itemsJson, ["available_filters"]);
    const getCategories = _find(getFilters, ({id})=>id=="category");
    const getCategoryValues = _get(getCategories, "values");
    const parseCategories = _map(getCategoryValues,({name})=>name);
    const getItems = _get(itemsJson, "results");
    const getParsedItems = parseItems(getItems);

    return {
        author: {
            name: "Yonny Leandro",
            lastname: "Sanchez Beltran"
        },
        categories: parseCategories,
        items: getParsedItems
    }
}

function parseItems(itemsArr) {
    return _map(itemsArr, ({id, title, currency_id, price, thumbnail, condition, shipping})=>{
        const getDecimals = price % 1;
        const getShipping = _get(shipping, "free_shipping");
        return {
            id,
            title,
            price: {
                currency: currency_id,
                amount: price,
                decimals: getDecimals
            },
            picture: thumbnail,
            condition,
            free_shipping: getShipping
        }
    });
}

module.exports = parseItemsResults;