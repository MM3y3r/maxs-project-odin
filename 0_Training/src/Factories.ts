// FACTORIES
const sniper = (state) => {
    return {
        snipe: () => console.log("BANG!"),
    };
};

const dog = (state) => {
    return {
        talk: () => console.log("woof"),
    };
};

const gardener = (state) => {
    return {
        garden: () => console.log("'we are gardening...'"),
    };
};

// COMPOSITION
const stealthDogGardener = (state) => {
    return Object.assign({}, sniper(state), dog(state), gardener(state));
};

const freddy = dog("asdf");
const demolisher = stealthDogGardener("test");

freddy.talk();
demolisher.snipe();
