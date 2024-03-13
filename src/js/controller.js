import * as model from './model'
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import recipeViewClass from './views/recipeView'
import searchView from "./views/searchView";
const controlRecipe = async function () {
    try {
        const id = window.location.hash.slice(1);

        if(!id) return
        recipeViewClass.renderSpinner()
        // 1) Loading Recipe
        await model.loadRecipe(id)
        //2) Rendering recipe
        recipeViewClass.render(model.state.recipe)

    } catch (err) {
        recipeViewClass.renderError(err.message)
    }
}
const controlSearchResult = async function (){
    try{
        // 1) Get Search Query
        const query = searchView.getQuery()
        if(!query) return;

        // 2) Load Search Result
        await model.loadSearchResult(query);
    }catch (error){
        throw error
    }
}
const init = function(){
    recipeViewClass.addHandlerRender(controlRecipe)
    searchView.addHandlerSearch(controlSearchResult)
}
init()

// https://forkify-api.herokuapp.com/v2
