
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
