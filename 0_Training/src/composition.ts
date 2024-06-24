/// THIS IS A FACTORY!!!
const barker = (state: any) => {
    return {
        bark: () => console.log("woof"),
    };
};

// ({}) in this case just facilitates an implicit returned object
const driver = (state: any) => ({
    drive: () => console.log("Vroom!"),
});

const murderer = (state: any) => ({
    murder: () => console.log("DEATH!"),
});

barker({ name: "John" }).bark();

// compose!!!

const MurderDogDriver = (state: any) => {
    return Object.assign({}, barker(state), driver(state), murderer(state));
};

const MurderPuppy = MurderDogDriver("asdf");

MurderPuppy.murder();
MurderPuppy.drive();
