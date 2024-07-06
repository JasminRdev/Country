
async function fetchData(filterComponent){
    try {
        const res = await fetch('./data.json');
        if(!res.ok) {
            throw new Error('Network response was not ok ' + res.statusText);
        } 
        return res.json();
    } 
    catch (err) {console.log("err at fetchData ", err)}
}

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
    console.log(regions)
    regions.map(x => createOptionsRegion(x))
}


function changedRegion() {
    const filterComponent = document.getElementById("regions_drp")
    console.log(filterComponent.value)
}

document.addEventListener('DOMContentLoaded', (event) => {

    const filterComponent = document.getElementById("regions_drp")
    filterComponent.addEventListener('change', changedRegion)
    // fetchData(filterComponent)
    // console.log("DOM fully loaded and parsed");
    }
)


fetchAndCreateOptionsRegion();

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

async function fetchOverview() {
    try{
        const res = await fetch('./data.json');
        if(!res.ok) {
            throw new Error('Network response was not ok ' + res.statusText);
        } 
        const jsonData = await res.json();

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


fetchOverview();

