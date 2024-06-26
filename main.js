const natoCountries = [
    "albania",
    "belgium",
    "bulgaria",
    "canada",
    "croatia",
    "czech Republic",
    "denmark",
    "estonia",
    "france",
    "germany",
    "greece",
    "hungary",
    "iceland",
    "italy",
    "latvia",
    "lithuania",
    "luxembourg",
    "montenegro",
    "netherlands",
    "north Macedonia",
    "norway",
    "poland",
    "portugal",
    "romania",
    "slovakia",
    "slovenia",
    "spain",
    "turkey",
    "united Kingdom",
    "united States"
];
const countryForm = document.getElementById('countryForm');
const countriesDiv = document.getElementById('countries');


countryForm.addEventListener('submit', (event) => {
    event.preventDefault(); 
    const countryInput = document.getElementById('countryInput').value.trim().toLowerCase();
    countriesDiv.innerHTML = '';
        if (natoCountries.includes(countryInput)){
            console.log('This is an ally country');
            const warningMessage = document.getElementById('warningMessage');
            if (warningMessage) {
                warningMessage.innerText = 'This is an allied country!';
            }
        }
        else{
            warningMessage.innerText = '';
            fetch(`https://restcountries.com/v3.1/name/${countryInput}`)
                    .then(response => {
                        if (!response.ok) {
                            alert('Country not found');
                        }
                        return response.json();
                    })
                    .then(data => {
                        const country = data[0];

                        const countryDiv = document.createElement('div');
                        const name = document.createElement('h2');
                        const flag = document.createElement('img');
                        const capital = document.createElement('p');
                        const population = document.createElement('p');
                        const region = document.createElement('p');
                        const eliminateButton = document.createElement('button');
                        
                        eliminateButton.setAttribute("id", "eliminateButton")
                        
                        countryDiv.classList.add('country');
                        population.classList.add("population");
                        flag.classList.add("flag");
                        name.classList.add("name");
                        eliminateButton.classList.add("eliminateButton");

                        flag.src = country.flags.png;
                        flag.alt = country.name.common;
                        name.textContent = country.name.common;
                        capital.textContent = 'Captial: ' + country.capital;
                        population.textContent = 'Population: ' + country.population;
                        region.textContent = 'Region: ' + country.region;
                        eliminateButton.textContent = "Eliminate Country";

                        countryDiv.appendChild(name);
                        countryDiv.appendChild(flag);
                        countryDiv.appendChild(capital);
                        countryDiv.appendChild(population);
                        countryDiv.appendChild(region);
                        countryDiv.appendChild(eliminateButton);
                        countriesDiv.appendChild(countryDiv);
                    })
                    .catch(error => {
                        console.error(`Error fetching data for ${countryName}:`, error);
                    });
        };
    });

countriesDiv.addEventListener('click', (event) => {
    if (event.target.classList.contains('eliminateButton')) {
        const countryDiv = event.target.closest('.country');

        const populationElement = countryDiv.querySelector('.population');
        populationElement.textContent = 'Population: 0';

        const nameElement = countryDiv.querySelector('.name');
        nameElement.textContent = "Country " + nameElement.textContent + " is Eliminated"

        const flagElement = countryDiv.querySelector('.flag');
        flagElement.style.background = url("https://static.vecteezy.com/system/resources/previews/035/589/673/non_2x/ai-generated-an-explosion-isolated-on-a-transparent-background-free-png.png");
    }
});
