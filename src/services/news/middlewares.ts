import {Request, Response} from "express";
import axios from "axios";

import {Code} from "../../types";
import {arrayContains} from "../../utils/helper";

const newsApiKey = process.env["NEWS_API_KEY"];
const baseUrl = "http://newsapi.org/v2";

const categories = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
    ""
];

const countries = [
    "ae", "ar", "at", "au", "be", "bg", "br", "ca", "ch", "cn", "co", "cu",
    "cz", "de", "eg", "fr", "gb", "gr", "hk", "hu", "id", "ie", "il", "in",
    "it", "jp", "kr", "lt", "lv", "ma", "mx", "my", "ng", "nl", "no", "nz",
    "ph", "pl", "pt", "ro", "rs", "ru", "sa", "se", "sg", "si", "sk", "th",
    "tr", "tw", "ua", "us", "ve", "za", ""
];

export async function getNews(req: Request, res: Response): Promise<Response> {
    const {sources = "", category = "", country = ""} = req.query;

    if (!arrayContains({thing: category, arrayOfThings: categories}))
        return res.sendStatus(Code.BAD_REQUEST);
    if (!arrayContains({thing: country, arrayOfThings: countries}))
        return res.sendStatus(Code.BAD_REQUEST);

    let url = `${baseUrl}/top-headlines?apiKey=${newsApiKey}`;
    url += (sources === "" ? "" : `&sources=${sources}`);
    url += (category === "" ? "" : `&category=${category}`);
    url += (country === "" ? "" : `&country=${country}`);

    try {
        const response = await axios.get(url);
        const {data} = response;
        return res.status(Code.OK).json({data});
    } catch (err) {
        return res.status(Code.INTERNAL_SERVER_ERROR).json({err});
    }

}

/**
 * This function look for every news from the subject in the specified language
 * @params:
 *      search(string)
 *      language(string, ex : fr)
 * @returns 200 if OK
 */
export async function search(req: Request, res: Response): Promise<Response> {
    const {search, language} = req.query;

    if (!search) {
        return res.sendStatus(Code.BAD_REQUEST);
    }

    const url = `${baseUrl}/everything?apiKey=${newsApiKey}&q=${search}&language=${language}`;


    try {
        const {data} = await axios.get(url);
        return res.status(Code.OK).json({data});
    } catch (err) {
        return res.status(Code.INTERNAL_SERVER_ERROR).json({err});
    }

}
