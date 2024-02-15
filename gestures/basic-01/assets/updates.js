export default [
    {
        username: "spidee303",
        name: "Peter Parker",
        id: Math.random() * 100,
        profilePhotoUrl: require("./imgs/img-01.jpg"),
        stories: [
            {
                storyType: "video",
                source: require("./videos/mb-01.mp4")
            },

            {
                storyType: "video",
                source: require("./videos/mb-03.mp4")
            },

            {
                storyType: "image",
                source: require("./imgs/story-00.jpg")
            },
        ]
    },

    {
        username: "hammer_boy",
        name: "Thor Odenson",
        id: Math.random() * 100,
        profilePhotoUrl: require("./imgs/img-04.jpg"),
        stories: [
            {
                storyType: "video",
                source: require("./videos/mb-02.mp4")
            },

            {
                storyType: "image",
                source: require("./imgs/story-01.jpg")
            },

            {
                storyType: "video",
                source: require("./videos/mb-06.mp4")
            },
        ]
    },

    {
        username: "iron666",
        name: "Tony Stark",
        id: Math.random() * 100,
        profilePhotoUrl: require("./imgs/img-05.jpg"),
        stories: [
            {
                storyType: "image",
                source: require("./imgs/img-02.jpg")
            },

            {
                storyType: "image",
                source: require("./imgs/story-02.jpg")
            },

            {
                storyType: "video",
                source: require("./videos/mb-03.mp4")
            },
        ]
    },

    {
        username: "ohmycaptain",
        name: "Steve Rogers",
        id: Math.random() * 100,
        profilePhotoUrl: require("./imgs/img-03.jpg"),
        stories: [
            {
                storyType: "video",
                source: require( "./videos/mb-04.mp4")
            },

            {
                storyType: "image",
                source: require( "./imgs/story-03.jpg")
            },

            {
                storyType: "image",
                source: require( "./videos/mb-05.mp4")
            },
        ]
    }
]