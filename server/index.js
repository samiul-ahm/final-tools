//  loadVisitedCountries();
        
        fetch(`https://restcountries.com/v3.1/region/Asia`)
            .then(res => res.json())
            .then(data => loadCountries(data))

        function loadCategories(data) {
            const regionSet = new Set();
            for (let i = 0; i < data.length; i++) {
                regionSet.add(data[i].region)
            }
            const categories = [...regionSet]

            let categoryLi = "";
            categories.forEach(category => categoryLi += `
            <li><a id=${category}>${category}</a></li>
            `)

            document.getElementById("menuLg").innerHTML = categoryLi;
            document.getElementById("menuSm").innerHTML = categoryLi;
        }

        fetch('https://restcountries.com/v3.1/all?fields=name,cca2,flags,region')
            .then(res => res.json())
            .then(data => loadCategories(data))

        function visitCountry(e) {
            const cca2 = e.id;
            if(isVisited(e.id)) {
                alert("Already Visited!")
                return;
            }
            fetch("https://restcountries.com/v3.1/alpha/" + cca2)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    let visitedCountryContainer = document.getElementById("visitedCountryContainer").innerHTML;
                    
                    addVisitedCountryToLS(data[0].flags.png, cca2);

                    visitedCountryContainer += `<img class="w-20" src="${data[0].flags.png}" alt="">`

                    document.getElementById("visitedCountryContainer").innerHTML = visitedCountryContainer;
                    
                })

        }

        function loadCountries(countries) {
            console.log(countries)
            const countryContainer = document.getElementById("countryContainer");
            let countryDiv = "";
            countries.forEach(country => countryDiv += `
            <div class="card bg-base-100 shadow-sm">
                <figure>
                    <img src="${country.flags.png}" alt="Shoes" />
                </figure>
                <div class="card-body">
                    <h2 class="card-title">${country.name.common}</h2>
                    <p>${country.name.official}</p>
                    <div class="card-actions justify-end">
                        <button onclick="visitCountry(${country.cca2})" class="btn btn-primary" id="${country.cca2}">Visit</button>
                    </div>
                </div>
            </div>
            `)

            countryContainer.innerHTML = countryDiv;
        }

        document.querySelectorAll(".menu").forEach(item => item.addEventListener('click', function (e) {
            const region = e.target.id;
            fetch(`https://restcountries.com/v3.1/region/${region}`)
                .then(res => res.json())
                .then(data => loadCountries(data))
        }))

