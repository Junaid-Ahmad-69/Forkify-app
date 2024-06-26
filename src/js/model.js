import {getJSON} from "./helper";
import {API_URL} from "./config";

export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
    }
};

export const loadRecipe = async function (id) {
    try {
        // 1) Loading Recipe
        const data = await getJSON(`${API_URL}${id}`)
        let recipe = data.recipe
        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients
        }
    } catch (error) {
        throw error
    }
}
export const loadSearchResult = async function (query) {
    try {
        state.search.query = query
        const data = await getJSON(`${API_URL}?search=${query}}`)
        state.search.results = data.data.recipes.map(rec => {
            return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url
            }
        })
    } catch (error) {
        console.log(error)
        // throw error
    }
}