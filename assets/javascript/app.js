




$(document).ready(function(){

    $("#game-area").hide();
    $("#start").on("click", game.start);

})

    var game = {

        correctAnswers: 0,
        wrongAnswers: 0,
        timeOuts: 0,
        counter: 15,
        counterOn: false,
        counterIntervalId: "",
        questionIndex: 0,
        button: $("<button>"),
        userSelect: "",
        correct: false,

        questions: [
            { 
                q: "Which NBA team drafted Shaquille O’Neal and was the first of several teams for which he played?",
                o: ["L.A. Lakers", "Miami Heat", "Phoenix Suns", "Orlando Magic"], 
                a: "Orlando Magic"
            },
            { 
                q: "Which NBA coach led the Jordan-era Bulls to 3 consecutive championships, and then coached a Kobe-led Lakers to another 3 consecutive championships?",
                o: ["Pat Riley", "Larry Brown", "Gregg Popovich", "Phil Jackson"],
                a: "Phil Jackson"
            },
            { 
                q: "For which university did Michael Jordan play basketball?",
                o: ["University of Chicago", "Duke University", "University of North Carolina", "University of Kansas"],
                a: "University of North Carolina"},
            { 
                q: "What franchise has played in the most NBA finals since 1947?", 
                o: ["The Celtics", "The Lakers", "The Spurs", "The Bulls"], 
                a: "The Lakers"
            },
            { 
                q: "What two NBA players won the MVP trophy three times each from 1986 through 1992?",
                o: ["Larry Bird and Michael Jordan", "Larry Bird and Magic Johnson", "Magic Johnson and Michael Jordan", "Larry Bird and Charles Barkley"],
                a: "Magic Johnson and Michael Jordan"},
            { 
                q: "What NBA team failed to make the playoffs in 1994 for the first time since 1976?", 
                o: ["The New York Knicks", "The Boston Celtics" , "The Los Angeles Lakers", "The Detroit Pistons"], 
                a: "The Los Angeles Lakers"
            },
            { 
                q: "Which one of these is not a 1st overall draft pick?",
                o: ["Chris Webber", "Allen Iverson", "Kenyon Martin", "Dikembe Mutombo"], 
                a: "Dikembe Mutombo"}
        ],

        ////------- Game Start
        start: function() {
            $("#game-area").show();

            game.timerRun();
            game.correctAnswers = 0;
            game.wrongAnswers = 0;
            game.timeOuts = 0;
            clearInterval(game.counterIntervalId);

            game.nextQuestions();
        },

        ////------- Launch initial questions or next questions
        nextQuestions: function() {
            game.counter = 15;

            $("#questions-area").html("<p>" + game.questions[game.questionIndex].q + "</p>")
        
            for (var i = 0; i < 4; i++) {
                var questionList = game.questions[game.questionIndex].o[i];
                buttons = $("<button>");
                buttons.text(questionList);
                buttons.attr({"data-index": i });
                buttons.addClass("option btn btn-secondary btn-md mx-1 selected");
                $("#answers-area").append(buttons);
                }
            },

        ////------- Timer
        timerRun: function() {
            counterIntervalId = "";
            clearInterval(counterIntervalId);
            counterIntervalId = setInterval(game.decrement, 1000);
        },

        decrement: function() {
            //  Decrease number by one.
            game.counter--;
            //  Show the number
            $("#timer-area").html("<p>You have " + game.counter + " seconds left to answer your question!</p>");
            //  Once number hits zero
            if (game.counter === -1) {
            // Next Question
            game.nextQuestions();
            }
        },

        selectAnswer: function() {
            correct;
            userSelect;

            $(".selected").on('click',function(){
                userSelect = $(this).data('index');
                clearInterval(counterIntervalId);
            });
            console.log(userSelect);
            
            // for (var i = 0; i < 4; i++) {
            //     if (userSelect === game.questions.a) {
            //         correct = true;
            //     }
            // };
            // if (correct === true) {
            //     game.button.addClass('btn-success').removeClass('btn-secondary');
            //     game.correctAnswers++;
            //     game.questionIndex++;
            //     } else if (!correct) { 
            //         game.button.addClass('btn-danger').removeClass('btn-secondary');
            //         game.wrongAnswers++;
            //         game.questionIndex++;
            //         }
            
            // game.nextQuestions();
        },




        ////------- Game Over
        gameOver: function() {

            $("#correct-answers").text("Correct Answer: " + game.correctAnswers);
            $("#wrong-answers").text("Wrong Answer: " + game.wrongAnswers);

        }

    }

