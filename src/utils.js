import { movesets_equipped } from "../data/movesets_data";

export function displayDialogue(text, onDisplayEnd) {
    const dialogueUI = document.getElementById("textbox-container");
    const dialogue = document.getElementById("dialogue");
  
    dialogueUI.style.display = "block";
    let index = 0;
    let currentText = "";
    const intervalRef = setInterval(() => {
      if (index < text.length) {
        currentText += text[index];
        dialogue.innerHTML = currentText;
        index++;
        return;
      }
  
      clearInterval(intervalRef);
    }, 1);
  
    const closeBtn = document.getElementById("close");
  
    function onCloseBtnClick() {
      onDisplayEnd();
      dialogueUI.style.display = "none";
      dialogue.innerHTML = "";
      clearInterval(intervalRef);
      closeBtn.removeEventListener("click", onCloseBtnClick);
    }
  
    closeBtn.addEventListener("click", onCloseBtnClick);
  
    addEventListener("keypress", (key) => {
      if (key.code === "Enter") {
        closeBtn.click();
      }
    });
  }

  export function displayMenu(movesets, onDisplayEnd) {
    const dialogueUI = document.getElementById("textbox-container");
    const dialogue = document.getElementById("dialogue");
    const diabox = document.getElementById("textbox");
    const text = "This menu is for switching between movesets"
    dialogueUI.style.display = "block";
    diabox.style.height = "70vh"    
    // let currentMoveset = {};
    // let currentButton;

    movesets.forEach(m => {
      const ul = document.createElement("button");
      ul.id = m.name;
      ul.textContent = m.name;
      diabox.appendChild(ul); 
    });
    let index = 0;
    let currentText = "";
    const intervalRef = setInterval(() => {
      if (index < text.length) {
        currentText += text[index];
        dialogue.innerHTML = currentText;
        index++;
        return;
      }
  
      clearInterval(intervalRef);
    }, 1);
  
    const closeBtn = document.getElementById("close");
    function switching(){
      movesets.forEach(m => {
        const button = document.getElementById(m.name);
        button.addEventListener("click", onMovesetClick)
        function onMovesetClick() {
          console.log(m)
          movesets_equipped.push(m)
          button.removeEventListener("click", onMovesetClick)
        }
      });
    }

    switching()
  
    function onCloseBtnClick() {
      onDisplayEnd();
      dialogueUI.style.display = "none";
      dialogue.innerHTML = "";
      diabox.style.height = "20vh";
      movesets.forEach(m => {
        const ul = document.getElementById(m.name);
        diabox.removeChild(ul)
      });
      clearInterval(intervalRef);
      closeBtn.removeEventListener("click", onCloseBtnClick);
    }
  
    closeBtn.addEventListener("click", onCloseBtnClick);
  
    addEventListener("keypress", (key) => {
      if (key.code === "Enter") {
        closeBtn.click();
      }
    });
  }