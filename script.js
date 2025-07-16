const squareContainer = document.querySelector('.square-container');
const changeSquareBtn = document.querySelector('.change-sq');
const clearBtn = document.querySelector('.clear-btn');
const colorMode = document.querySelector('#mode');


// call function
createSquareDivs(16);

// Handle change square button
changeSquareBtn.addEventListener('click', () => {
    let size = +prompt('Enter number of squares per side (min: 16, max: 100)','');

     // stop the function if numOfSq is less or greater than
    if (size < 16 || size > 100 || isNaN(size)) return; 

    createSquareDivs(size);
 
});



// Handle clear button
clearBtn.addEventListener('click', () => {
    const squares = document.querySelectorAll('.square');
    
    squares.forEach((div) => {
       div.style.backgroundColor = ''; 
    });
});


// function for creating initial 16x16 grid of square divs
function createSquareDivs(size) {
    squareContainer.innerHTML = '';

    for (let i = 1; i <= size * size; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        addColorBehavior(square);
        squareContainer.appendChild(square);
    }
}  





// Function that change background color behavior
function addColorBehavior(square) {
   function applyColor() {
      if (colorMode.value === 'random') {
         const r = Math.floor(Math.random() * (255 + 1));
         const g = Math.floor(Math.random() * (255 + 1));
         const b = Math.floor(Math.random() * (255 + 1));
         square.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
      } else {
         square.style.backgroundColor = colorMode.value;
      }  
    }  

    // Desktop
    square.addEventListener('mouseover', applyColor);

    // Mobile touch color
    square.addEventListener('touchstart', (e) => {
        e.preventDefault();  
        applyColor();
    }, { passive: false });


    square.addEventListener('touchmove', (e) => {
        e.preventDefault();  
        const touch = e.touches[0];
        console.log(touch)
        const element = document.elementFromPoint(touch.clientX, touch.clientY);
        if (element && element.classList.contains('.square')) {
            applyColor(element);
        }
    }, { passive: false });
   
}
