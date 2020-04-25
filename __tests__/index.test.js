//For use unexported function https://medium.com/@macsikora/how-to-test-private-functions-of-es6-module-fb8c1345b25f
const rewire = require("rewire");
const instagramUserFinderRewire = rewire("../index.js");

const clearUsernames = instagramUserFinderRewire.__get__("clearUsernames");

const extractUsernameTitle = instagramUserFinderRewire.__get__(
  "extractUsernameTitle"
);

const extractUsernameSnippet = instagramUserFinderRewire.__get__(
  "extractUsernameSnippet"
);

const extractUsernameWithLink = instagramUserFinderRewire.__get__(
  "extractUsernameWithLink"
);

const data = [
  {
    title: "Figaro Voyage (@lefigarovoyages) • Photos et vidéos Instagram",
    link: "https://www.instagram.com/lefigarovoyages/?hl=fr",
    snippet:
      "7283 abonnés, 919 abonnement, 1162 publications - Découvrez les photos et vidéos Instagram de Figaro Voyage (@lefigarovoyages)",
  },
  {
    title: "Vent de Voyage (@ventdevoyage) • Photos et vidéos Instagram",
    link: "https://www.instagram.com/ventdevoyage/?hl=fr",
    snippet:
      "813 abonnés, 600 abonnement, 207 publications - Découvrez les photos et vidéos Instagram de Vent de Voyage (@ventdevoyage)",
  },
  {
    title: "Le RDV du Carnet de Voyage ... - Instagram",
    link: "https://www.instagram.com/rendezvousducarnetdevoyage/",
    snippet:
      "3571 Followers, 670 Following, 581 Posts - See Instagram photos and videos from Le RDV du Carnet de Voyage (@rendezvousducarnetdevoyage)",
  },
  {
    title: "La famille qui voyage (@lafamillequivoyage) • Photos et ...",
    link: "https://www.instagram.com/lafamillequivoyage/?hl=fr",
    snippet:
      "Le profil Instagram de La famille qui voyage a 366 photos et vidéos. Abonnez-vous à son compte pour voir toutes ses publications.",
  },
];

test("Clean up a list that contains null, undefined and boolean", () => {
  const usernamesList = [
    "Tom",
    "Eric",
    null,
    "Benoit",
    false,
    "Tomy",
    undefined,
  ];

  const cleanup = clearUsernames(usernamesList);
  expect(cleanup).toEqual(["Tom", "Eric", "Benoit", "Tomy"]);
});

test("Get usernames with title", () => {
  const usernames = data.map((d) => extractUsernameTitle(d));
  expect(usernames).toEqual([
    "lefigarovoyages",
    "ventdevoyage",
    false,
    "lafamillequivoyage",
  ]);
});

test("Get usernames with title and cleanup", () => {
  const usernames = data.map((d) => extractUsernameTitle(d));
  const cleanUp = clearUsernames(usernames);
  expect(cleanUp).toEqual([
    "lefigarovoyages",
    "ventdevoyage",
    "lafamillequivoyage",
  ]);
});

test("Get usernames with link", () => {
  const usernames = data.map((d) => extractUsernameWithLink(d));
  expect(usernames).toEqual([
    "lefigarovoyages",
    "ventdevoyage",
    "rendezvousducarnetdevoyage",
    "lafamillequivoyage",
  ]);
});

test("Get usernames with link and cleanup", () => {
  const usernames = data.map((d) => extractUsernameWithLink(d));
  const cleanUp = clearUsernames(usernames);
  expect(cleanUp).toEqual([
    "lefigarovoyages",
    "ventdevoyage",
    "rendezvousducarnetdevoyage",
    "lafamillequivoyage",
  ]);
});

test("Get usernames with snippet", () => {
  const usernames = data.map((d) => extractUsernameSnippet(d));
  expect(usernames).toEqual([
    "lefigarovoyages",
    "ventdevoyage",
    "rendezvousducarnetdevoyage",
    false,
  ]);
});

test("Get usernames with snippet and cleanup", () => {
  const usernames = data.map((d) => extractUsernameSnippet(d));
  const cleanUp = clearUsernames(usernames);
  expect(cleanUp).toEqual([
    "lefigarovoyages",
    "ventdevoyage",
    "rendezvousducarnetdevoyage",
  ]);
});
