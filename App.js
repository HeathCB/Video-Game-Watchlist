const gameForm = document.querySelector( "#game-form" );
const gameContainer = document.querySelector( "#game-container" );
let listItems = [];

// FUNCTIONS
function handleFormSubmit( e ){
    e.preventDefault();
    const name = gameForm.querySelector( "#name" ).value;
    const genre = gameForm.querySelector( "#genre" ).value;
    const studio = gameForm.querySelector( "#studio" ).value;
    const releaseDate = gameForm.querySelector( "#release-date" ).value;
    const price = gameForm.querySelector( "#price" ).value;
    const note = gameForm.querySelector( "#note" ).value;
    const newGame = {
        name,
        genre,
        studio,
        releaseDate,
        price,
        note,
        id: Date.now(),
  }
    listItems.push( newGame );
    e.target.reset();
    gameContainer.dispatchEvent( new CustomEvent( "refreshGames" ) );
}

// Update functions not working 
function handleFormButton( e ) {
    e.preventDefault();
    const name = gameForm.querySelector( "#name" ).value;
    const genre = gameForm.querySelector( "#genre" ).value;
    const studio = gameForm.querySelector( "#studio" ).value;
    const releaseDate = gameForm.querySelector( "#release-date" ).value;
    const price = gameForm.querySelector( "#price" ).value;
    const note = gameForm.querySelector( "#note" ).value;
    listItems.splice( 0, name );
    listItems.splice( 1, genre );
    listItems.splice( 2, studio );
    listItems.splice( 3, releaseDate );
    listItems.splice( 4, price );
    listItems.splice( 5, note);
    e.target.reset()
    gameContainer.dispatchEvent( new CustomEvent( "refreshGames" ) );
}

function displayGames(){
  const tempString = listItems.map( item => `
    <div class="col">
      <div id="card" class="card mb-4 rounded-3 shadow-sm border-primary">
        <div class="card-header py-3 text-white bg-primary border-primary">
          <h4 class="my-0">${item.name}</h4>
        </div>
        <div class="card-body">
          <ul class="text-start">
            <li><strong>Genre: </strong>${item.genre}</li>
            <li><strong>Studio: </strong>${item.studio}</li>
            <li><strong>Release Date: </strong>${item.releaseDate}</li>
            <li><strong>Price: </strong>${item.price}</li>
            ${!item.note.length ? "" : `<li><strong>Note: </strong>${item.note}</li>`}
          </ul>
          <button class="btn btn-lg btn-outline-danger" aria-label="Delete ${item.name}" value="${item.id}">Delete Game</button>
        </div>
      </div>
    </div>
    ` ).join( "" );
  gameContainer.innerHTML = tempString;
}

function mirrorStateToLocalStorage(){
  localStorage.setItem( "gameContainer.list", JSON.stringify( listItems ) );
}

function loadinitialUI(){
  const tempLocalStorage = localStorage.getItem( "gameContainer.list" );
  if( tempLocalStorage === null || tempLocalStorage === [] ) return;
  const tempGames = JSON.parse( tempLocalStorage );
  listItems.push( ...tempGames );
  gameContainer.dispatchEvent( new CustomEvent( "refreshGames" ) );
}

function deleteGameFromList( id ){
  listItems = listItems.filter( item => item.id !== id );
  gameContainer.dispatchEvent( new CustomEvent( "refreshGames" ) );
}

// EVENT LISTENERS 
gameForm.addEventListener( "submit", handleFormSubmit );
gameContainer.addEventListener( "refreshGames", displayGames );
gameContainer.addEventListener( "refreshGames", mirrorStateToLocalStorage );
gameForm.addEventListener( "button", handleFormButton )
gameContainer.addEventListener( "refreshGames", displayGames )
gameContainer.addEventListener( "refreshGames", mirrorStateToLocalStorage );
window.addEventListener( "DOMContentLoaded", loadinitialUI );
gameContainer.addEventListener( "click", ( e ) => {
  if( e.target.matches( ".btn-outline-danger" ) ) {
    deleteGameFromList( Number( e.target.value ) );
  };
})
