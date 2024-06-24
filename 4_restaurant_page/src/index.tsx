import BurgerImage from "./assets/burgers.jpeg";
import BurgerIcon from "./assets/burger.png";
import AboutPage from "./pages/about";

function main() {
    renderPage(null);
}

function appendAllToContentDiv(elementArray: Array<HTMLElement>) {
    elementArray.forEach((el) => {
        if (!!el) {
            document.getElementById("content").appendChild(el);
        }
    });
}

function fillBurgerIcon() {
    const icon = document.getElementById("burgerIcon");
    (icon as HTMLImageElement).src = BurgerIcon;
}

function renderPage(page: HTMLElement | null) {
    console.log("rendering page...");
    document.getElementById("content").innerHTML = "";
    fillBurgerIcon();

    appendAllToContentDiv([page, BackgroundImageComponent(), TextComponent()]);
}

function BackgroundImageComponent() {
    const image = new Image();
    image.src = BurgerImage;
    image.classList.add("object-cover", "w-screen", "h-48");
    return image;
}

function TextComponent() {
    const text = document.createElement("div");
    text.append(
        document.createTextNode(
            "Nisi eiusmod exercitation Lorem consequat laborum duis incididunt nostrud velit laboris pariatur aliquip do. Exercitation dolore veniam elit duis cillum mollit excepteur nostrud. Eu proident irure qui incididunt. Ex irure adipisicing esse sint. Velit exercitation ut amet in veniam sunt velit excepteur laborum dolor dolore incididunt. Laboris nulla do commodo excepteur culpa enim in. Commodo est et ut elit est in exercitation magna nulla culpa. Excepteur aliquip mollit nulla laborum qui amet anim irure do culpa exercitation. Dolore sit quis labore sunt pariatur nisi irure dolore dolor ad adipisicing tempor aliqua et. Mollit consequat mollit tempor est incididunt aliquip. Laboris adipisicing fugiat ipsum ut culpa enim sunt. Officia consectetur cillum magna est reprehenderit minim exercitation non occaecat magna nisi proident est. Non velit enim cupidatat aliqua velit in enim qui veniam incididunt cillum laboris esse. Quis qui nulla nostrud irure eu est consectetur id."
        )
    );
    return text;
}

const aboutButton = document.getElementById("aboutButton");
aboutButton.addEventListener("click", (event) => {
    console.log("about button clicked");
    renderPage(AboutPage());
});

main();
