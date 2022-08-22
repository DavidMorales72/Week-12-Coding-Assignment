$(document).ready(() =>{
    let classList;
/*IMPORTANT!!!! I am using a local host, I have taken the information from the DND 5e API and placed it into a db.json file
so that it can be used in a local server. I used the npm install json-server and initilized the server so all of the information will'
be accessed via that db.json file. To replicate the functionality of this code you have to 'npm i -g json-server' on your terminal, once installed you can start the server with 'json-server --watch db.json'. Then in your browser you can go to 'http://localhost:3000/classes' */
    $.get('http://localhost:3000/classes', classData => {
        classList = classData 
    }).done(() => buildClassList())

    const buildClassList = () => {
        $('#conten').empty();
        classList.forEach(characterClass => {
            $('#content').append(
                `<div id="character${characterClass.id}" class="card card-body">
                ID: ${characterClass.id}
                Character Class: ${characterClass.class}<br> 
                Character Race: ${characterClass.race}
                </div> `
            )

            $(`#character${characterClass.id}`).click(() => removeCharacter(characterClass.id));
        })
    };

    $("#myForm").submit( event => {
        event.preventDefault();
        const formInfo = {
            race: $('#character-race').value,
            class: $('#character-class').value
        };

        $.post('http://localhost:3000/classes', 
        {race: formInfo.race, class:formInfo.class},
        (data) => console.log(data)
        )
    });

    const removeCharacter = (id) => {
        $.ajax({
            url: 'http://localhost:3000/classes',
            type: 'DELETE',
            success: function(){
                buildClassList()
            }
        });
    }

});