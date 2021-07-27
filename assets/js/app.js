
    const URL = 'https://restcountries.eu/rest/v2/all';

    Vue.createApp({

        data(){
            return {
                flags: [],
                name: null,
                code: null,
                capital: null,
                search: ''
            }
        },
        computed: {
            filteredFlags (){
                if (this.name == true) {this.flags.sort(function(a,b){
                                                                    if(a.name.toLowerCase() > b.name.toLowerCase())
                                                                        return 1
                                                                    if(a.name.toLowerCase() < b.name.toLowerCase())
                                                                        return -1
                                                                    return 0})}
                if (this.name == false) {this.flags.sort(function(a,b){
                                                                    if(a.name.toLowerCase() < b.name.toLowerCase())
                                                                        return 1
                                                                    if(a.name.toLowerCase() > b.name.toLowerCase())
                                                                        return -1
                                                                    return 0})}
                
                if (this.code == true) {this.flags.sort(function(a,b){
                                                                    if(a.alpha2Code.toLowerCase() > b.alpha2Code.toLowerCase())
                                                                        return 1
                                                                    if(a.alpha2Code.toLowerCase() < b.alpha2Code.toLowerCase())
                                                                        return -1
                                                                    return 0})}
                if (this.code == false) {this.flags.sort(function(a,b){
                                                                    if(a.alpha2Code.toLowerCase() < b.alpha2Code.toLowerCase())
                                                                        return 1
                                                                    if(a.alpha2Code.toLowerCase() > b.alpha2Code.toLowerCase())
                                                                        return -1
                                                                    return 0})}

                if (this.capital == true) {this.flags.sort(function(a,b){
                                                                    if(a.capital.toLowerCase() > b.capital.toLowerCase())
                                                                        return 1
                                                                    if(a.capital.toLowerCase() < b.capital.toLowerCase())
                                                                        return -1
                                                                    return 0})}
                if (this.capital == false) {this.flags.sort(function(a,b){
                                                                    if(a.capital.toLowerCase() < b.capital.toLowerCase())
                                                                        return 1
                                                                    if(a.capital.toLowerCase() > b.capital.toLowerCase())
                                                                        return -1
                                                                    return 0})}

                let s = this.search.toLowerCase();
                return this.flags.filter(   
                                        item => item.name.toLowerCase().includes(s)||
                                        item.capital.toLowerCase().includes(s)||
                                        item.alpha3Code.toLowerCase().includes(s)||
                                        item.alpha2Code.toLowerCase().includes(s)
                                        );
            }
        },
        methods: {
            sortType(message){
                let tempState = this[message];
                this.name = null;
                this.code = null;
                this.capital = null;
                this[message] = tempState;
                this[message] = this[message]==true?false:true;
            }
        },
        async mounted() {
            let flags = await fetch(URL);
                flags = await flags.json();

            for (let country of flags){
                for (let neighbor in country.borders){
                    for (let neighborsFlags of flags){
                        if (country.borders[neighbor] == neighborsFlags.alpha3Code){
                            country.borders[neighbor] = {
                                                            alpha3Code:  neighborsFlags.alpha3Code,
                                                            flag:        neighborsFlags.flag,
                                                            name:        neighborsFlags.name
                                                         };                                 
                        }
                    }
                }
            }
            this.flags = flags;
        }
    }).mount('#app');