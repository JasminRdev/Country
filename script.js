
async function fetchRegions() {
    try{
        const res = await fetch('./data.json');
        if(!res.ok) {
            throw new Error('Network response was not ok ' + res.statusText);
        } 
        const jsonData = await res.json();
        const allRegions = jsonData.map(country => country.region)
        const regions = [...new Set(allRegions)];

        return regions;
    } 
    catch (error){
        console.log("Error catched at fetching regions: ", error)
        return []
    }
}

function createOptionsRegion(regionName) {
    let sectionsRegion = document.getElementById("regions_drp")
    let optionsRegion = document.createElement('option'); 
    optionsRegion.value = regionName
    optionsRegion.innerHTML = regionName
    sectionsRegion.appendChild(optionsRegion)
}

async function fetchAndCreateOptionsRegion() {
    const regions = await fetchRegions();
    regions.sort();
    regions.map(x => createOptionsRegion(x))
}


function fillCartOverview(flag, country, population, region, capital){
    const sectionGroup = document.getElementById("country-container_section")

    const article = document.createElement('article')
    article.className = "country-el_article"
    article.id = "country-el_article"


    const img = document.createElement('img')   
    img.src = flag
    img.alt = country +" Flag"
    img.className = "country-flag"


    const countryInfo = document.createElement('div')
    countryInfo.className = "country-info"


    const countryName = document.createElement('h3')
    countryName.className = "country-name"
    countryName.innerHTML = country


    const countryPopulationResult = document.createElement('p')
    const countryPopulationLabel = document.createElement('span')
    countryPopulationResult.className = "bold-font"
    countryPopulationLabel.innerHTML = population
    countryPopulationLabel.className = "normal-font"

    countryPopulationResult.innerHTML = "Population: "
    countryPopulationResult.appendChild(countryPopulationLabel)

    
    const countryRegionResult = document.createElement('p')
    const countryRegionLabel = document.createElement('span')
    countryRegionResult.className = "bold-font"
    countryRegionLabel.innerHTML = region
    countryRegionLabel.className = "normal-font"

    countryRegionResult.innerHTML = "Region: "
    countryRegionResult.appendChild(countryRegionLabel)

    
    const countryCapitalResult = document.createElement('p')
    const countryCapitalLabel = document.createElement('span')
    countryCapitalResult.className = "bold-font"
    countryCapitalLabel.innerHTML = capital
    countryCapitalLabel.className = "normal-font"

    countryCapitalResult.innerHTML = "Capital: "
    countryCapitalResult.appendChild(countryCapitalLabel)

    
    countryInfo.appendChild(countryName)
    countryInfo.appendChild(countryPopulationResult)
    countryInfo.appendChild(countryRegionResult)
    countryInfo.appendChild(countryCapitalResult)


    article.appendChild(img)
    article.appendChild(countryInfo)

    sectionGroup.appendChild(article)

}

async function fetchOverview(regionFilter, countryFilter) {
    try{
        const res = await fetch('./data.json');
        if(!res.ok) {
            throw new Error('Network response was not ok ' + res.statusText);
        } 
        let jsonData = await res.json();

        const getOnlyCountry = () => {
            jsonData = jsonData.filter(country => country.name.toLowerCase().includes(countryFilter.toLowerCase()))
            jsonData.sort((a, b) => {
                const aStartsWith = a.name.toLowerCase().startsWith(countryFilter.toLowerCase());
                const bStartsWith = b.name.toLowerCase().startsWith(countryFilter.toLowerCase());
        
                if (aStartsWith && !bStartsWith) {
                    return -1;
                } else if (!aStartsWith && bStartsWith) {
                    return 1;
                } else {
                    return a.name.localeCompare(b.name);
                }
            });
        }

        const getOnlyRegion = () => {
            jsonData = jsonData.filter(country => country.region === regionFilter)
        }

        if(regionFilter && !countryFilter) {
           getOnlyRegion()
        }

        if(countryFilter && !regionFilter) {
            getOnlyCountry()
        }

        if(regionFilter && countryFilter) {
            getOnlyRegion()
            getOnlyCountry()
        }

        const countryCart = jsonData.map(country => ({
                flag:country.flag,
                country:country.name,
                population:country.population,
                region:country.region,
                capital:country.capital
        }))
           
        countryCart.forEach(c => {
            fillCartOverview(c.flag, c.country, c.population, c.region, c.capital)
        })
    } 
    catch (error){
        console.log("Error catched at fetching regions: ", error)
        return []
    }
}

function removeAllCountries() {
    let element = document.getElementById('country-container_section');
    while(element.firstChild){
        element.removeChild(element.firstChild);
    }
}


function changedRegion(e) {
    const filterComponent = document.getElementById("regions_drp")    
    const filterByCountry = document.getElementById("search_for_country")
    
    removeAllCountries()
    
    if(filterByCountry.value != "") {
        fetchOverview(filterComponent.value, filterByCountry.value)
    } else {
            
        fetchOverview(filterComponent.value, false)
    }
}

function changedCountry(e) {
    e.preventDefault();
    
    const filterByCountry = document.getElementById("search_for_country")
    const filterComponent = document.getElementById("regions_drp")
    removeAllCountries()

    if(filterComponent.value != "Filter by Region") {
        fetchOverview(filterComponent.value, filterByCountry.value)
    } else {
        
        fetchOverview(false, filterByCountry.value)
    }
    
}

function preventReload(e) {
    e.preventDefault();
}

document.addEventListener('DOMContentLoaded', (event) => {
    
    fetchAndCreateOptionsRegion();

    const filterComponent = document.getElementById("regions_drp")
    if(filterComponent) {
        filterComponent.addEventListener('change', changedRegion)
    }

    const filterByCountry = document.getElementById("search_for_country")
    if(filterByCountry) {
        filterByCountry.addEventListener('input', changedCountry)
    }
    
    const filter = document.getElementById("search_for_country_f")
    if(filter) {
        filter.addEventListener("submit", preventReload)
    }

    fetchOverview(false, false);

    }
)


async function fetchSingleCard() {
    try{
                
        let res = await fetch("./data.json")
        res = await res.json()
        let singleCardInfos = res.filter(c => c.name === "Germany")
        console.log(singleCardInfos)
        // language is obj -> name
        // alpha3Code border
    } catch (e) {
        console.log("Error catched at fetching single card: ", e)
    }
}

fetchSingleCard()