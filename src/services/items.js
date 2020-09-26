const fetch = require("node-fetch");
const _get = require("lodash/get");
const parseItems = require("../parser/items");
const parseItem = require("../parser/item");
const { urls } = require("../common/apiUrls.json");

async function items (req, res) {
    const getQueryQ = _get(req, ["query", "q"]) || "";
    const getParamId = _get(req, ["params", "id"]) || "";
    let getResponse = null;
    let getDescription = null;
    let itemsParsed = null;

    if(getQueryQ){
        getResponse = await getUrlData(`${urls.search}?q=:${getQueryQ}`);
        itemsParsed = parseItems(getResponse);
    }

    if(getParamId){
        getResponse = await getUrlData(`${urls.items}/${getParamId}`);
        getDescription = await getUrlData(`${urls.items}/${getParamId}/description`);
        itemsParsed = parseItem(getResponse, getDescription);
    }

    res.json(itemsParsed);
}

async function getUrlData(url){
    const response = await fetch(url);

    return await response.json();
}

module.exports = items;
