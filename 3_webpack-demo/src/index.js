// import your function
import myName from "./myName";
import "./style.css";
import Icon from "./icon.png";

function component() {
    const element = document.createElement("div");
    element.classList.add("hello");

    // Add the image to our existing div.
    const myIcon = new Image();
    myIcon.src = Icon;

    element.appendChild(myIcon);

    // use your function!
    element.textContent = myName("Cody");
    return element;
}

document.body.appendChild(component());
