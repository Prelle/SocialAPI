export const users = [
    {
        username: "rockjellyfish",
        email: "test@test.com"
    },
    {
        username: "markedwolf",
        email: "melanieb@gmail.com",
    },
    {
        username: "tinybutterfly",
        email: "nobody123@yahoo.com"
    },
    {
        username: "yellowmeercat",
        email: "anemail@myemail.org"
    },
    {
        username: "salamirolex",
        email: "watch_maker@gmail.com"
    },
    {
        username: "bigbear",
        email: "buddy13@yahoo.com"
    },
    {
        username: "umberbestow",
        email: "rick.astley@aol.com"
    },
    {
        username: "oatsemployer",
        email: "ceo-power@lunarcorp.co.uk"
    },
    {
        username: "sailingpenguin",
        email: "oceans_17j@gmail.com"
    },
    {
        username: "silkysnake",
        email: "sammysays@yahoo.com"
    },
    {
        username: "sablepuma",
        email: "nickfrompa@gmail.com"
    },
    {
        username: "testy_yamaha",
        email: "longren-da@gmail.com"
    }
]

const thoughts = [
    "I love the smell of the ocean.",
    "I'm a big fan of the color blue.",
    "Cars are my favorite mode of transportation.",
    "Is it just me, or does coffee taste better in the morning?",
    "Dinosaurs are cool.",
    "Fake plants are underrated.",
    "Music is the best.",
    "This is a thought.",
    "I'm thinking about a thought.",
    "Smiling is contagious.",
    "When I'm feeling down, I like to watch funny videos.",
    "Why don't we have flying cars yet?",
    "Funny how time flies.",
    "Don't forget to drink water.",
    "Purple is the best color."
]

const reactions = [
    "So true!",
    "Me too",
    "Wow!",
    "I never thought of that",
    "I agree",
    "This seems fake",
    "I don't know about that",
    "You're making me think",
    "I'm not sure",
    "I disagree",
    "Amazing point.",
    "Why hasn't anyone pointed this out before?",
    "Something isn't quite right here.",
    "Same here"
]

const getRandomItem = (arr: any) =>
    arr[Math.floor(Math.random() * arr.length)];

export const getRandomThought = () => {
    return getRandomItem(thoughts);
}

export const getRandomReaction = () => {
    return getRandomItem(reactions);
}

export const getRandomUsername = () => {
    return getRandomItem(users).username;
}